# Running the rewrite queue as a collaborator

How a second person runs the note rewrites on their own Mac, with GitHub Copilot CLI and a Claude model,
against the same repository. Nothing here needs Obsidian.

## The arrangement

- One queue, one set of ledgers, one branch (`drafts`). **Only one person runs the queue at a time** —
  agree it in person before starting. Two runs at once would edit the same ledgers and conflict.
- You commit to `drafts` and push `drafts`. **Never push to `main`**: pushing `main` publishes the site,
  and that is the owner's decision.
- Finished notes are listed in `docs/queue-done.txt`, which is in git: after you pull, the queue skips
  everything already done, whoever did it.
- Your commits carry your own name, so it is clear which notes your runs produced.

## One-time setup

1. **Access.** Accept the collaborator invitation to `eahmed234/obsidianbackup` on GitHub.
2. **Tools.** In Terminal:
   ```bash
   git --version        # installs the Xcode command-line tools if missing
   python3 --version    # 3.9 or later; comes with the same tools
   ```
   Install GitHub Copilot CLI by following GitHub's install instructions for Copilot CLI (at the time of
   writing, `npm install -g @github/copilot`), then run `copilot` once and sign in with your enterprise
   GitHub account. Your organisation must have the Copilot CLI policy enabled.
3. **Pick the model.** In `copilot`, type `/model` and note the exact name of the Claude Sonnet model on
   offer (for example `claude-sonnet-4.5`; newer ones will have other names). Use the newest Sonnet.
4. **Clone and check out `drafts`:**
   ```bash
   git clone https://github.com/eahmed234/obsidianbackup.git
   cd obsidianbackup
   git checkout drafts
   ```
5. **Your name on commits:**
   ```bash
   git config user.name  "Your Name"
   git config user.email "you@example.com"
   ```
6. **Check the tools work:** `python3 audit.py --no-content` should end with every check passing.

## First run: one short note

Do this once, with the owner, before any batch. It is the test that Copilot follows the procedures.

```bash
git pull
printf '%s\n' "Ghazwat Badr al-Mawʿid" > review/queue.txt     # or any short note from docs/rewrite-order.txt
AGENT=copilot MODEL=claude-sonnet-4.5 ./rewrite-queue.sh
```

Then read the new note, its ledger in `ledger/`, and `review/<note>.verify.md` together. If it looks right,
push (`git push origin drafts`).

## The routine

```bash
git pull                                                          # 1. take the latest drafts
AGENT=copilot MODEL=claude-sonnet-4.5 LIMIT=10 \
  ./rewrite-queue.sh docs/rewrite-order.txt                       # 2. the next ten notes in order
git push origin drafts                                            # 3. hand them back
```

- `docs/rewrite-order.txt` is the full list in order; finished notes are skipped, so it never needs editing.
- `LIMIT=10` stops after ten notes. Leave it out to run until the list ends or something fails.
- Each note runs: ledger (only if its chapter has none) → rewrite → verify → audit, each in a fresh
  session, each committed by the script.
- The full answer from each session is in `review/logs/`; the verifier's report is `review/<note>.verify.md`.

## When something stops

- **Ctrl-C, a closed lid, a usage limit:** run the same command again. The script sets the half-written
  note aside (`git stash`), and resumes at the step that was interrupted.
- **"✗ … failed":** read the log it names. Run again once the cause is fixed; tell the owner if unsure.
- **"Not on the drafts branch":** `git checkout drafts`.
- **A conflict on `git pull`:** stop and tell the owner rather than resolving a ledger or note by guesswork.

## What the agents must never do (the script and the skills already enforce these)

- Change the `unverified` / `verified` tag on any note — only the owner verifies.
- Add anything not found in the five source books.
- Answer the open questions in `ledger/QUESTIONS.md` — those are for the owner's review.
