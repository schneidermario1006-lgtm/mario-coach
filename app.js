(function () {
  const C = window.COACH;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isoOf = d => { const x = new Date(d); x.setMinutes(x.getMinutes() - x.getTimezoneOffset()); return x.toISOString().slice(0, 10); };
  const todayISO = () => isoOf(new Date());
  const fmtDate = iso => { const [, m, d] = iso.split("-"); return `${+d}.${+m}.`; };
  const num = v => (v == null || v === "") ? null : Number(String(v).replace(",", "."));
  const de = n => n == null ? "–" : String(Math.round(n * 10) / 10).replace(".", ",");
  const mmss = s => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;
  const TAGE = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  let toastT;
  const toast = t => { const el = $("#toast"); el.textContent = t; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => el.hidden = true, 1900); };

  /* ---------- Eigene Daten (nur auf diesem Handy) ---------- */
  const KEY = "mario-coach-v1";
  const blank = { checks: {}, extra: [], logs: [], koerper: [], frueh: {}, aktiv: null, tab: "heute" };
  let S;
  try { S = Object.assign({}, blank, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { S = { ...blank }; }
  if (S.tab === "woche") S.tab = "heute";
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast("Speicher voll"); } };

  /* Fotos in IndexedDB */
  const idb = new Promise(res => {
    try { const r = indexedDB.open("mario-coach", 1); r.onupgradeneeded = () => r.result.createObjectStore("fotos"); r.onsuccess = () => res(r.result); r.onerror = () => res(null); }
    catch (e) { res(null); }
  });
  const fotoGet = async id => { const db = await idb; if (!db) return null; return new Promise(r => { const q = db.transaction("fotos").objectStore("fotos").get(id); q.onsuccess = () => r(q.result || null); q.onerror = () => r(null); }); };
  const fotoSet = async (id, d) => { const db = await idb; if (!db) throw 0; return new Promise((r, j) => { const t = db.transaction("fotos", "readwrite"); t.objectStore("fotos").put(d, id); t.oncomplete = r; t.onerror = j; }); };
  const fotoAll = async () => { const db = await idb; if (!db) return {}; return new Promise(r => { const o = {}; const c = db.transaction("fotos").objectStore("fotos").openCursor(); c.onsuccess = () => { const k = c.result; if (k) { o[k.key] = k.value; k.continue(); } else r(o); }; c.onerror = () => r(o); }); };
  const shrink = file => new Promise((res, rej) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => { const s = Math.min(1, 1200 / Math.max(img.width, img.height)); const cv = document.createElement("canvas"); cv.width = Math.round(img.width * s); cv.height = Math.round(img.height * s); cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url); res(cv.toDataURL("image/jpeg", .82)); };
    img.onerror = rej; img.src = url;
  });

  /* ---------- Navigation ---------- */
  const views = ["heute", "training", "essen", "einkauf", "fortschritt"];
  function show(v) {
    if (!views.includes(v)) v = "heute";
    $$("[data-view]").forEach(s => s.hidden = s.id !== "v-" + v);
    $$(".tab").forEach(t => t.dataset.v === v ? t.setAttribute("aria-current", "page") : t.removeAttribute("aria-current"));
    S.tab = v; save(); window.scrollTo(0, 0);
  }
  $$(".tab").forEach(t => t.addEventListener("click", () => { closeSheet(); show(t.dataset.v); }));
  const sheet = $("#sheet");
  function openSheet(html) { $("#sheetBody").innerHTML = html; sheet.hidden = false; sheet.scrollTop = 0; document.body.style.overflow = "hidden"; if (!(history.state && history.state.sheet)) history.pushState({ sheet: 1 }, ""); }
  function closeSheet() { if (sheet.hidden) return; sheet.hidden = true; document.body.style.overflow = ""; }
  $("#sheetBack").onclick = () => { if (history.state && history.state.sheet) history.back(); else closeSheet(); };
  window.addEventListener("popstate", closeSheet);

  /* ---------- Heute ---------- */
  let gewaehlt = null;
  const tagVon = iso => C.woche.tage.find(t => t.iso === iso);
  function itemHtml(i, cls) {
    const target = i.rezept ? `data-rz="${i.rezept}"` : i.einheit ? `data-ein="${i.einheit}"` : "";
    return `<button type="button" class="${cls}" ${target}><span class="dot ${esc(i.typ)}"></span><span>${esc(i.text)}</span>${target ? '<span class="go">›</span>' : ""}</button>`;
  }
  function bindItems(root) {
    root.querySelectorAll("[data-rz]").forEach(b => b.onclick = () => { show("essen"); openRezept(b.dataset.rz); });
    root.querySelectorAll("[data-ein]").forEach(b => b.onclick = () => { einheit = b.dataset.ein; renderTraining(); show("training"); });
  }
  function renderHeute() {
    const now = new Date(), t = todayISO(), tag = tagVon(t);
    $("#kw").textContent = C.woche.titel;
    $("#hDatum").textContent = now.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
    $("#hTitel").textContent = tag ? (tag.items.length ? "Heute dran" : "Heute frei") : "Heute";
    const hi = $("#hItems");
    hi.innerHTML = tag ? (tag.items.length ? tag.items.map(i => itemHtml(i, "hItem")).join("") : '<div class="hItem">Nichts geplant. Spaziergang mit der Familie?</div>')
      : '<div class="hItem">Der Plan startet am ' + esc(C.woche.tage[0].datum) + ' Tipp auf einen Tag unten.</div>';
    bindItems(hi);
    // Wochenleiste
    $("#hStrip").innerHTML = C.woche.tage.map(d => `<button type="button" class="sday${d.iso === t ? " today" : ""}" role="tab" aria-selected="${d.iso === gewaehlt}" data-iso="${d.iso}">
      <b>${esc(d.tag)}</b><span class="num">${esc(d.datum.split(".")[0])}</span><span class="dots">${d.items.map(i => `<i class="dot ${esc(i.typ)}"></i>`).join("")}</span></button>`).join("");
    $$("#hStrip .sday").forEach(b => b.onclick = () => { gewaehlt = gewaehlt === b.dataset.iso ? null : b.dataset.iso; renderHeute(); });
    const ht = $("#hTag");
    if (gewaehlt) { const d = tagVon(gewaehlt); ht.hidden = false; ht.innerHTML = `<div class="label">${esc(d.tag)} · ${esc(d.datum)}</div><div class="stack" style="margin-top:8px">${d.items.length ? d.items.map(i => itemHtml(i, "hItem lightItem")).join("") : '<span class="muted">frei</span>'}</div>`; bindItems(ht); }
    else ht.hidden = true;
    // Kacheln
    const n = wocheEinheiten(), next = naechsteEinheit();
    $("#hTraining").innerHTML = `<span class="label">Training</span><span class="big num">${n}/2</span><span class="small muted">${n >= 2 ? "Woche geschafft" : "Nächste: Einheit " + next}</span>`;
    $("#hTraining").onclick = () => { einheit = next; renderTraining(); show("training"); };
    const offen = ["familie", "mitnehmen"].reduce((a, l) => a + listItems(l).filter(i => !S.checks[i.k]).length, 0);
    $("#hEinkauf").innerHTML = `<span class="label">Einkauf</span><span class="big num">${offen}</span><span class="small muted">${offen ? "Artikel offen" : "alles erledigt"}</span>`;
    $("#hEinkauf").onclick = () => show("einkauf");
    // Frühstück
    const days = C.woche.tage, fCount = days.filter(d => S.frueh[d.iso]).length;
    $("#hFrueh").innerHTML = `<div class="row between"><span class="label">Gefrühstückt?</span><span class="small strong num">${fCount} / 4 Tage</span></div>
      <div class="fr">${days.map(d => `<button type="button" data-f="${d.iso}" aria-pressed="${!!S.frueh[d.iso]}" class="${d.iso === t ? "today" : ""}"><span>${esc(d.tag)}</span><span>${S.frueh[d.iso] ? "✓" : "–"}</span></button>`).join("")}</div>`;
    $$("#hFrueh [data-f]").forEach(b => b.onclick = () => { const k = b.dataset.f; if (S.frueh[k]) delete S.frueh[k]; else S.frueh[k] = 1; save(); renderHeute(); });
    const note = $("#hNote"); note.hidden = !C.woche.hinweis; note.textContent = C.woche.hinweis || "";
  }

  /* ---------- Training ---------- */
  const weekStart = () => { const x = new Date(); x.setDate(x.getDate() - (x.getDay() + 6) % 7); x.setHours(0, 0, 0, 0); return x; };
  const wocheEinheiten = () => S.logs.filter(l => new Date(l.datum + "T12:00") >= weekStart()).length;
  const naechsteEinheit = () => { const l = S.logs[0]; return l && l.einheit === "A" ? "B" : "A"; };
  let einheit = S.aktiv ? S.aktiv.einheit : naechsteEinheit();
  const offenEx = {};
  const topWdh = w => { const m = String(w).match(/(\d+)\D*$/); return m ? +m[1] : null; };
  function lastSets(id) {
    for (const l of S.logs) { if (l.saetze && l.saetze[id]) return l.saetze[id]; if (l.werte && l.werte[id] != null) return null; }
    return null;
  }
  const lastTop = id => { for (const l of S.logs) if (l.werte && l.werte[id] != null) return l.werte[id]; return null; };
  function vorschlag(id) {
    const u = C.uebungen[id], ls = lastSets(id), top = topWdh(u.wdh);
    if (!ls || !top || u.einheit === "Sek.") return null;
    const geschafft = ls.length >= u.saetze && ls.every(s => (s.wdh || 0) >= top);
    return geschafft ? Math.max(...ls.map(s => s.kg || 0)) + 2.5 : null;
  }
  function aktiv() {
    if (!S.aktiv || S.aktiv.einheit !== einheit) {
      const e = C.training.einheiten.find(x => x.id === einheit);
      const ex = {};
      e.uebungen.forEach(id => {
        const u = C.uebungen[id], ls = lastSets(id), lt = lastTop(id), vs = vorschlag(id);
        ex[id] = Array.from({ length: u.saetze }, (_, i) => ({ kg: vs ?? (ls && ls[i] ? ls[i].kg : lt), wdh: null, ok: false }));
      });
      S.aktiv = { einheit, ex, start: Date.now(), leer: true };
    }
    return S.aktiv;
  }
  const svgCheck = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  function renderTraining() {
    const tp = C.training, n = wocheEinheiten();
    $("#tCount").textContent = `${n} von 2 Einheiten diese Woche`;
    $$("#tMeter i").forEach((i, k) => i.classList.toggle("on", k < n));
    $("#tWarm").textContent = "Aufwärmen: " + tp.aufwaermen;
    $("#tSeg").innerHTML = tp.einheiten.map(e => `<button type="button" data-e="${e.id}" aria-pressed="${e.id === einheit}">Einheit ${e.id}</button>`).join("");
    $$("#tSeg button").forEach(b => b.onclick = () => {
      if (b.dataset.e === einheit) return;
      if (S.aktiv && !S.aktiv.leer) { toast("Erst abschließen oder verwerfen"); return; }
      S.aktiv = null; einheit = b.dataset.e; save(); renderTraining();
    });
    const A = aktiv(); save();
    const e = tp.einheiten.find(x => x.id === einheit);
    $("#tList").innerHTML = e.uebungen.map((id, k) => {
      const u = C.uebungen[id], sets = A.ex[id], done = sets.filter(s => s.ok).length, vs = vorschlag(id);
      const open = offenEx[id] ?? (k === firstOpen(e, A));
      return `<div class="exc" data-x="${id}">
        <button class="exHead" type="button" data-toggle="${id}" aria-expanded="${open}">
          ${window.figureAnim(id)}
          <span style="min-width:0"><span class="name">${esc(u.name)}</span><br><span class="meta">${u.saetze} × ${esc(u.wdh)} · Pause ${mmss(u.pauseSek)}</span>${vs ? `<br><span class="hintUp">Steigern auf ${de(vs)} ${esc(u.einheit)}</span>` : ""}</span>
          <span class="done num${done === sets.length ? " full" : ""}">${done}/${sets.length}</span>
        </button>
        ${open ? `<div class="sets">
          <div class="setHead"><span>Satz</span><span>${esc(u.einheit)}</span><span>${u.einheit === "Sek." ? "Sek." : "Wdh."}</span><span></span></div>
          ${sets.map((s, i) => `<div class="setRow${s.ok ? " done" : ""}"><span class="n">${i + 1}</span>
            <input type="number" inputmode="decimal" step="0.5" data-kg="${id}|${i}" value="${s.kg ?? ""}" placeholder="${u.einheit === "Sek." ? "–" : "kg"}" aria-label="Satz ${i + 1} Gewicht">
            <input type="number" inputmode="numeric" data-wdh="${id}|${i}" value="${s.wdh ?? ""}" placeholder="${esc(String(u.wdh).replace(" Sek.", ""))}" aria-label="Satz ${i + 1} Wiederholungen">
            <button type="button" class="tick" data-ok="${id}|${i}" aria-pressed="${s.ok}" aria-label="Satz ${i + 1} erledigt">${svgCheck}</button></div>`).join("")}
          <div class="exLinks"><button class="link" type="button" data-info="${id}">Technik & Video</button><span class="small muted">Start: ${esc(u.startgewicht)}</span></div>
        </div>` : ""}
      </div>`;
    }).join("");
    $$("#tList [data-toggle]").forEach(b => b.onclick = () => { const id = b.dataset.toggle; offenEx[id] = b.getAttribute("aria-expanded") !== "true"; renderTraining(); });
    $$("#tList [data-info]").forEach(b => b.onclick = () => openUebung(b.dataset.info));
    $$("#tList [data-kg]").forEach(i => i.onchange = () => { const [id, k] = i.dataset.kg.split("|"); A.ex[id][k].kg = num(i.value); A.leer = false; save(); });
    $$("#tList [data-wdh]").forEach(i => i.onchange = () => { const [id, k] = i.dataset.wdh.split("|"); A.ex[id][k].wdh = num(i.value); A.leer = false; save(); });
    $$("#tList [data-ok]").forEach(b => b.onclick = () => {
      const [id, k] = b.dataset.ok.split("|"), s = A.ex[id][k], u = C.uebungen[id];
      const row = b.closest(".setRow"), kgIn = row.querySelector("[data-kg]"), wIn = row.querySelector("[data-wdh]");
      s.kg = num(kgIn.value); s.wdh = num(wIn.value);
      if (!s.ok && s.wdh == null) { s.wdh = topWdh(u.wdh); }
      s.ok = !s.ok; A.leer = false;
      // Gewicht in nächste Sätze übernehmen
      if (s.ok) A.ex[id].forEach((n2, j) => { if (j > k && !n2.ok && n2.kg == null) n2.kg = s.kg; });
      save();
      const allDone = A.ex[id].every(x => x.ok);
      if (allDone) { offenEx[id] = false; const next = C.training.einheiten.find(x => x.id === einheit).uebungen.find(x => !A.ex[x].every(y => y.ok)); if (next) offenEx[next] = true; }
      renderTraining();
      if (s.ok) startTimer(u.pauseSek);
    });
    // Verlauf
    $("#tLog").innerHTML = S.logs.length
      ? `<table><thead><tr><th>Datum</th><th>Einheit</th><th>Sätze</th><th>Volumen</th></tr></thead><tbody>${S.logs.slice(0, 10).map(l => {
          const all = l.saetze ? Object.values(l.saetze).flat() : [];
          const vol = all.reduce((a, s) => a + (s.kg || 0) * (s.wdh || 0), 0);
          return `<tr><td class="num">${fmtDate(l.datum)}</td><td>${esc(l.einheit)}</td><td class="num">${all.length || Object.keys(l.werte || {}).length}</td><td class="num">${vol ? de(vol) + " kg" : "–"}</td></tr>`;
        }).join("")}</tbody></table>`
      : '<p class="muted m0">Noch keine Einheit. Hake im Gym jeden Satz ab, am Ende auf „Einheit abschließen“.</p>';
  }
  const firstOpen = (e, A) => Math.max(0, e.uebungen.findIndex(id => !A.ex[id].every(s => s.ok)));
  $("#tDate").value = todayISO();
  $("#tSave").onclick = () => {
    const A = S.aktiv; if (!A) return;
    const saetze = {}, werte = {};
    for (const [id, sets] of Object.entries(A.ex)) {
      const ok = sets.filter(s => s.ok).map(s => ({ kg: s.kg, wdh: s.wdh }));
      if (ok.length) { saetze[id] = ok; const kgs = ok.map(s => s.kg).filter(x => x != null); if (kgs.length) werte[id] = Math.max(...kgs); else werte[id] = Math.max(...ok.map(s => s.wdh || 0)); }
    }
    if (!Object.keys(saetze).length) return toast("Hake erst mindestens einen Satz ab");
    S.logs.unshift({ datum: $("#tDate").value || todayISO(), einheit: A.einheit, werte, saetze, ts: Date.now() });
    S.logs.sort((a, b) => b.datum.localeCompare(a.datum) || b.ts - a.ts);
    S.aktiv = null; einheit = naechsteEinheit(); for (const k in offenEx) delete offenEx[k];
    stopTimer(); save(); renderAll(); toast(`Einheit ${A.einheit} gespeichert. Stark!`);
  };
  let discardArm = false;
  $("#tDiscard").onclick = () => {
    if (!discardArm) { discardArm = true; $("#tDiscard").textContent = "Wirklich verwerfen? Nochmal tippen"; setTimeout(() => { discardArm = false; $("#tDiscard").textContent = "Einheit verwerfen"; }, 3000); return; }
    discardArm = false; $("#tDiscard").textContent = "Einheit verwerfen"; S.aktiv = null; stopTimer(); save(); renderTraining(); toast("Verworfen");
  };

  /* Pausen-Timer */
  let tEnd = 0, tLen = 0, tInt = null;
  function startTimer(sec) { tLen = sec; tEnd = Date.now() + sec * 1000; $("#timer").hidden = false; document.body.classList.add("timerOn"); tick(); clearInterval(tInt); tInt = setInterval(tick, 250); }
  function stopTimer() { clearInterval(tInt); $("#timer").hidden = true; document.body.classList.remove("timerOn"); $("#timer").classList.remove("over"); }
  function tick() {
    const left = Math.round((tEnd - Date.now()) / 1000);
    $("#tTime").textContent = left >= 0 ? mmss(left) : "Los!";
    $("#tBarFill").style.width = Math.max(0, Math.min(100, left / tLen * 100)) + "%";
    $("#timer").classList.toggle("over", left < 0);
    if (left === 0 && navigator.vibrate) navigator.vibrate(300);
    if (left < -20) stopTimer();
  }
  $("#tPlus").onclick = () => { tEnd += 15000; tLen += 15; tick(); };
  $("#tSkip").onclick = stopTimer;

  function openUebung(id) {
    const u = C.uebungen[id];
    const hist = S.logs.filter(l => l.werte && l.werte[id] != null).slice(0, 6);
    openSheet(`<h2>${esc(u.name)}</h2>
      <div class="bigFig">${window.figureFor(id)}</div>
      ${u.bild ? `<img class="heroImg" src="${esc(u.bild.src)}" alt="Foto: ${esc(u.name)}" loading="lazy">${bildCredit(u.bild)}` : ""}
      <div class="facts"><span class="fact">${u.saetze} × ${esc(u.wdh)}</span><span class="fact">Pause ${mmss(u.pauseSek)}</span><span class="fact">${esc(u.muskeln)}</span></div>
      <div class="card section"><div class="label">Ausgangsposition</div><p class="m0">${esc(u.start)}</p></div>
      <div class="card section"><div class="label">Ausführung</div><ol class="steps" style="margin-top:6px">${u.ablauf.map(t => `<li><span>${esc(t)}</span></li>`).join("")}</ol></div>
      <div class="grid2">
        <div class="card section small"><div class="label">Atmung</div><span>${esc(u.atmung)}</span></div>
        <div class="card section small"><div class="label">Startgewicht</div><span>${esc(u.startgewicht)}</span></div>
      </div>
      <div class="note"><b>Typischer Fehler:</b> ${esc(u.fehler)}</div>
      <div class="card section small"><div class="label">Gerät belegt?</div><span>${esc(u.alternative)}</span></div>
      ${hist.length ? `<div class="card section small"><div class="label">Deine letzten Werte</div><div class="hist">${hist.map(l => `<span class="fact num">${fmtDate(l.datum)}: ${de(l.werte[id])} ${esc(u.einheit)}</span>`).join("")}</div></div>` : ""}
      <a class="btn ghost" href="https://www.youtube.com/results?search_query=${encodeURIComponent(u.name + " richtige Ausführung")}" target="_blank" rel="noopener">Video auf YouTube ansehen</a>`);
  }

  const bildCredit = b => b && b.by ? `<div class="credit">Foto: <a href="${esc(b.link)}" target="_blank" rel="noopener">${esc(b.by)}</a>${b.lic ? " · " + esc(b.lic) : ""}</div>` : "";
  /* ---------- Essen ---------- */
  async function renderEssen() {
    const fotos = await fotoAll();
    const cover = r => (fotos[r.id] || (r.bild && r.bild.src)) ? `<img class="rimg" src="${esc(fotos[r.id] || r.bild.src)}" alt="" loading="lazy">` : `<div class="rph" style="background-color:${r.farbe}">${esc(r.tag || r.zeit)}</div>`;
    $("#rZuhause").innerHTML = C.rezepte.filter(r => r.art === "zuhause").map(r => `<button class="rwide" type="button" data-r="${r.id}">${cover(r)}
      <div class="rtxt"><h3>${esc(r.name)}</h3><span class="small muted">${esc(r.zeit)} · ${esc(r.naehr || "")}</span><span class="small">${esc(r.kurz)}</span></div></button>`).join("");
    $("#rMit").innerHTML = C.rezepte.filter(r => r.art === "mitnehmen").map(r => `<button class="rcard" type="button" data-r="${r.id}">${cover(r)}
      <div class="rtxt"><h3>${esc(r.name)}</h3><span class="small muted">${esc(r.zeit)}</span></div></button>`).join("");
    $$("[data-r]").forEach(b => b.onclick = () => openRezept(b.dataset.r));
    const f = C.fruehstueck;
    $("#fruehstueck").innerHTML = `<p class="m0">${esc(f.text)}</p><ul class="z" style="margin-top:8px">${f.optionen.map(o => `<li>${esc(o)}</li>`).join("")}</ul>`;
  }
  async function openRezept(id) {
    const r = C.rezepte.find(x => x.id === id); if (!r) return;
    const eigen = await fotoGet(id), foto = eigen || (r.bild && r.bild.src);
    openSheet(`<h2>${esc(r.name)}</h2>
      ${foto ? `<img class="heroImg" src="${esc(foto)}" alt="Foto: ${esc(r.name)}">${!eigen ? bildCredit(r.bild) : ""}` : `<div class="rph" style="background-color:${r.farbe};border-radius:12px;font-size:22px;aspect-ratio:16/9">${esc(r.name)}</div>`}
      <label class="btn ghost" for="fotoIn">${eigen ? "Foto ersetzen" : "Eigenes Foto machen"}</label>
      <input type="file" id="fotoIn" accept="image/*" hidden>
      <div class="facts"><span class="fact">${esc(r.zeit)}</span><span class="fact">${esc(r.portionen)}</span>${r.naehr ? `<span class="fact">${esc(r.naehr)}</span>` : ""}</div>
      <p class="m0">${esc(r.kurz)}</p>
      <div class="card"><div class="label">Zutaten</div><ul class="z" style="margin-top:6px">${r.zutaten.map(z => `<li>${esc(z)}</li>`).join("")}</ul></div>
      <div class="card"><div class="label" style="margin-bottom:8px">Zubereitung</div><ol class="steps">${r.schritte.map(s => `<li><span><b>${esc(s.t)} <span class="muted small">· ${s.min} Min.</span></b>${esc(s.d)}</span></li>`).join("")}</ol></div>
      ${r.samu ? `<div class="note"><b>Für den Kleinen:</b> ${esc(r.samu)}</div>` : ""}
      ${r.reste ? `<div class="note"><b>Reste:</b> ${esc(r.reste)}</div>` : ""}`);
    $("#fotoIn").onchange = async ev => {
      const file = ev.target.files[0]; if (!file) return;
      try { await fotoSet(id, await shrink(file)); toast("Foto gespeichert"); await renderEssen(); openRezept(id); }
      catch (e) { toast("Foto ging nicht"); }
    };
  }

  /* ---------- Einkauf ---------- */
  let liste = "familie";
  const itemKey = (l, t) => `${C.version}|${l}|${t}`;
  const listItems = l => [...C.einkauf[l].flatMap(([, arr]) => arr.map(t => ({ t, k: itemKey(l, t) }))), ...S.extra.filter(x => x.l === l).map(x => ({ t: x.t, k: x.k }))];
  function renderEinkauf() {
    $$("#eSeg button").forEach(b => b.setAttribute("aria-pressed", b.dataset.l === liste));
    const groups = C.einkauf[liste].map(([g, arr]) => [g, arr.map(t => ({ t, k: itemKey(liste, t) }))]);
    const extra = S.extra.filter(x => x.l === liste).map(x => ({ t: x.t, k: x.k }));
    if (extra.length) groups.push(["Dazu", extra]);
    let open = 0, all = 0;
    $("#eList").innerHTML = groups.map(([g, arr]) => `<div class="rub"><div class="label">${esc(g)}</div>${arr.map(i => {
      const on = !!S.checks[i.k]; all++; if (!on) open++;
      return `<button class="check" type="button" role="checkbox" aria-checked="${on}" data-k="${esc(i.k)}"><span class="box"></span><span class="txt">${esc(i.t)}</span></button>`;
    }).join("")}</div>`).join("");
    $("#eCount").textContent = `${open} offen · ${all - open} erledigt`;
    $("#eBar").style.width = (all ? (all - open) / all * 100 : 0) + "%";
    $$("#eList .check").forEach(b => b.onclick = () => { const k = b.dataset.k; if (S.checks[k]) delete S.checks[k]; else S.checks[k] = 1; save(); renderEinkauf(); renderHeute(); });
  }
  $$("#eSeg button").forEach(b => b.onclick = () => { liste = b.dataset.l; renderEinkauf(); });
  $("#eForm").addEventListener("submit", ev => { ev.preventDefault(); const t = $("#eNew").value.trim(); if (!t) return; S.extra.push({ l: liste, t, k: "x|" + Date.now() }); $("#eNew").value = ""; save(); renderEinkauf(); renderHeute(); });
  $("#eReset").onclick = () => {
    S.extra = S.extra.filter(x => x.l !== liste || !S.checks[x.k]);
    for (const k of Object.keys(S.checks)) if (k.includes(`|${liste}|`)) delete S.checks[k];
    save(); renderEinkauf(); renderHeute(); toast("Liste zurückgesetzt");
  };

  /* ---------- Fortschritt ---------- */
  $("#kD").value = todayISO();
  function renderKoerper() {
    const k = [...S.koerper].sort((a, b) => a.datum.localeCompare(b.datum));
    const stat = (lab, key, unit) => {
      const v = k.filter(x => x[key] != null), f = v[0], l = v[v.length - 1], d = v.length > 1 ? l[key] - f[key] : null;
      return `<div class="card stat"><div class="label">${lab}</div><div class="v num">${l ? de(l[key]) : "–"}<span class="small muted"> ${unit}</span></div>
        <div class="small num delta ${d == null ? "muted" : d <= 0 ? "good" : "bad"}">${d == null ? "noch kein Verlauf" : (d > 0 ? "+" : "") + de(d) + " " + unit + " seit Start"}</div></div>`;
    };
    $("#kStats").innerHTML = stat("Gewicht", "gewicht", "kg") + stat("Bauch", "bauch", "cm");
    const pts = k.filter(x => x.bauch != null);
    if (pts.length >= 2) {
      const W = 320, H = 150, P = { l: 34, r: 10, t: 10, b: 24 };
      const ys = pts.map(p => p.bauch), mn = Math.floor(Math.min(...ys) - 1), mx = Math.ceil(Math.max(...ys) + 1);
      const x = i => P.l + (W - P.l - P.r) * i / (pts.length - 1), y = v => P.t + (H - P.t - P.b) * (mx - v) / (mx - mn);
      const line = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.bauch).toFixed(1)}`).join("");
      const ticks = [mn, Math.round((mn + mx) / 2), mx];
      $("#kChart").innerHTML = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Verlauf Bauchumfang">
        ${ticks.map(t => `<line x1="${P.l}" x2="${W - P.r}" y1="${y(t)}" y2="${y(t)}" stroke="var(--line)"/><text x="${P.l - 6}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${t}</text>`).join("")}
        <path d="${line}L${x(pts.length - 1)},${H - P.b}L${x(0)},${H - P.b}Z" fill="var(--accent-soft)"/><path d="${line}" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
        <circle cx="${x(pts.length - 1)}" cy="${y(pts[pts.length - 1].bauch)}" r="4.5" fill="var(--accent)"/>
        <text x="${P.l}" y="${H - 6}" font-size="11" fill="var(--muted)">${fmtDate(pts[0].datum)}</text><text x="${W - P.r}" y="${H - 6}" font-size="11" fill="var(--muted)" text-anchor="end">${fmtDate(pts[pts.length - 1].datum)}</text></svg>`;
    } else $("#kChart").innerHTML = `<p class="small muted m0" style="margin-top:6px">${pts.length ? "Erster Wert ist drin. Ab dem zweiten siehst du die Kurve." : "Noch keine Werte. Einmal pro Woche morgens auf Bauchnabelhöhe messen."}</p>`;
    // Kraft
    const rows = Object.entries(C.uebungen).filter(([, u]) => u.einheit !== "Sek.").map(([id, u]) => {
      const vals = S.logs.filter(l => l.werte && l.werte[id] != null).map(l => l.werte[id]);
      if (!vals.length) return null;
      const first = vals[vals.length - 1], best = Math.max(...vals);
      return `<tr><td>${esc(u.name)}</td><td class="num">${de(best)} kg</td><td class="num delta ${best > first ? "good" : "muted"}">${best > first ? "+" + de(best - first) : "–"}</td></tr>`;
    }).filter(Boolean);
    $("#kKraft").innerHTML = rows.length ? `<table style="margin-top:6px"><thead><tr><th>Übung</th><th>Bestwert</th><th>seit Start</th></tr></thead><tbody>${rows.join("")}</tbody></table>` : '<p class="small muted m0" style="margin-top:6px">Erscheint nach deiner ersten Einheit.</p>';
    $("#kTable").innerHTML = k.length ? `<table><thead><tr><th>Datum</th><th>Gewicht</th><th>Bauch</th></tr></thead><tbody>${[...k].reverse().slice(0, 10).map(r => `<tr><td class="num">${fmtDate(r.datum)}</td><td class="num">${de(r.gewicht)} kg</td><td class="num">${de(r.bauch)} cm</td></tr>`).join("")}</tbody></table>` : "";
    $("#appVer").textContent = `App-Version ${C.appVersion || "1"} · Inhalte ${C.version}`;
  }
  $("#kForm").addEventListener("submit", ev => {
    ev.preventDefault();
    const g = num($("#kW").value), b = num($("#kB").value);
    if (g == null && b == null) return toast("Gewicht oder Bauch eintragen");
    const datum = $("#kD").value || todayISO();
    S.koerper = S.koerper.filter(x => x.datum !== datum); S.koerper.push({ datum, gewicht: g, bauch: b });
    $("#kW").value = ""; $("#kB").value = ""; save(); renderKoerper(); toast("Gespeichert");
  });

  /* ---------- Sicherung ---------- */
  $("#bExport").onclick = async () => {
    const blob = new Blob([JSON.stringify({ app: "mario-coach", stand: new Date().toISOString(), daten: S, fotos: await fotoAll() })], { type: "application/json" });
    const file = new File([blob], `mario-coach-sicherung-${todayISO()}.json`, { type: "application/json" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: "Mario Coach Sicherung" }); return; } catch (e) { if (e.name === "AbortError") return; } }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = file.name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };
  $("#bImport").onchange = async ev => {
    const file = ev.target.files[0]; if (!file) return;
    try {
      const j = JSON.parse(await file.text()); if (j.app !== "mario-coach") throw 0;
      S = Object.assign({}, blank, j.daten); save();
      for (const [id, d] of Object.entries(j.fotos || {})) await fotoSet(id, d);
      renderAll(); toast("Sicherung geladen");
    } catch (e) { toast("Das ist keine Coach-Sicherung"); }
    ev.target.value = "";
  };

  function renderAll() { renderHeute(); renderTraining(); renderEssen(); renderEinkauf(); renderKoerper(); }
  renderAll();
  show(S.tab);
  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
})();
