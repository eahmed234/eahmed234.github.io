#!/usr/bin/env python3
"""
review_questions.py — a local page for ruling on the open questions in ledger/QUESTIONS.md.

    python3 review_questions.py            # opens http://127.0.0.1:8765 in the browser
    python3 review_questions.py --port 9000 --no-browser

One card per question, grouped by note: the question, the cautious reading the note follows meanwhile
("now:"), the ledger entries it names (Arabic and English), and a button that prints the source page.
Writing a ruling and pressing Save turns `- [ ]` into `- [x]` and puts the ruling after `→`, in the file
itself — the form the ledger / rewrite / verify skills read as binding. "Commit rulings" commits
ledger/QUESTIONS.md on the drafts branch (it never pushes). Obsidian can stay open: the file is re-read
on every request, and a question is found by its text, not by its position.

Listens on 127.0.0.1 only. Standard library only.
"""

import argparse
import glob
import html
import json
import os
import re
import subprocess
import sys
import threading
import time
import urllib.parse
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
QUESTIONS = os.path.join(HERE, "ledger", "QUESTIONS.md")
LEDGER_DIR = os.path.join(HERE, "ledger")
SITE = "https://eahmed234.github.io/"
VAULT = os.path.basename(HERE)
LOCK = threading.Lock()

sys.path.insert(0, HERE)
try:
    from audit import slugify  # the site's URL slugs
except Exception:  # noqa: BLE001 — the page still works without site links
    slugify = None

# ── QUESTIONS.md ────────────────────────────────────────────────────────────────────────────────────

ITEM = re.compile(r"^- \[( |x|X)\] ")


def parse_questions(text):
    """[(section, [question])]. A question is a '- [ ]' / '- [x]' line plus the indented lines after it."""
    lines = text.split("\n")
    sections, cur, i = [], None, 0
    while i < len(lines):
        line = lines[i]
        if line.startswith("## "):
            cur = (line[3:].strip(), [])
            sections.append(cur)
        elif cur is not None and ITEM.match(line):
            j = i + 1
            while j < len(lines) and lines[j].startswith("  ") and lines[j].strip():
                j += 1
            block = lines[i:j]
            body = "\n".join(block)
            arrow = body.rfind("→")
            ruling = body[arrow + 1:].strip() if arrow >= 0 else ""
            now = next((l.strip()[4:].strip() for l in block[1:] if l.strip().startswith("now:")), "")
            if now.endswith("→"):
                now = now[:-1].strip()
            first = ITEM.sub("", block[0]).strip()
            extra = [l.strip() for l in block[1:] if not l.strip().startswith("now:")]
            cur[1].append({
                "key": first,
                "done": ITEM.match(line).group(1).lower() == "x",
                "question": " ".join([first] + extra).replace("→", "").strip(),
                "now": now,
                "ruling": ruling,
                "ids": entry_ids(body),
            })
            i = j
            continue
        i += 1
    return [s for s in sections if s[1]]


def set_ruling(key, ruling, done):
    """Rewrite the question whose first line is `key`: its checkbox and the text after its last →."""
    with LOCK:
        text = open(QUESTIONS, encoding="utf-8").read()
        lines = text.split("\n")
        for i, line in enumerate(lines):
            if ITEM.match(line) and ITEM.sub("", line).strip() == key:
                break
        else:
            raise KeyError("That question is no longer in the file (was it edited elsewhere?). Reload the page.")
        j = i + 1
        while j < len(lines) and lines[j].startswith("  ") and lines[j].strip():
            j += 1
        block = lines[i:j]
        block[0] = ITEM.sub(f"- [{'x' if done else ' '}] ", block[0])
        ruling = " ".join(ruling.split())
        k = max((n for n, l in enumerate(block) if "→" in l), default=None)
        if k is None:                       # no arrow yet: add one on its own line
            block.append("  →" + (f" {ruling}" if ruling else ""))
        else:
            head = block[k][:block[k].rfind("→") + 1]
            block[k] = head + (f" {ruling}" if ruling else "")
        lines[i:j] = block
        tmp = QUESTIONS + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
        os.replace(tmp, QUESTIONS)


# ── ledger entries ──────────────────────────────────────────────────────────────────────────────────

ID_RE = re.compile(r"\b([SIB]\d+\.\d+\.\d+|[KM]\d+\.\d+)\b")


def entry_ids(text):
    seen = []
    for m in ID_RE.finditer(text):
        if m.group(1) not in seen:
            seen.append(m.group(1))
    return seen


def ledger_entries():
    """{entry id: {"file", "head", "arabic", "english", "notes"}} from every ledger file."""
    out = {}
    for path in glob.glob(os.path.join(LEDGER_DIR, "*.md")):
        name = os.path.basename(path)
        if name in ("QUESTIONS.md", "GLOSSARY.md", "README.md"):
            continue
        cur = None
        for line in open(path, encoding="utf-8").read().split("\n"):
            m = re.match(r"^### (\S+)\s*(.*)$", line)
            if m:
                cur = {"file": name[:-3], "head": m.group(2).strip("· ").strip(), "arabic": [], "english": [], "notes": []}
                out.setdefault(m.group(1), cur)
            elif line.startswith("## ") or line.startswith("# "):
                cur = None
            elif cur is not None:
                if line.startswith(">"):
                    cur["arabic"].append(line[1:].strip())
                elif line.startswith("- note:"):
                    cur["notes"].append(line[7:].strip())
                elif line.strip() and not line.startswith("- "):
                    cur["english"].append(line.strip())
    return {k: {**v, "arabic": " ".join(v["arabic"]), "english": " ".join(v["english"])} for k, v in out.items()}


def page_ref(entry_id):
    """S4.172.09 → ('S', '4:172'); K3039.01 → ('K', '3039')."""
    m = re.match(r"([SIB])(\d+)\.(\d+)\.", entry_id)
    if m:
        return m.group(1), f"{m.group(2)}:{m.group(3)}"
    m = re.match(r"([KM])(\d+)\.", entry_id)
    return (m.group(1), m.group(2)) if m else (None, None)


def read_page(book, ref):
    if book not in "SIBKM" or not re.fullmatch(r"\d+(:\d+(-\d+)?)?", ref):
        return "Bad page reference."
    r = subprocess.run([sys.executable, os.path.join(HERE, "audit.py"), "--page", book, ref],
                       capture_output=True, text=True, cwd=HERE, timeout=120)
    return (r.stdout or r.stderr).strip()


def commit():
    def git(*a):
        return subprocess.run(["git", *a], capture_output=True, text=True, cwd=HERE)
    branch = git("branch", "--show-current").stdout.strip()
    if branch != "drafts":
        return f"Not committed: the vault is on '{branch}', not drafts."
    if not git("status", "--porcelain", "--", "ledger/QUESTIONS.md").stdout.strip():
        return "Nothing to commit: QUESTIONS.md has no unsaved-to-git changes."
    name = git("log", "-1", "--format=%an").stdout.strip()
    email = git("log", "-1", "--format=%ae").stdout.strip()
    git("add", "--", "ledger/QUESTIONS.md")
    r = git("-c", f"user.name={name}", "-c", f"user.email={email}", "commit", "-q", "-m",
            f"vault backup: rulings {time.strftime('%Y-%m-%d %H:%M:%S')}", "--", "ledger/QUESTIONS.md")
    return "Committed on drafts (not pushed)." if r.returncode == 0 else ("Commit failed: " + r.stderr.strip())


def state():
    sections = parse_questions(open(QUESTIONS, encoding="utf-8").read())
    entries = ledger_entries()
    out = []
    for name, qs in sections:
        site = None
        if slugify and name != "General" and os.path.exists(os.path.join(HERE, name + ".md")):
            site = SITE + urllib.parse.quote(slugify(name))
        obsidian = None if name == "General" else (
            "obsidian://open?vault=" + urllib.parse.quote(VAULT) + "&file=" + urllib.parse.quote(name))
        for q in qs:
            q["entries"] = [{"id": i, **entries[i], "book": page_ref(i)[0], "ref": page_ref(i)[1]}
                            if i in entries else {"id": i, "missing": True, "book": page_ref(i)[0], "ref": page_ref(i)[1]}
                            for i in q["ids"]]
        out.append({"note": name, "site": site, "obsidian": obsidian, "questions": qs})
    return out


# ── HTTP ────────────────────────────────────────────────────────────────────────────────────────────

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def send(self, code, body, ctype="application/json; charset=utf-8"):
        data = body.encode("utf-8") if isinstance(body, str) else body
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        u = urllib.parse.urlparse(self.path)
        q = urllib.parse.parse_qs(u.query)
        try:
            if u.path == "/":
                return self.send(200, PAGE, "text/html; charset=utf-8")
            if u.path == "/api/questions":
                return self.send(200, json.dumps(state(), ensure_ascii=False))
            if u.path == "/api/page":
                return self.send(200, json.dumps({"text": read_page(q.get("book", [""])[0], q.get("ref", [""])[0])},
                                                 ensure_ascii=False))
            return self.send(404, json.dumps({"error": "not found"}))
        except Exception as e:  # noqa: BLE001
            return self.send(500, json.dumps({"error": str(e)}))

    def do_POST(self):
        # Only this page may write: refuse requests from any other origin.
        origin = self.headers.get("Origin", "")
        if origin and urllib.parse.urlparse(origin).hostname not in ("127.0.0.1", "localhost"):
            return self.send(403, json.dumps({"error": "forbidden"}))
        try:
            body = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or b"{}")
            if self.path == "/api/rule":
                set_ruling(body["key"], body.get("ruling", ""), bool(body.get("done")))
                return self.send(200, json.dumps({"ok": True}))
            if self.path == "/api/commit":
                return self.send(200, json.dumps({"message": commit()}))
            return self.send(404, json.dumps({"error": "not found"}))
        except KeyError as e:
            return self.send(409, json.dumps({"error": str(e).strip("'\"")}))
        except Exception as e:  # noqa: BLE001
            return self.send(500, json.dumps({"error": str(e)}))


PAGE = r"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Question review</title>
<style>
:root{--bg:#faf8f4;--card:#fff;--ink:#1f1d1a;--muted:#6b665e;--line:#e4dfd6;--accent:#2f5d50;--accent-ink:#fff;
--soft:#eef3f1;--warn:#8a5a14;--done:#e9efe9}
@media (prefers-color-scheme:dark){:root{--bg:#161513;--card:#1f1e1b;--ink:#ebe7df;--muted:#a39d92;--line:#33302b;
--accent:#7fb8a4;--accent-ink:#10201b;--soft:#22302b;--warn:#e0b26a;--done:#1d2620}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif}
header{position:sticky;top:0;z-index:2;background:var(--bg);border-bottom:1px solid var(--line);padding:12px 16px}
.bar{max-width:880px;margin:0 auto;display:flex;flex-wrap:wrap;gap:10px;align-items:center}
h1{font-size:18px;margin:0 auto 0 0}
.count{color:var(--muted);font-size:14px}
button,select,input{font:inherit}
button{border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:8px;padding:6px 12px;cursor:pointer}
button.primary{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}
button:disabled{opacity:.5;cursor:default}
select,input[type=search]{border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:8px;padding:6px 10px}
main{max-width:880px;margin:0 auto;padding:8px 16px 80px}
h2{font-size:17px;margin:28px 0 8px;display:flex;flex-wrap:wrap;gap:8px;align-items:baseline}
h2 a{font-size:13px;font-weight:400;color:var(--accent)}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:10px 0}
.card.done{background:var(--done)}
.q{margin:0 0 8px}
.now{font-size:14px;color:var(--muted);margin:0 0 10px}
.now b{color:var(--warn);font-weight:600}
.ar{font-family:"Noto Naskh Arabic","Amiri","Geeza Pro",serif;font-size:1.15em;line-height:1.9}
.entries{border-left:3px solid var(--line);padding-left:10px;margin:10px 0}
.entry{margin:6px 0;font-size:14px}
.entry .id{font:12px ui-monospace,monospace;color:var(--muted)}
.entry .arline{display:block;direction:rtl;text-align:right}
.entry .note{color:var(--muted);font-style:italic}
textarea{width:100%;min-height:64px;border:1px solid var(--line);border-radius:8px;padding:8px;background:var(--bg);color:var(--ink);font:inherit;resize:vertical}
.actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;align-items:center}
.status{font-size:13px;color:var(--muted)}
pre.page{white-space:pre-wrap;direction:rtl;text-align:right;background:var(--soft);border-radius:8px;padding:10px;max-height:420px;overflow:auto;font-size:15px}
code{font:13px ui-monospace,monospace}
#toast{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:8px 14px;border-radius:8px;font-size:14px;display:none;max-width:calc(100% - 32px)}
.empty{color:var(--muted);text-align:center;margin:60px 0}
</style></head><body>
<header><div class="bar">
  <h1>Question review</h1><span class="count" id="count"></span>
  <select id="filter"><option value="open">Open</option><option value="done">Answered</option><option value="all">All</option></select>
  <input type="search" id="search" placeholder="Filter by note or text">
  <button class="primary" id="commit">Commit rulings</button>
</div></header>
<main id="list"></main>
<div id="toast"></div>
<script>
const $=s=>document.querySelector(s);
let data=[];
function esc(s){return String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function md(s){ // the little Markdown QUESTIONS.md uses, plus Arabic runs set right-to-left
  s=esc(s);
  s=s.replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/\*([^*]+)\*/g,"<i>$1</i>");
  return s.replace(/«([^»]*)»/g,'«<span class="ar" dir="rtl" lang="ar">$1</span>»');
}
function toast(t){const e=$("#toast");e.textContent=t;e.style.display="block";clearTimeout(e._t);e._t=setTimeout(()=>e.style.display="none",3500)}
async function load(){const r=await fetch("/api/questions");data=await r.json();render()}
function render(){
  const f=$("#filter").value, term=$("#search").value.trim().toLowerCase();
  let open=0,done=0,html="";
  for(const sec of data){
    for(const q of sec.questions) q.done?done++:open++;
    const qs=sec.questions.filter(q=>(f==="all"||(f==="open")!==q.done)&&(!term||(sec.note+" "+q.question+" "+q.now).toLowerCase().includes(term)));
    if(!qs.length) continue;
    html+=`<h2>${esc(sec.note)}${sec.site?` <a href="${sec.site}" target="_blank" rel="noopener">on the site</a>`:""}${sec.obsidian?` <a href="${sec.obsidian}">in Obsidian</a>`:""}</h2>`;
    for(const q of qs){
      const ents=q.entries.map(e=>e.missing
        ?`<div class="entry"><span class="id">${esc(e.id)}</span> — not found in a ledger</div>`
        :`<div class="entry"><span class="id">${esc(e.id)} · ${esc(e.head)} · ${esc(e.file)}</span>
           <span class="arline ar" dir="rtl" lang="ar">${esc(e.arabic)}</span>${esc(e.english)}
           ${e.notes.map(n=>`<div class="note">note: ${esc(n)}</div>`).join("")}</div>`).join("");
      const pages=[...new Map(q.entries.filter(e=>e.book).map(e=>[e.book+" "+e.ref,e])).values()];
      html+=`<div class="card${q.done?" done":""}" data-key="${esc(q.key)}">
        <p class="q">${md(q.question)}</p>
        ${q.now?`<p class="now"><b>Meanwhile the note:</b> ${md(q.now)}</p>`:""}
        ${ents?`<div class="entries">${ents}</div>`:""}
        <textarea placeholder="Your ruling (what the note should do)">${esc(q.ruling)}</textarea>
        <div class="actions">
          <button class="primary" data-act="save">${q.done?"Update ruling":"Save ruling"}</button>
          ${q.now&&!q.done?`<button data-act="keep">Keep as the note has it</button>`:""}
          ${q.done?`<button data-act="reopen">Reopen</button>`:""}
          ${pages.map(p=>`<button data-act="page" data-book="${esc(p.book)}" data-ref="${esc(p.ref)}">Page ${esc(p.book)} ${esc(p.ref)}</button>`).join("")}
          <span class="status"></span>
        </div><div class="pageview"></div></div>`;
    }
  }
  $("#count").textContent=`${open} open · ${done} answered`;
  $("#list").innerHTML=html||`<p class="empty">${f==="open"?"No open questions. 🎉":"Nothing matches."}</p>`;
}
async function post(url,body){const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
  const j=await r.json();if(!r.ok) throw new Error(j.error||r.statusText);return j}
$("#list").addEventListener("click",async ev=>{
  const b=ev.target.closest("button");if(!b)return;
  const card=b.closest(".card"),key=card.dataset.key,ta=card.querySelector("textarea"),st=card.querySelector(".status");
  try{
    if(b.dataset.act==="page"){
      const pv=card.querySelector(".pageview");
      if(pv.dataset.ref===b.dataset.book+b.dataset.ref){pv.innerHTML="";pv.dataset.ref="";return}
      st.textContent="Loading page…";
      const r=await fetch(`/api/page?book=${encodeURIComponent(b.dataset.book)}&ref=${encodeURIComponent(b.dataset.ref)}`);
      pv.innerHTML=`<pre class="page ar" dir="rtl" lang="ar">${esc((await r.json()).text)}</pre>`;pv.dataset.ref=b.dataset.book+b.dataset.ref;st.textContent="";return}
    if(b.dataset.act==="keep") ta.value="Keep as the note has it.";
    if(b.dataset.act==="reopen"){await post("/api/rule",{key,ruling:ta.value,done:false});toast("Reopened.");return load()}
    if(!ta.value.trim()){st.textContent="Write a ruling first.";ta.focus();return}
    await post("/api/rule",{key,ruling:ta.value,done:true});toast("Saved to ledger/QUESTIONS.md");load();
  }catch(e){toast(e.message)}
});
$("#commit").onclick=async()=>{try{toast((await post("/api/commit",{})).message)}catch(e){toast(e.message)}};
$("#filter").onchange=render;$("#search").oninput=render;
load();
</script></body></html>
"""


def main():
    ap = argparse.ArgumentParser(description="Rule on the open questions in ledger/QUESTIONS.md.")
    ap.add_argument("--port", type=int, default=8765)
    ap.add_argument("--no-browser", action="store_true")
    a = ap.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", a.port), Handler)
    url = f"http://127.0.0.1:{a.port}/"
    print(f"Question review at {url} — Ctrl-C to stop.")
    if not a.no_browser:
        threading.Timer(0.5, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print()


if __name__ == "__main__":
    main()
