// Inhalte der Woche. Claude aktualisiert diese Datei jede Woche.
// Deine eigenen Eintraege (Haken, Gewichte, Fotos) liegen nur auf deinem Handy.
window.COACH = {
  version: "2026-KW46",

  woche: {
    titel: "KW 46 · 9.–15.11.",
    hinweis: "Vorschlag ohne deine Termine. Schick Claude deine Woche, dann wird er angepasst.",
    tage: [
      { tag: "Mo", datum: "9.11.",  iso: "2026-11-09", items: [{ typ: "kochen", text: "Hähnchen-Gemüse-Pfanne (Reis doppelt kochen)" }] },
      { tag: "Di", datum: "10.11.", iso: "2026-11-10", items: [{ typ: "sport", text: "Gym: Einheit A, ca. 60 Min." }] },
      { tag: "Mi", datum: "11.11.", iso: "2026-11-11", items: [{ typ: "kochen", text: "Linsen-Bolognese" }] },
      { tag: "Do", datum: "12.11.", iso: "2026-11-12", items: [{ typ: "treffen", text: "Abend frei für Jens, Tolle oder Phil" }] },
      { tag: "Fr", datum: "13.11.", iso: "2026-11-13", items: [{ typ: "sport", text: "Gym: Einheit B, ca. 60 Min." }] },
      { tag: "Sa", datum: "14.11.", iso: "2026-11-14", items: [{ typ: "kochen", text: "Ofenlachs mit Kartoffeln" }] },
      { tag: "So", datum: "15.11.", iso: "2026-11-15", items: [{ typ: "kochen", text: "Meal Prep: Chili für Mo + Di" }] }
    ]
  },

  training: {
    regel: "Schaffst du in allen Sätzen die obere Wiederholungszahl sauber, gibt's beim nächsten Mal +2,5 kg. Erste Woche leicht starten, Technik vor Gewicht.",
    aufwaermen: "5 Min. Rad oder Rudergerät, dann von der ersten Übung 2 leichte Sätze.",
    einheiten: [
      { id: "A", name: "Ganzkörper A", uebungen: ["kniebeuge", "bankdruecken", "rudern", "rdl", "plank"] },
      { id: "B", name: "Ganzkörper B", uebungen: ["beinpresse", "latzug", "schulterdruecken", "hipthrust", "farmers"] }
    ]
  },

  uebungen: {
    kniebeuge: { name: "Goblet-Kniebeuge", satz: "3 × 8–10", pause: "90 Sek.", muskeln: "Beine, Po, Rumpf", einheit: "kg",
      technik: ["Kurzhantel senkrecht vor der Brust halten", "Füße schulterbreit, Fußspitzen leicht nach außen", "Hüfte nach hinten-unten, Knie folgen den Zehen", "Brust oben, Rücken gerade, über die Ferse hochdrücken"],
      fehler: "Knie fallen nach innen oder Fersen heben ab." },
    bankdruecken: { name: "Bankdrücken", satz: "3 × 8–10", pause: "2 Min.", muskeln: "Brust, Schulter, Trizeps", einheit: "kg",
      technik: ["Augen unter der Stange, Schulterblätter zusammen", "Griff etwas breiter als schulterbreit", "Stange kontrolliert zur unteren Brust", "Ellbogen ca. 45° vom Körper, nach oben drücken"],
      fehler: "Stange prallt von der Brust ab. Ohne Partner: Sicherungsablagen nutzen." },
    rudern: { name: "Rudern am Kabel", satz: "3 × 10–12", pause: "90 Sek.", muskeln: "Rücken, Bizeps", einheit: "kg",
      technik: ["Aufrecht sitzen, Knie leicht gebeugt", "Griff zum Bauchnabel ziehen", "Schulterblätter am Ende zusammendrücken", "Langsam zurück, Oberkörper bleibt ruhig"],
      fehler: "Mit dem Oberkörper Schwung holen." },
    rdl: { name: "Rumänisches Kreuzheben", satz: "3 × 10", pause: "2 Min.", muskeln: "Beinrückseite, Po, unterer Rücken", einheit: "kg",
      technik: ["Stange oder Kurzhanteln vor den Oberschenkeln", "Knie leicht gebeugt und fix", "Hüfte nach hinten schieben, Stange nah am Bein", "Bis Dehnung hinten im Bein, dann Hüfte nach vorn"],
      fehler: "Runder Rücken. Lieber weniger tief und gerade." },
    plank: { name: "Unterarmstütz (Plank)", satz: "3 × 30–45 Sek.", pause: "60 Sek.", muskeln: "Bauch, Rumpf", einheit: "Sek.",
      technik: ["Ellbogen unter den Schultern", "Körper eine Linie von Kopf bis Ferse", "Bauch und Po anspannen", "Ruhig weiteratmen"],
      fehler: "Hüfte hängt durch oder geht zu hoch." },
    beinpresse: { name: "Beinpresse", satz: "3 × 10–12", pause: "90 Sek.", muskeln: "Oberschenkel, Po", einheit: "kg",
      technik: ["Rücken und Po fest im Polster", "Füße hüftbreit mittig auf der Platte", "Runter bis ca. 90° im Knie", "Hochdrücken, Knie oben nicht ganz durchstrecken"],
      fehler: "Po hebt unten vom Sitz ab." },
    latzug: { name: "Latzug", satz: "3 × 8–10", pause: "90 Sek.", muskeln: "Breiter Rücken, Bizeps", einheit: "kg",
      technik: ["Griff etwas breiter als schulterbreit", "Leicht zurücklehnen, Brust raus", "Stange zur oberen Brust ziehen", "Kontrolliert hoch, Arme fast gestreckt"],
      fehler: "Stange in den Nacken ziehen oder mit Schwung reißen." },
    schulterdruecken: { name: "Schulterdrücken Kurzhantel", satz: "3 × 8–10", pause: "90 Sek.", muskeln: "Schultern, Trizeps", einheit: "kg je Hand",
      technik: ["Sitzend mit Lehne oder stehend", "Hanteln auf Schulterhöhe, Handflächen nach vorn", "Senkrecht über den Kopf drücken", "Kontrolliert zurück auf Schulterhöhe"],
      fehler: "Hohlkreuz. Bauch fest anspannen." },
    hipthrust: { name: "Hip Thrust", satz: "3 × 10", pause: "90 Sek.", muskeln: "Po, Beinrückseite", einheit: "kg",
      technik: ["Schulterblätter an der Bankkante", "Stange mit Polster auf der Hüfte", "Füße so, dass oben Schienbein senkrecht", "Hüfte hoch, oben Po 1 Sek. anspannen"],
      fehler: "Ins Hohlkreuz gehen statt Hüfte strecken." },
    farmers: { name: "Farmer's Walk", satz: "3 × 30 m", pause: "90 Sek.", muskeln: "Griff, Rumpf, Schultern", einheit: "kg je Hand",
      technik: ["Schwere Kurzhanteln seitlich halten", "Aufrecht, Schultern runter und hinten", "Kurze, zügige Schritte", "Nicht schwanken, Bauch fest"],
      fehler: "Schultern hochziehen oder zur Seite kippen." }
  },

  fruehstueck: {
    text: "Ehrlich: Bis mittags nichts und unterwegs dann viel ist genau das Muster, das den Bauch hält. Ziel diese Woche: an 4 Tagen frühstücken.",
    optionen: ["Skyr (250 g) mit Banane, 2 Min.", "2 gekochte Eier + 1 Scheibe Vollkornbrot, Eier am Vorabend kochen"]
  },

  rezepte: [
    { id: "haehnchen-pfanne", art: "zuhause", name: "Hähnchen-Gemüse-Pfanne mit Reis", zeit: "25 Min.", portionen: "2 Erw. + Samu",
      naehr: "ca. 550 kcal · 45 g Eiweiß pro Erwachsenen-Portion", farbe: "#D9481F",
      kurz: "Viel Eiweiß, bunt, schnell. Reis doppelt kochen, die Hälfte ist fürs Meal Prep.",
      zutaten: ["600 g Hähnchenbrust", "2 Paprika", "1 Zucchini", "2 Möhren", "1 Zwiebel", "2 Knoblauchzehen", "500 g Basmati-Reis (Hälfte für Meal Prep)", "150 g Naturjoghurt", "1 TL Paprikapulver, 1 EL Olivenöl"],
      schritte: [
        { t: "Reis kochen", d: "Reis waschen, mit doppelter Menge Wasser aufkochen, 12 Min. auf kleiner Stufe ziehen lassen. Hälfte abkühlen lassen und in den Kühlschrank.", min: 15 },
        { t: "Schnippeln", d: "Hähnchen in Würfel, Paprika und Zucchini in Streifen, Möhren in dünne Scheiben, Zwiebel und Knoblauch fein.", min: 8 },
        { t: "Hähnchen braten", d: "Öl in der Pfanne stark erhitzen, Hähnchen 5 Min. rundum braten, rausnehmen.", min: 5 },
        { t: "Gemüse braten", d: "Zwiebel, Knoblauch, Möhren 3 Min., dann Paprika und Zucchini 4 Min. mitbraten.", min: 7 },
        { t: "Fertig", d: "Hähnchen zurück, Paprikapulver drüber. Mit Reis und einem Klecks Joghurt servieren.", min: 2 }
      ],
      samu: "Seine Portion vor dem Salzen abnehmen, Gemüse klein schneiden.",
      reste: "Rest kalt mit Reis in eine Dose: Mittagessen für den nächsten Tag." },
    { id: "linsen-bolognese", art: "zuhause", name: "Linsen-Bolognese mit Vollkornnudeln", zeit: "30 Min.", portionen: "2 Erw. + Samu",
      naehr: "ca. 600 kcal · 30 g Eiweiß pro Erwachsenen-Portion", farbe: "#B5432E",
      kurz: "Macht lange satt, günstig, kinderleicht.",
      zutaten: ["250 g rote Linsen", "2 × 500 g passierte Tomaten", "1 Möhre", "1 Zwiebel", "1 Knoblauchzehe", "500 g Vollkornnudeln", "30 g Parmesan", "1 TL Oregano, 1 EL Olivenöl"],
      schritte: [
        { t: "Andünsten", d: "Zwiebel, Möhre, Knoblauch fein würfeln, in Öl 4 Min. glasig dünsten.", min: 4 },
        { t: "Köcheln", d: "Linsen, Tomaten und 300 ml Wasser dazu, 15 Min. köcheln, ab und zu umrühren.", min: 15 },
        { t: "Nudeln", d: "Währenddessen Nudeln nach Packung kochen.", min: 10 },
        { t: "Fertig", d: "Mit Oregano, wenig Salz und Pfeffer würzen. Parmesan drüber.", min: 1 }
      ],
      samu: "Passt perfekt, Linsen zerfallen weich. Wenig salzen.",
      reste: "Soße hält 3 Tage im Kühlschrank oder lässt sich einfrieren." },
    { id: "ofenlachs", art: "zuhause", name: "Ofenlachs mit Kartoffeln und Brokkoli", zeit: "35 Min.", portionen: "2 Erw. + Samu",
      naehr: "ca. 580 kcal · 38 g Eiweiß pro Erwachsenen-Portion", farbe: "#E07A3F",
      kurz: "Ein Blech, kaum Abwasch, gute Fette.",
      zutaten: ["4 Lachsfilets (ca. 500 g)", "1 kg festkochende Kartoffeln", "1 Brokkoli", "1 Zitrone", "2 EL Olivenöl, Pfeffer"],
      schritte: [
        { t: "Vorheizen", d: "Ofen auf 200 °C Umluft.", min: 1 },
        { t: "Kartoffeln", d: "Kartoffeln vierteln, mit 1 EL Öl aufs Blech, 15 Min. backen.", min: 15 },
        { t: "Lachs + Brokkoli", d: "Brokkoli-Röschen und Lachs aufs Blech, Zitronenscheiben auf den Lachs, Rest Öl drüber.", min: 3 },
        { t: "Fertig backen", d: "Weitere 12–15 Min. backen, bis der Lachs innen gerade nicht mehr glasig ist.", min: 14 }
      ],
      samu: "Lachs auf Gräten prüfen und zerpflücken.",
      reste: "Übriger Lachs kalt auf Salat oder im Wrap." },
    { id: "chili", art: "mitnehmen", name: "Chili con Carne mit Reis", tag: "Tag 1 + 2", zeit: "So, 30 Min.", portionen: "2 Dosen",
      naehr: "ca. 620 kcal · 42 g Eiweiß pro Dose", farbe: "#8E2F1C",
      kurz: "Sonntag kochen, hält 3 Tage im Kühlschrank. Mittags kalt oder kurz in die Mikrowelle.",
      zutaten: ["400 g mageres Rinderhack", "1 Dose Kidneybohnen", "1 Dose Mais", "1 Dose gehackte Tomaten", "1 Paprika", "1 Zwiebel", "Reis vom Montag oder 150 g frisch", "1 TL Kreuzkümmel, Chili nach Geschmack"],
      schritte: [
        { t: "Anbraten", d: "Hack krümelig braten, Zwiebel und Paprika gewürfelt dazu, 4 Min.", min: 8 },
        { t: "Köcheln", d: "Tomaten, abgespülte Bohnen und Mais dazu, würzen, 15 Min. köcheln.", min: 15 },
        { t: "Abfüllen", d: "Mit Reis in 2 Dosen füllen, abkühlen lassen, Deckel drauf, Kühlschrank.", min: 5 }
      ] },
    { id: "wraps", art: "mitnehmen", name: "Hähnchen-Wraps", tag: "Tag 3", zeit: "10 Min.", portionen: "2 Wraps",
      naehr: "ca. 520 kcal · 45 g Eiweiß", farbe: "#C8932B",
      kurz: "Am Vorabend rollen, in Alufolie.",
      zutaten: ["2 Vollkorn-Wraps", "200 g Hähnchenbrust (gebraten)", "100 g Hüttenkäse", "1 Handvoll Rucola", "1 Tomate"],
      schritte: [
        { t: "Bestreichen", d: "Hüttenkäse auf die Wraps streichen.", min: 2 },
        { t: "Belegen", d: "Hähnchen in Streifen, Rucola und Tomatenscheiben drauf.", min: 4 },
        { t: "Rollen", d: "Seiten einklappen, fest rollen, in Alufolie wickeln.", min: 2 }
      ] },
    { id: "snacks", art: "mitnehmen", name: "Snacks für unterwegs", tag: "jeden Tag", zeit: "1 Min.", portionen: "1 Tag",
      naehr: "ca. 400 kcal · 25 g Eiweiß", farbe: "#6E8B3D",
      kurz: "Statt Bäcker oder Tankstelle. Morgens ins Auto legen.",
      zutaten: ["1 Skyr", "1 Banane", "1 kleine Handvoll Nüsse"],
      schritte: [{ t: "Einpacken", d: "Alles in eine Tasche, ab ins Auto.", min: 1 }] }
  ],

  einkauf: {
    familie: [
      ["Obst & Gemüse", ["Paprika (2)", "Zucchini (1)", "Möhren (3)", "Zwiebeln (3)", "Knoblauch (1 Knolle)", "Kartoffeln festkochend (1 kg)", "Brokkoli (1)", "Zitrone (1)", "Bananen (6)"]],
      ["Fleisch & Fisch", ["Hähnchenbrust (600 g)", "Lachsfilets (4, ca. 500 g)"]],
      ["Kühlregal", ["Naturjoghurt (500 g)", "Parmesan (1 Stück)", "Skyr (4 × 250 g)", "Eier (10)"]],
      ["Vorrat", ["Basmati-Reis (1 kg)", "Rote Linsen (250 g)", "Passierte Tomaten (2 × 500 g)", "Vollkornnudeln (500 g)", "Vollkornbrot"]]
    ],
    mitnehmen: [
      ["Fleisch", ["Rinderhack mager (400 g)", "Hähnchenbrust (200 g)"]],
      ["Obst & Gemüse", ["Paprika (1)", "Zwiebel (1)", "Rucola (1 Beutel)", "Tomate (1)", "Bananen (3)"]],
      ["Kühlregal", ["Hüttenkäse (200 g)", "Skyr (3 kleine Becher)"]],
      ["Vorrat", ["Kidneybohnen (1 Dose)", "Mais (1 Dose)", "Gehackte Tomaten (1 Dose)", "Vollkorn-Wraps (1 Packung)", "Nüsse ungesalzen (1 Beutel)"]]
    ]
  }
};
