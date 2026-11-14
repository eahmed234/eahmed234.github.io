---
name: restyle-note
description: Reword an already-rewritten nabiwiki (Sīrah vault) note so its prose states facts and leaves attribution to the footnotes, without changing any claim. Use when asked to restyle a note or fix its voice.
---

# Restyle a nabiwiki note

Argument: the note's name. For notes that are already footnoted; a note still in the old form needs
rewrite-note instead.

This is a **wording pass only**. No claim is added, removed, strengthened or weakened; no footnote changes
the page it cites; frontmatter, links, tags and Arabic quotations are untouched. Do not read source pages.

1. Read `.claude/skills/rewrite-note/SKILL.md`, sections **Voice** and "Write for a reader". Those are the
   rules.
2. `python3 audit.py --note "<name>"` — the `voice` lines are the sentences to restate. Read the whole note
   too: the check only sees the two authors and their books, not "Muḥammad b. ʿUmar says", "in one report…
   in another report" for details that do not conflict, or "the report adds".
3. If the note has ledgers (`grep -l "<name>" ledger/*.md`), look up the kind of each entry behind a
   sentence you change. `plain` and `via` become plain statements. `qīla`, `khilāf`, `hedge` and `verdict`
   keep their marking: restating a weak report as fact is the one way this pass can do harm.
4. Edit with targeted edits:
   - make the event or person the subject of the sentence;
   - move a transmitter's name into the footnote definition, after the page reference;
   - merge sentences that repeated the same fact from two books into one sentence with both footnotes;
   - leave the disputes section's naming of the sides alone, but there too prefer the authority the book
     cites ("Ibn Isḥāq", "al-Wāqidī") over the book ("al-Ṣāliḥī says").
5. `python3 audit.py --note "<name>"` again: `voice 0`, and no new flag of any other kind. Then
   `python3 audit.py --no-content`.
6. Commit the note following **Git workflow** in `CLAUDE.md` (branch `drafts`, never push). Report in two
   lines: how many sentences changed, and any sentence you left because restating it would have changed
   its strength.
