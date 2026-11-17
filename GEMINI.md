# GEMINI.md

This file provides guidance to Antigravity (Gemini) when working in this repository.
`CLAUDE.md` carries the same text for Claude; the two are kept identical apart from their first two
lines — **when you change one, change the other**. It is kept short because every session loads it on every
turn: the full rules, background and history are in **`docs/handbook.md`**, the site in **`docs/site.md`**.

## What this is

An Obsidian vault (git) holding an English wiki of the *Sīrah* from an orthodox Sunni perspective, published
as **nabiwiki** (https://eahmed234.github.io/) by Quartz. Notes are `*.md`, **flat in the root**;
`The Sīrah.md` is the hub and **every note must be linked from it** (the audit fails on orphans). Unresolved
wikilinks are intentional — never remove them. `ledger/` holds claim ledgers (one per source chapter or
entry); `.claude/skills/` the procedures (`ledger`, `rewrite-note`, `verify-note`, `restyle-note`);
`rewrite-queue.sh` runs them over a list (with Claude Code or, `AGENT=copilot`, GitHub Copilot CLI —
see `docs/collaborating.md`; finished notes are listed in `docs/queue-done.txt`); `review/` is scratch
(git-ignored).

## Git

- Work on `drafts`. If `git branch --show-current` prints `main`, stop and tell the user. Never push, and
  never commit or merge to `main`, unless the user asks in that conversation.
- Commit message `vault backup: <YYYY-MM-DD HH:mm:ss>` (or a short description). Commit only your files,
  never `.obsidian/`. The device shell has no git identity:
  `git -c user.name="$(git log -1 --format=%an)" -c user.email="$(git log -1 --format=%ae)" commit …`
- Through the device bridge, request delete permission once before the first git command that writes.

## Verification tag — human only

Every note carries `unverified`; only the user changes it. Never add `verified`, never remove `unverified`.
New notes get `unverified`. If you change a note the user marked `verified`, leave the tag and tell them.

## Sources (absolute)

Every statement must trace to one of five books and be checkable on the page or ḥadīth cited. An
incomplete note that is fully sourced is correct; a rich note with unsourced background is defective.
**Nothing from general knowledge**, however well established.

| Key | Book | Cite | Footnote |
| --- | --- | --- | --- |
| K | *Ṣaḥīḥ al-Bukhārī* (al-Sulṭāniyyah) | no. | `[^bukh3039]: *Ṣaḥīḥ al-Bukhārī*, no. 3039.` |
| M | *Ṣaḥīḥ Muslim* (ʿAbd al-Bāqī; bracketed no.) | no. | `[^musl1779]: *Ṣaḥīḥ Muslim*, no. 1779.` |
| S | *Subul al-Hudā war-Rashād*, al-Ṣāliḥī (Beirut 1414/1993) | vol:page | `[^s4.192]: *Subul al-Hudā*, 4:192.` |
| I | *al-Iṣābah*, Ibn Ḥajar (Beirut 1415/1995) | vol:page (no.) | `[^i7.99]: *al-Iṣābah*, no. 9866 (7:99).` |
| B | *al-Bidāyah wa-l-Nihāyah*, Ibn Kathīr (al-Turkī) | vol:page | only after the Prophet's ﷺ death (8:79 on) |

- **Precedence:** the Ṣaḥīḥayn lead — their wording, the other as "in another report". *Subul* for events,
  *al-Iṣābah* for a Companion's name, lineage and dates; a real disagreement is reported as one.
- **Scope:** the prophetic era first. Do not create or expand post-prophetic notes unless asked.
- **Read before writing:** a heading or index entry shows only *where* a topic is; write from the page's
  text, the whole page. `python3 audit.py --page S 6:77-78` (also `I`, `B`, `K 3039`, `M 1779`).
- **Only what the page says.** A citation certifies the whole clause before it: no framing, motive,
  timing or analysis the page lacks. Keep qualifiers: *qīla* stays "it is said", a *khilāf* stays two-sided,
  a verdict stays the author's. Nasab exactly as given. Arabic in «…» only if verbatim.
- **Other works only through the five** (al-Wāqidī, Ibn Isḥāq, al-Ṭabarānī…): never their own pages, never
  in References.
- **Two tiers:** the editors' apparatus (*taḥqīq*) is cited as such — `*Subul al-Hudā*, 1:68 n. 5 (taḥqīq)`;
  in Muslim, editor's notes are `[^musl1671b]: … no. 1671, editor's note (taḥqīq)`.
- Gregorian dates are exempt (arithmetic); everything else, Hijrī dates and numbers included, is content.

## Writing

- Footnotes `[^key]` after the clause, definitions at the end; one key per page, reused; `## References`
  lists only the canonical books cited. Frontmatter values are claims too.
- Encyclopedic prose in Wikipedia's manner: `# Title (Arabic)`, italic epithet line, lead paragraph, plain
  `##` sections in order, paragraphs not bullets. **State facts; the footnote attributes them** — never
  "al-Ṣāliḥī says", "Ibn Ḥajar gives", "according to *al-Iṣābah*", "the source does not say". Name an
  authority only for a dispute, a weak report or a verdict.
- **IJMES transliteration is load-bearing** (file names and links): copy names from existing notes; check
  with `python3 audit.py --exists "Name" …`. The Prophet's note is linked
  `[[Muḥammad b. ʻAbdullah|Muḥammad b. ʿAbdullāh]] ﷺ`.
- Honorifics as bare ligatures, agreeing in gender and number: ﷺ the Prophet · ﵁ one man · ﵂ one woman ·
  ﵃ men · ﵄ two · ﵅ women · ﵊ prophets and angels.

## Tools

`python3 audit.py --packet "<note>"` (everything a rewrite needs, in one file) · `--note "<note>"` (flags;
resolve each) · `--no-content` (structural checks; must pass) · `--ledger` (snippets verbatim) ·
`--renumber "<ledger>"` (fix entry ids in one step) · `--exists` · `--questions` · `--sheet`. Flag meanings
and the audit's limits: `docs/handbook.md`, "Audit tooling". **Make many small changes in one command or one
file write, never as a chain of single edits.**
