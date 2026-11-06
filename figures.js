// Skizzen der Übungen: Start- und Endposition als Strichfigur (Seitenansicht).
// Punkte: h Kopf, n Hals, p Hüfte, k Knie, f Fuß, e Ellbogen, w Hand. Boden bei y=95.
(function () {
  const P = (h, n, p, k, f, e, w) => ({ h, n, p, k, f, e, w });
  const stand = (dx = 0, dy = 0) => ({ h: [60 + dx, 18 + dy], n: [60 + dx, 28 + dy], p: [60 + dx, 55 + dy], k: [61 + dx, 75 + dy], f: [60 + dx, 95] });

  const POSES = {
    kniebeuge: { gear: ["kh"], a: { ...stand(), e: [67, 40], w: [64, 31] },
      b: P([55, 44], [56, 54], [40, 72], [66, 73], [60, 95], [68, 60], [65, 54]) },
    bankdruecken: { gear: ["bench", "bar"], a: P([24, 61], [32, 63], [68, 63], [86, 66], [92, 95], [38, 46], [38, 30]),
      b: P([24, 61], [32, 63], [68, 63], [86, 66], [92, 95], [44, 74], [40, 55]) },
    rudern: { gear: ["seat", "cable"], a: P([52, 30], [52, 40], [46, 68], [70, 62], [90, 66], [64, 48], [78, 50]),
      b: P([49, 30], [49, 40], [46, 68], [70, 62], [90, 66], [36, 54], [54, 54]) },
    rdl: { gear: ["bar"], a: { ...stand(), e: [61, 42], w: [62, 57] },
      b: P([86, 45], [78, 47], [54, 55], [58, 75], [60, 95], [79, 61], [77, 76]) },
    plank: { gear: [], a: P([26, 66], [33, 70], [66, 72], [86, 79], [104, 93], [33, 92], [46, 92]),
      b: P([26, 66], [33, 70], [66, 72], [86, 79], [104, 93], [33, 92], [46, 92]) },
    beinpresse: { gear: ["sled"], a: P([26, 46], [33, 52], [52, 74], [66, 52], [86, 62], [42, 66], [52, 72]),
      b: P([26, 46], [33, 52], [52, 74], [74, 63], [96, 53], [42, 66], [52, 72]) },
    latzug: { gear: ["seat", "latbar"], a: P([58, 32], [58, 42], [58, 68], [80, 68], [82, 93], [60, 24], [61, 8]),
      b: P([56, 32], [57, 42], [58, 68], [80, 68], [82, 93], [52, 56], [64, 42]) },
    schulterdruecken: { gear: ["kh"], a: { ...stand(0, 8), e: [52, 46], w: [58, 36] },
      b: { ...stand(0, 8), e: [60, 18], w: [60, 4] } },
    hipthrust: { gear: ["lowbench", "bar"], a: P([24, 46], [32, 52], [50, 80], [72, 66], [80, 95], [42, 70], [50, 78]),
      b: P([24, 46], [32, 52], [56, 58], [76, 58], [80, 95], [44, 60], [56, 58]) },
    farmers: { gear: ["kh2"], a: { ...stand(-8), e: [52, 42], w: [52, 57] },
      b: { h: [56, 18], n: [56, 28], p: [56, 55], k: [64, 74], f: [70, 95], e: [56, 42], w: [56, 57] } }
  };

  function gear(type, q) {
    const [wx, wy] = q.w;
    switch (type) {
      case "kh": return `<rect x="${wx - 6}" y="${wy - 3}" width="12" height="6" rx="2" class="g"/>`;
      case "kh2": return `<rect x="${wx - 6}" y="${wy}" width="12" height="7" rx="2" class="g"/>`;
      case "bar": return `<circle cx="${wx}" cy="${wy}" r="6" class="gl"/><circle cx="${wx}" cy="${wy}" r="1.6" class="g"/>`;
      case "bench": return `<rect x="16" y="66" width="62" height="6" rx="2" class="gb"/><line x1="24" y1="72" x2="24" y2="95" class="gs"/><line x1="70" y1="72" x2="70" y2="95" class="gs"/>`;
      case "lowbench": return `<rect x="6" y="52" width="24" height="10" rx="2" class="gb"/><line x1="18" y1="62" x2="18" y2="95" class="gs"/>`;
      case "seat": return `<rect x="34" y="70" width="34" height="5" rx="2" class="gb"/><line x1="51" y1="75" x2="51" y2="95" class="gs"/>`;
      case "cable": return `<line x1="${wx}" y1="${wy}" x2="114" y2="50" class="gs"/><rect x="112" y="20" width="6" height="75" class="gb"/>`;
      case "latbar": return `<line x1="${wx - 16}" y1="${wy}" x2="${wx + 16}" y2="${wy}" class="gl"/><line x1="${wx}" y1="${wy}" x2="${wx}" y2="0" class="gs"/>`;
      case "sled": { const [fx, fy] = q.f; return `<line x1="${fx + 4}" y1="${fy - 14}" x2="${fx + 4}" y2="${fy + 14}" class="gl"/><path d="M14 40 L40 78 L60 78" class="gs" fill="none"/>`; }
    }
    return "";
  }

  function body(q) {
    const L = (a, b, c) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"${c ? ` class="${c}"` : ""}/>`;
    const sh = (pt) => [pt[0] - 3, pt[1] - 1];
    // hinteres Bein und hinterer Arm, etwas versetzt und heller
    const back = `<g class="bk">${L(q.p, sh(q.k))}${L(sh(q.k), sh(q.f))}${L(q.n, sh(q.e))}${L(sh(q.e), sh(q.w))}</g>`;
    const front = `<g class="b">${L(q.n, q.p, "torso")}${L(q.p, q.k)}${L(q.k, q.f)}${L(q.n, q.e)}${L(q.e, q.w)}</g>`;
    return `${back}${front}<circle cx="${q.h[0]}" cy="${q.h[1]}" r="7.5" class="hd"/>`;
  }

  function panel(def, q, label) {
    return `<figure class="pose"><svg viewBox="0 0 120 100" role="img" aria-label="${label}">
      <line x1="0" y1="95.5" x2="120" y2="95.5" class="fl"/>
      ${def.gear.map(g => gear(g, q)).join("")}${body(q)}</svg><figcaption>${label}</figcaption></figure>`;
  }

  // Kleines Vorschaubild, das zwischen Start und Ende wechselt
  window.figureAnim = function (id) {
    const def = POSES[id];
    if (!def) return "";
    const g = q => `${def.gear.map(x => gear(x, q)).join("")}${body(q)}`;
    return `<svg viewBox="0 0 120 100" class="anim" aria-hidden="true"><line x1="0" y1="95.5" x2="120" y2="95.5" class="fl"/>
      <g class="fa">${g(def.a)}</g><g class="fb">${g(def.b)}</g></svg>`;
  };

  window.figureFor = function (id) {
    const def = POSES[id];
    if (!def) return "";
    const same = JSON.stringify(def.a) === JSON.stringify(def.b);
    return `<div class="poses">${panel(def, def.a, same ? "Halten" : "Start")}${same ? "" : `<span class="arrow" aria-hidden="true">→</span>` + panel(def, def.b, "Ende")}</div>`;
  };
})();
