(function () {
  const C = window.COACH;
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const todayISO = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
  const fmtDate = iso => { const [, m, d] = iso.split("-"); return `${+d}.${+m}.`; };
  const num = v => (v == null || v === "") ? null : Number(String(v).replace(",", "."));
  const de = n => n == null ? "–" : String(n).replace(".", ",");
  let toastT;
  const toast = t => { const el = $("#toast"); el.textContent = t; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => el.hidden = true, 1800); };

  /* ---------- Eigene Daten (nur auf diesem Handy) ---------- */
  const KEY = "mario-coach-v1";
  const blank = { checks: {}, extra: [], logs: [], koerper: [], tab: "woche" };
  let S;
  try { S = Object.assign({}, blank, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { S = { ...blank }; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast("Speicher voll"); } };

  /* Fotos in IndexedDB */
  const idb = new Promise((res) => {
    try {
      const r = indexedDB.open("mario-coach", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("fotos");
      r.onsuccess = () => res(r.result);
      r.onerror = () => res(null);
    } catch (e) { res(null); }
  });
  async function fotoGet(id) {
    const db = await idb; if (!db) return null;
    return new Promise(res => { const q = db.transaction("fotos").objectStore("fotos").get(id); q.onsuccess = () => res(q.result || null); q.onerror = () => res(null); });
  }
  async function fotoSet(id, dataUrl) {
    const db = await idb; if (!db) throw new Error("kein Speicher");
    return new Promise((res, rej) => { const t = db.transaction("fotos", "readwrite"); t.objectStore("fotos").put(dataUrl, id); t.oncomplete = res; t.onerror = rej; });
  }
  async function fotoAll() {
    const db = await idb; if (!db) return {};
    return new Promise(res => {
      const out = {}; const c = db.transaction("fotos").objectStore("fotos").openCursor();
      c.onsuccess = () => { const cur = c.result; if (cur) { out[cur.key] = cur.value; cur.continue(); } else res(out); };
      c.onerror = () => res(out);
    });
  }
  function shrink(file) {
    return new Promise((res, rej) => {
      const img = new Image(); const url = URL.createObjectURL(file);
      img.onload = () => {
        const max = 1200, s = Math.min(1, max / Math.max(img.width, img.height));
        const cv = document.createElement("canvas"); cv.width = Math.round(img.width * s); cv.height = Math.round(img.height * s);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url);
        res(cv.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = rej; img.src = url;
    });
  }

  /* ---------- Navigation ---------- */
  const views = ["woche", "training", "essen", "einkauf", "fortschritt"];
  function show(v) {
    if (!views.includes(v)) v = "woche";
    document.querySelectorAll("[data-view]").forEach(s => s.hidden = s.id !== "v-" + v);
    document.querySelectorAll(".tab").forEach(t => t.dataset.v === v ? t.setAttribute("aria-current", "page") : t.removeAttribute("aria-current"));
    S.tab = v; save(); window.scrollTo(0, 0);
  }
  document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => { closeSheet(); show(t.dataset.v); }));

  const sheet = $("#sheet");
  function openSheet(html) { $("#sheetBody").innerHTML = html; sheet.hidden = false; sheet.scrollTop = 0; document.body.style.overflow = "hidden"; history.pushState({ sheet: 1 }, ""); }
  function closeSheet() { if (sheet.hidden) return; sheet.hidden = true; document.body.style.overflow = ""; }
  $("#sheetBack").onclick = () => { if (history.state && history.state.sheet) history.back(); else closeSheet(); };
  window.addEventListener("popstate", closeSheet);

  /* ---------- Woche ---------- */
  function renderWoche() {
    const w = C.woche; $("#kw").textContent = w.titel; const t = todayISO();
    $("#woche").innerHTML = w.tage.map(d => `<div class="day${d.iso === t ? " today" : ""}">
      <div><div class="dname">${esc(d.tag)}</div><div class="ddate num">${esc(d.datum)}</div></div>
      <div class="items">${d.items.length ? d.items.map(i => `<div class="item"><span class="chip ${esc(i.typ)}">${esc(i.typ)}</span><span>${esc(i.text)}</span></div>`).join("") : '<span class="free">frei</span>'}</div></div>`).join("");
    const n = $("#wocheNote"); n.hidden = !w.hinweis; n.textContent = w.hinweis || "";
  }

  /* ---------- Training ---------- */
  let einheit = "A";
  const weekStart = () => { const x = new Date(); x.setDate(x.getDate() - (x.getDay() + 6) % 7); x.setHours(0, 0, 0, 0); return x; };
  const lastFor = (id) => { for (const l of S.logs) if (l.werte && l.werte[id] != null) return l.werte[id]; return null; };
  const thumb = id => (window.figureFor(id).match(/<svg[\s\S]*?<\/svg>/) || [""])[0];
  const videoUrl = name => "https://www.youtube.com/results?search_query=" + encodeURIComponent(name + " richtige Ausführung");

  function renderTraining() {
    const tp = C.training;
    const n = S.logs.filter(l => new Date(l.datum + "T12:00") >= weekStart()).length;
    $("#tCount").textContent = `${n} von 2 Einheiten`;
    document.querySelectorAll("#tMeter i").forEach((i, k) => i.classList.toggle("on", k < n));
    $("#tHint").textContent = tp.regel; $("#tWarm").textContent = "Aufwärmen: " + tp.aufwaermen;
    $("#tSeg").innerHTML = tp.einheiten.map(e => `<button type="button" data-e="${e.id}" aria-pressed="${e.id === einheit}">Einheit ${e.id}</button>`).join("");
    $("#tSeg").querySelectorAll("button").forEach(b => b.onclick = () => { keepInputs(); einheit = b.dataset.e; renderTraining(); });
    const e = tp.einheiten.find(x => x.id === einheit);
    $("#tList").innerHTML = e.uebungen.map(id => {
      const u = C.uebungen[id], prev = lastFor(id), draft = drafts[id];
      return `<div class="card ex">
        <button class="thumb" type="button" data-u="${id}" aria-label="${esc(u.name)} ansehen">${thumb(id)}</button>
        <div style="min-width:0"><div class="name">${esc(u.name)}</div>
          <div class="meta">${esc(u.satz)}${prev != null ? ` · zuletzt <b class="num">${de(prev)}</b>` : ""}</div>
          <button class="more" type="button" data-u="${id}">Technik ansehen</button></div>
        <input type="number" step="0.5" inputmode="decimal" data-id="${id}" placeholder="${esc(u.einheit)}" aria-label="${esc(u.name)} in ${esc(u.einheit)}" value="${draft ?? (prev ?? "")}">
      </div>`;
    }).join("");
    $("#tList").querySelectorAll("[data-u]").forEach(b => b.onclick = () => openUebung(b.dataset.u));
    $("#tLog").innerHTML = S.logs.length
      ? `<table><thead><tr><th>Datum</th><th>Einheit</th><th>Übungen</th></tr></thead><tbody>${S.logs.slice(0, 8).map(l => `<tr><td class="num">${fmtDate(l.datum)}</td><td>${esc(l.einheit)}</td><td class="num">${Object.keys(l.werte).length}</td></tr>`).join("")}</tbody></table>`
      : '<p class="muted m0">Noch keine Einheit gespeichert. Trag nach dem Gym deine Gewichte oben ein.</p>';
  }
  const drafts = {};
  function keepInputs() { document.querySelectorAll("#tList input[data-id]").forEach(i => { drafts[i.dataset.id] = i.value; }); }
  $("#tDate").value = todayISO();
  $("#tSave").onclick = () => {
    const werte = {};
    document.querySelectorAll("#tList input[data-id]").forEach(i => { const v = num(i.value); if (v != null && !isNaN(v)) werte[i.dataset.id] = v; });
    if (!Object.keys(werte).length) return toast("Erst Gewichte eintragen");
    S.logs.unshift({ datum: $("#tDate").value || todayISO(), einheit, werte, ts: Date.now() });
    S.logs.sort((a, b) => b.datum.localeCompare(a.datum) || b.ts - a.ts);
    for (const k in drafts) delete drafts[k];
    save(); renderTraining(); toast(`Einheit ${einheit} gespeichert`);
  };
  function openUebung(id) {
    const u = C.uebungen[id], prev = lastFor(id);
    openSheet(`<h2>${esc(u.name)}</h2>
      ${window.figureFor(id)}
      <div class="facts"><span class="fact">${esc(u.satz)}</span><span class="fact">Pause ${esc(u.pause)}</span><span class="fact">${esc(u.muskeln)}</span>${prev != null ? `<span class="fact">zuletzt ${de(prev)} ${esc(u.einheit)}</span>` : ""}</div>
      <div class="card"><div class="label">So geht's</div><ol class="steps" style="margin-top:8px">${u.technik.map(t => `<li><span>${esc(t)}</span></li>`).join("")}</ol></div>
      <div class="note"><b>Typischer Fehler:</b> ${esc(u.fehler)}</div>
      <a class="btn ghost" href="${videoUrl(u.name)}" target="_blank" rel="noopener">Video auf YouTube ansehen</a>`);
  }

  /* ---------- Essen ---------- */
  async function renderEssen() {
    const f = C.fruehstueck;
    $("#fruehstueck").innerHTML = `<p class="m0">${esc(f.text)}</p><ul class="z" style="margin-top:8px">${f.optionen.map(o => `<li>${esc(o)}</li>`).join("")}</ul>`;
    const fotos = await fotoAll();
    const card = r => `<button class="rcard" type="button" data-r="${r.id}">
      ${fotos[r.id] ? `<img class="rimg" src="${fotos[r.id]}" alt="">` : `<div class="rph" style="background:${r.farbe}">${esc(r.tag || r.zeit)}</div>`}
      <div class="rtxt"><h3>${esc(r.name)}</h3><span class="small muted">${esc(r.zeit)}${r.tag ? " · " + esc(r.tag) : ""}</span></div></button>`;
    $("#rZuhause").innerHTML = C.rezepte.filter(r => r.art === "zuhause").map(card).join("");
    $("#rMit").innerHTML = C.rezepte.filter(r => r.art === "mitnehmen").map(card).join("");
    document.querySelectorAll("[data-r]").forEach(b => b.onclick = () => openRezept(b.dataset.r));
  }
  async function openRezept(id) {
    const r = C.rezepte.find(x => x.id === id), foto = await fotoGet(id);
    openSheet(`<h2>${esc(r.name)}</h2>
      ${foto ? `<img class="hero" src="${foto}" alt="Foto: ${esc(r.name)}">` : `<div class="rph" style="background:${r.farbe};border-radius:12px;font-size:22px">${esc(r.name)}</div>`}
      <label class="btn ghost" for="fotoIn">${foto ? "Foto ersetzen" : "Foto vom Gericht machen"}</label>
      <input type="file" id="fotoIn" accept="image/*" hidden>
      <div class="facts"><span class="fact">${esc(r.zeit)}</span><span class="fact">${esc(r.portionen)}</span>${r.naehr ? `<span class="fact">${esc(r.naehr)}</span>` : ""}</div>
      <p class="m0">${esc(r.kurz)}</p>
      <div class="card"><div class="label">Zutaten</div><ul class="z" style="margin-top:6px">${r.zutaten.map(z => `<li>${esc(z)}</li>`).join("")}</ul></div>
      <div class="card"><div class="label" style="margin-bottom:8px">Zubereitung</div><ol class="steps">${r.schritte.map(s => `<li><span><b>${esc(s.t)} <span class="muted small">· ${s.min} Min.</span></b>${esc(s.d)}</span></li>`).join("")}</ol></div>
      ${r.samu ? `<div class="note"><b>Für Samu:</b> ${esc(r.samu)}</div>` : ""}
      ${r.reste ? `<div class="note"><b>Reste:</b> ${esc(r.reste)}</div>` : ""}`);
    $("#fotoIn").onchange = async ev => {
      const file = ev.target.files[0]; if (!file) return;
      try { await fotoSet(id, await shrink(file)); toast("Foto gespeichert"); renderEssen(); history.back(); setTimeout(() => openRezept(id), 50); }
      catch (e) { toast("Foto ging nicht"); }
    };
  }

  /* ---------- Einkauf ---------- */
  let liste = "familie";
  const itemKey = (l, t) => `${C.version}|${l}|${t}`;
  function renderEinkauf() {
    document.querySelectorAll("#eSeg button").forEach(b => b.setAttribute("aria-pressed", b.dataset.l === liste));
    const groups = C.einkauf[liste].map(([g, arr]) => [g, arr.map(t => ({ t, k: itemKey(liste, t) }))]);
    const extra = S.extra.filter(x => x.l === liste).map(x => ({ t: x.t, k: x.k, extra: true }));
    if (extra.length) groups.push(["Dazu", extra]);
    let open = 0, all = 0;
    $("#eList").innerHTML = groups.map(([g, arr]) => `<div class="rub"><div class="label">${esc(g)}</div>${arr.map(i => {
      const on = !!S.checks[i.k]; all++; if (!on) open++;
      return `<button class="check" type="button" role="checkbox" aria-checked="${on}" data-k="${esc(i.k)}"><span class="box"></span><span class="txt">${esc(i.t)}</span></button>`;
    }).join("")}</div>`).join("");
    $("#eCount").textContent = `${open} offen · ${all - open} erledigt`;
    $("#eList").querySelectorAll(".check").forEach(b => b.onclick = () => {
      const k = b.dataset.k; if (S.checks[k]) delete S.checks[k]; else S.checks[k] = 1; save(); renderEinkauf();
    });
  }
  document.querySelectorAll("#eSeg button").forEach(b => b.onclick = () => { liste = b.dataset.l; renderEinkauf(); });
  $("#eForm").addEventListener("submit", ev => {
    ev.preventDefault(); const t = $("#eNew").value.trim(); if (!t) return;
    S.extra.push({ l: liste, t, k: "x|" + Date.now() }); $("#eNew").value = ""; save(); renderEinkauf();
  });
  $("#eReset").onclick = () => {
    for (const k of Object.keys(S.checks)) if (k.includes(`|${liste}|`) || S.extra.some(x => x.k === k && x.l === liste)) delete S.checks[k];
    S.extra = S.extra.filter(x => x.l !== liste || !S.checks[x.k]);
    save(); renderEinkauf(); toast("Liste zurückgesetzt");
  };

  /* ---------- Fortschritt ---------- */
  $("#kD").value = todayISO();
  function renderKoerper() {
    const k = [...S.koerper].sort((a, b) => a.datum.localeCompare(b.datum));
    const stat = (lab, key, unit) => {
      const v = k.filter(x => x[key] != null), f = v[0], l = v[v.length - 1];
      const d = v.length > 1 ? Math.round((l[key] - f[key]) * 10) / 10 : null;
      return `<div class="card stat"><div class="label">${lab}</div><div class="v num">${l ? de(l[key]) : "–"}<span class="small muted"> ${unit}</span></div>
        <div class="small num delta ${d == null ? "muted" : d <= 0 ? "good" : "bad"}">${d == null ? "noch kein Verlauf" : (d > 0 ? "+" : "") + de(d) + " " + unit + " seit Start"}</div></div>`;
    };
    $("#kStats").innerHTML = stat("Gewicht", "gewicht", "kg") + stat("Bauch", "bauch", "cm");
    const pts = k.filter(x => x.bauch != null);
    if (pts.length >= 2) {
      const W = 320, H = 150, P = { l: 34, r: 10, t: 10, b: 24 };
      const ys = pts.map(p => p.bauch); const mn = Math.floor(Math.min(...ys) - 1), mx = Math.ceil(Math.max(...ys) + 1);
      const x = i => P.l + (W - P.l - P.r) * i / (pts.length - 1), y = v => P.t + (H - P.t - P.b) * (mx - v) / (mx - mn);
      const line = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.bauch).toFixed(1)}`).join("");
      const ticks = [mn, Math.round((mn + mx) / 2), mx];
      $("#kChart").innerHTML = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Verlauf Bauchumfang">
        ${ticks.map(t => `<line x1="${P.l}" x2="${W - P.r}" y1="${y(t)}" y2="${y(t)}" stroke="var(--line)"/><text x="${P.l - 6}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${t}</text>`).join("")}
        <path d="${line}L${x(pts.length - 1)},${H - P.b}L${x(0)},${H - P.b}Z" fill="var(--accent-soft)"/>
        <path d="${line}" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
        <circle cx="${x(pts.length - 1)}" cy="${y(pts[pts.length - 1].bauch)}" r="4.5" fill="var(--accent)"/>
        <text x="${P.l}" y="${H - 6}" font-size="11" fill="var(--muted)">${fmtDate(pts[0].datum)}</text>
        <text x="${W - P.r}" y="${H - 6}" font-size="11" fill="var(--muted)" text-anchor="end">${fmtDate(pts[pts.length - 1].datum)}</text></svg>`;
    } else {
      $("#kChart").innerHTML = `<p class="small muted m0" style="margin-top:6px">${pts.length ? "Erster Wert ist drin. Ab dem zweiten siehst du hier die Kurve." : "Noch keine Werte. Einmal pro Woche morgens auf Bauchnabelhöhe messen und unten eintragen."}</p>`;
    }
    $("#kTable").innerHTML = k.length ? `<table><thead><tr><th>Datum</th><th>Gewicht</th><th>Bauch</th></tr></thead><tbody>${[...k].reverse().slice(0, 10).map(r => `<tr><td class="num">${fmtDate(r.datum)}</td><td class="num">${de(r.gewicht)} kg</td><td class="num">${de(r.bauch)} cm</td></tr>`).join("")}</tbody></table>` : "";
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

  function renderAll() { renderWoche(); renderTraining(); renderEssen(); renderEinkauf(); renderKoerper(); }
  renderAll();
  show(S.tab);

  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
})();
