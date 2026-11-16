#!/usr/bin/env bash
# Rewrite and verify a list of notes with Claude Code, one fresh session per step.
#
#   ./rewrite-queue.sh                 # reads review/queue.txt — one note name per line, # for comments
#   MODEL=opus ./rewrite-queue.sh big.txt
#   QUIET=1 ./rewrite-queue.sh         # one line per step instead of live progress
#   LIMIT=10 ./rewrite-queue.sh docs/rewrite-order.txt   # the next ten notes of the full list
#   python3 audit.py --voice > review/restyle.txt && ONLY=restyle-note ./rewrite-queue.sh review/restyle.txt
#                                      # run one skill only (here: the wording pass) over a list
#
# Safe to interrupt (Ctrl-C) at any point. On the next start it puts the interrupted note back to its last
# commit (the half-written edits go to `git stash`, not lost), clears a stale git lock, and resumes at the
# step that was interrupted — a rewrite that had already been committed is not done again.
#
# Finished notes are recorded in review/done.txt and skipped next time, so the script can be stopped
# (Ctrl-C) and restarted, or re-run after a usage limit resets. It stops at the first failure.
# Nothing is pushed: publish afterwards with  git push origin drafts:main
set -u -o pipefail
cd "$(dirname "$0")"
QUEUE="${1:-review/queue.txt}"
MODEL="${MODEL:-sonnet}"
QUIET="${QUIET:-}"
LOGS=review/logs
ONLY="${ONLY:-}"                       # run just this skill per note, with its own done-list
DONE=review/done.txt; [ -z "$ONLY" ] || DONE="review/done.$ONLY.txt"
STATE=review/in-progress.txt           # "<step> TAB <HEAD when the step began> TAB <note>" while a step runs
mkdir -p "$LOGS"; touch "$DONE" review/rewritten.txt

[ "$(git branch --show-current)" = "drafts" ] || { echo "Not on the drafts branch — stopping."; exit 1; }
[ -f "$QUEUE" ] || { echo "No queue file at $QUEUE"; exit 1; }

trim() {   # strip CR, surrounding spaces and a trailing .md
  local s="${1%$'\r'}"
  s="${s#"${s%%[![:space:]]*}"}"; s="${s%"${s##*[![:space:]]}"}"
  printf '%s' "${s%.md}"
}

# Live progress: turn Claude Code's event stream into one short line per action.
progress() {
  python3 -u -c '
import json, sys, time
t0 = time.time()
def clock(): return time.strftime("%M:%S", time.gmtime(time.time() - t0))
def short(s, n=110):
    s = " ".join(str(s).split())
    return s if len(s) <= n else s[:n - 1] + "…"
final = ""
for line in sys.stdin:
    try:
        ev = json.loads(line)
    except ValueError:
        if line.strip(): print("      " + short(line), flush=True)
        continue
    kind = ev.get("type")
    if kind == "assistant":
        for block in ev.get("message", {}).get("content", []):
            if block.get("type") == "tool_use":
                i, name = block.get("input", {}), block.get("name", "?")
                what = i.get("command") or i.get("file_path") or i.get("pattern") or i.get("skill") or ""
                print(f"      {clock()}  {name:<5} {short(what)}", flush=True)
            elif block.get("type") == "text" and block.get("text", "").strip():
                final = block["text"].strip()
    elif kind == "result":
        final = (ev.get("result") or final).strip()
        cost = ev.get("total_cost_usd")
        turns = ev.get("num_turns", "?")
        money = ", ${:.2f} at API rates".format(cost) if isinstance(cost, (int, float)) else ""
        print("      {}  finished: {} turns{}{}".format(clock(), turns, money, " — ERROR" if ev.get("is_error") else ""), flush=True)
        if ev.get("is_error"):
            print("      " + short(final, 400), flush=True)
print("\n" + final + "\n")
' 
}

step() {   # step <skill> <note>
  local log="$LOGS/$2.$1.log" prompt="Follow .claude/skills/$1/SKILL.md for the note: $2"
  # Build the packet now, so the session starts by reading one file instead of searching for things.
  if python3 audit.py --packet "$2" > /dev/null 2>&1; then
    prompt="$prompt — its packet is already at review/$2.packet.md (read it; no need to regenerate it first)."
  fi
  if [ -n "$QUIET" ]; then
    claude -p "$prompt" --model "$MODEL" --permission-mode acceptEdits < /dev/null > "$log" 2>&1
  else
    claude -p "$prompt" --model "$MODEL" --permission-mode acceptEdits \
        --output-format stream-json --verbose < /dev/null 2> "$log.err" \
      | tee "$log.jsonl" | progress | tee "$log" | grep -E '^      ' 
    return "${PIPESTATUS[0]}"
  fi
}

LIMIT="${LIMIT:-0}"     # LIMIT=10 ./rewrite-queue.sh list.txt  → stop after ten notes

left_uncommitted() {   # warn if a step finished without committing its work
  local dirty; dirty=$(git status --porcelain -- "$1.md" ledger | grep -v '^??.*\.sheet\.md' || true)
  [ -z "$dirty" ] || echo "    note: $2 left uncommitted changes (the next step or you will need to commit them):" && \
    [ -z "$dirty" ] || echo "$dirty" | sed 's/^/      /'
}

recover() {   # tidy up after a run that was interrupted or failed mid-step
  local l st head nt
  for l in .git/index.lock .git/HEAD.lock; do
    if [ -e "$l" ] && ! pgrep -x git > /dev/null 2>&1; then
      rm -f "$l" && echo "Removed a stale $l left by an interrupted run."
    fi
  done
  [ -f "$STATE" ] || return 0
  IFS=$'\t' read -r st head nt < "$STATE" || true
  echo "The last run stopped during '$st' of: $nt"
  if [ -n "$(git status --porcelain -- "$nt.md" ledger)" ]; then
    if git stash push --include-untracked -m "interrupted $st: $nt ($(date '+%F %H:%M'))" -- "$nt.md" ledger > /dev/null; then
      echo "  Its unfinished, uncommitted edits were set aside in git stash (see: git stash list)."
      echo "  The note and the ledgers are back at their last commit."
    else
      echo "  Could not set its uncommitted edits aside — check 'git status' before going on."; exit 1
    fi
  fi
  if [ "$st" = rewrite-note ] && [ -n "$(git log --oneline "$head..HEAD" -- "$nt.md" 2> /dev/null)" ]; then
    grep -qxF -- "$nt" review/rewritten.txt || echo "$nt" >> review/rewritten.txt
    echo "  Its rewrite had already been committed, so it resumes at verify."
  fi
  rm -f "$STATE"
}
begin() { printf '%s\t%s\t%s\n' "$1" "$(git rev-parse HEAD)" "$2" > "$STATE"; }   # begin <step> <note>

trap 'echo; echo "Interrupted. Run the same command again to resume: finished notes are skipped and anything half-written is set aside first."; exit 130' INT TERM
recover

total=0; todo=0
while IFS= read -r line || [ -n "$line" ]; do
  n="$(trim "$line")"; case "$n" in ""|\#*) continue ;; esac
  total=$((total + 1)); grep -qxF -- "$n" "$DONE" || todo=$((todo + 1))
done < "$QUEUE"
echo "Queue: $QUEUE — $total notes, $((total - todo)) already done, $todo to do. Model: $MODEL."
if [ -n "$ONLY" ]; then echo "Each note: $ONLY only, then audit. (Done-list: $DONE)"
else echo "Each note: rewrite (builds the ledger if missing) → verify (fresh session) → audit."; fi
[ -n "$QUIET" ] || echo "Lines below are the session's actions as they happen; full reports go to $LOGS/."

i=0; started=$(date +%s)
while IFS= read -r line || [ -n "$line" ]; do
  note="$(trim "$line")"
  case "$note" in ""|\#*) continue ;; esac
  grep -qxF -- "$note" "$DONE" && continue
  if [ "$LIMIT" -gt 0 ] && [ "$i" -ge "$LIMIT" ]; then echo; echo "Reached LIMIT=$LIMIT — stopping here."; break; fi
  i=$((i + 1))
  [ -f "$note.md" ] || { echo "No such note: '$note' — stopping. (Names are the file names without .md.)"; exit 1; }
  echo
  echo "══ [$i/$todo] $note   $(date '+%H:%M')"
  before=$(git rev-parse --short HEAD)

  if [ -n "$ONLY" ]; then
    echo "  ── $ONLY"
    begin "$ONLY" "$note"
    step "$ONLY" "$note" || { echo "  ✗ $ONLY failed — see $LOGS/$note.$ONLY.log"; exit 1; }
    left_uncommitted "$note" "$ONLY"
  else
    if grep -qxF -- "$note" review/rewritten.txt; then
      echo "  ── 1/3 rewrite — already committed in an earlier run; resuming at verify"
    else
      echo "  ── 1/3 rewrite"
      begin rewrite-note "$note"
      step rewrite-note "$note" || { echo "  ✗ rewrite failed — see $LOGS/$note.rewrite-note.log"; exit 1; }
      left_uncommitted "$note" "the rewrite"
      echo "$note" >> review/rewritten.txt
    fi
    echo "  ── 2/3 verify"
    begin verify-note "$note"
    step verify-note  "$note" || { echo "  ✗ verify failed — see $LOGS/$note.verify-note.log"; exit 1; }
    left_uncommitted "$note" "the verify"
  fi
  echo "  ── 3/3 audit"
  python3 audit.py --no-content > /dev/null && python3 audit.py --ledger > /dev/null \
    || { echo "  ✗ audit fails after $note — stopping. Run: python3 audit.py --no-content"; exit 1; }
  flags=$(python3 audit.py --note "$note" | awk '/CONTENT TRIAGE/{f=1;next} f && $2 ~ /^[0-9]+$/ {s+=$2} END{print s+0}')
  echo "$note" >> "$DONE"; rm -f "$STATE"

  echo "  ✓ done. Commits: $(git log --oneline "$before..HEAD" | wc -l | tr -d ' ')   audit flags on the note: $flags"
  report="review/$note.verify.md"
  if [ -n "$ONLY" ]; then :
  elif [ -f "$report" ]; then
    grep -m1 -E '^Supported' "$report" | sed 's/^/    /'
    awk '/^## For you/{f=1;next} f && NF' "$report" | sed 's/^/    for you: /'
  else
    echo "    (no verify report was written — check $LOGS/$note.verify-note.log)"
  fi
done < "$QUEUE"

mins=$(( ($(date +%s) - started) / 60 ))
echo
echo "Queue finished: $i notes in $mins min. Reports: review/<note>.verify.md. Nothing pushed."
