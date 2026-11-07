// Inhalte der Woche. Claude aktualisiert diese Datei jede Woche.
// Deine eigenen Eintraege (Haken, Gewichte, Fotos) liegen nur auf deinem Handy.
window.COACH = {
  version: "2026-KW46",
  appVersion: "2.0",

  woche: {
    titel: "KW 46 · 9.–15.11.",
    hinweis: "Mit deinem Kalender abgeglichen. Gym B von Fr auf Mi, weil Freitag voll ist. Bauernhof am Wochenende steht noch mit Fragezeichen: Falls ihr fahrt, fallen Lachs und Meal Prep weg.",
    tage: [
      { tag: "Mo", datum: "9.11.",  iso: "2026-11-09", items: [{ typ: "termin", text: "15:00 Laterne basteln" }, { typ: "sport", text: "Gym: Einheit A, ca. 60 Min. (abends)", einheit: "A" }, { typ: "kochen", text: "Hähnchen-Gemüse-Pfanne (Reis doppelt kochen)", rezept: "haehnchen-pfanne" }] },
      { tag: "Di", datum: "10.11.", iso: "2026-11-10", items: [{ typ: "termin", text: "Oma Eva Geburtstag" }, { typ: "termin", text: "Toni Kimberly (vormittags)" }, { typ: "termin", text: "Meeting (Uhrzeit im Kalender prüfen)" }, { typ: "kochen", text: "Reste von Montag" }] },
      { tag: "Mi", datum: "11.11.", iso: "2026-11-11", items: [{ typ: "termin", text: "St. Martin" }, { typ: "sport", text: "Gym: Einheit B, ca. 60 Min. (früh)", einheit: "B" }, { typ: "kochen", text: "Linsen-Bolognese", rezept: "linsen-bolognese" }] },
      { tag: "Do", datum: "12.11.", iso: "2026-11-12", items: [{ typ: "termin", text: "Toni Kita-Geburtstag" }, { typ: "termin", text: "15:00 Zahnarzt" }, { typ: "treffen", text: "Abend frei für ein Treffen mit den Jungs" }] },
      { tag: "Fr", datum: "13.11.", iso: "2026-11-13", items: [{ typ: "termin", text: "8:00 Illgen" }, { typ: "termin", text: "Laternenfest" }, { typ: "termin", text: "Bauernhof? (ab abends bis So)" }] },
      { tag: "Sa", datum: "14.11.", iso: "2026-11-14", items: [{ typ: "kochen", text: "Ofenlachs mit Kartoffeln (nur ohne Bauernhof)", rezept: "ofenlachs" }] },
      { tag: "So", datum: "15.11.", iso: "2026-11-15", items: [{ typ: "kochen", text: "Meal Prep: Chili für Mo + Di (nur ohne Bauernhof)", rezept: "chili" }] }
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
    kniebeuge: { bild: {"src": "fotos/kniebeuge.jpg", "by": "U.S. Marine Corps", "lic": "Public domain", "link": "https://commons.wikimedia.org/wiki/File:Marine_Corps_officer_candidate_participate_in_physical_training.jpg"}, name: "Goblet-Kniebeuge", saetze: 3, wdh: "8–10", pauseSek: 90, muskeln: "Oberschenkel, Po, Rumpf", einheit: "kg",
      start: "Schulterbreiter Stand, Fußspitzen ca. 15° nach außen. Kurzhantel senkrecht an einem Ende greifen und eng an der Brust halten, Ellbogen zeigen nach unten.",
      ablauf: ["Tief einatmen, Bauch fest wie vor einem Schlag.", "Hüfte gleichzeitig nach hinten und unten setzen, als würdest du dich auf einen niedrigen Hocker setzen.", "Knie schieben in Richtung der Zehen nach außen, Fersen bleiben am Boden.", "Runter, bis die Oberschenkel mindestens waagerecht sind und die Ellbogen innen an die Knie kommen.", "Über die ganze Fußsohle kraftvoll hochdrücken, oben Po anspannen."],
      atmung: "Oben einatmen, unten halten, beim Hochdrücken ausatmen.",
      startgewicht: "12–16 kg Kurzhantel",
      alternative: "Kniebeuge an der Multipresse oder Beinpresse.",
      fehler: "Knie fallen nach innen, Fersen heben ab oder der Rücken rundet unten. Dann Gewicht runter." },
    bankdruecken: { bild: {"src": "fotos/bankdruecken.jpg", "by": "SAgbley", "lic": "CC BY-SA 4.0", "link": "https://commons.wikimedia.org/wiki/File:Weight_Bench_set.jpg"}, name: "Bankdrücken (Langhantel)", saetze: 3, wdh: "8–10", pauseSek: 120, muskeln: "Brust, vordere Schulter, Trizeps", einheit: "kg",
      start: "Rücklings auf die Bank, Augen genau unter der Stange. Füße fest am Boden. Schulterblätter nach hinten-unten ziehen, kleines natürliches Hohlkreuz. Griff etwas breiter als schulterbreit.",
      ablauf: ["Stange mit gestreckten Armen über die Schultern ausheben.", "Kontrolliert in 2 Sekunden zur unteren Brust (Höhe Brustwarzen) senken.", "Ellbogen ca. 45° vom Körper, nicht seitlich abspreizen.", "Stange kurz an der Brust berühren, nicht abprallen lassen.", "Kraftvoll nach oben und leicht Richtung Gesicht drücken."],
      atmung: "Beim Absenken einatmen, beim Drücken ausatmen.",
      startgewicht: "Leere Stange (20 kg), dann in 5-kg-Schritten steigern",
      alternative: "Kurzhantel-Bankdrücken oder Brustpresse-Maschine.",
      fehler: "Po hebt von der Bank ab oder Schultern rollen nach vorn. Ohne Partner immer die Sicherungsablagen einstellen." },
    rudern: { bild: {"src": "fotos/rudern.jpg", "by": "Miguel Angel Omaña Rojas", "lic": "CC0", "link": "https://commons.wikimedia.org/wiki/File:Woman_using_a_seated_cable_row_machine_at_the_gym.jpg"}, name: "Rudern am Kabel (sitzend)", saetze: 3, wdh: "10–12", pauseSek: 90, muskeln: "Mittlerer Rücken, Lat, Bizeps", einheit: "kg",
      start: "Aufrecht sitzen, Füße an der Fußstütze, Knie leicht gebeugt. Enger Griff, Arme gestreckt, Schultern leicht nach vorn gezogen.",
      ablauf: ["Brust raus, Oberkörper senkrecht.", "Zuerst die Schulterblätter nach hinten ziehen, dann die Arme.", "Griff zum Bauchnabel ziehen, Ellbogen eng am Körper.", "Hinten 1 Sekunde halten und Schulterblätter zusammendrücken.", "In 2 Sekunden langsam zurück, bis die Arme gestreckt sind."],
      atmung: "Beim Ziehen ausatmen, beim Zurücklassen einatmen.",
      startgewicht: "30–40 kg am Kabelzug",
      alternative: "Rudermaschine mit Brustpolster oder einarmiges Kurzhantelrudern.",
      fehler: "Mit dem Oberkörper nach hinten schwingen. Der Rücken arbeitet, nicht der Schwung." },
    rdl: { bild: {"src": "fotos/kreuzheben.jpg", "by": "stu_spivack", "lic": "CC BY-SA 2.0", "link": "https://commons.wikimedia.org/wiki/File:Deadlift_Barbell.JPG"}, name: "Rumänisches Kreuzheben", saetze: 3, wdh: "10", pauseSek: 120, muskeln: "Beinrückseite, Po, unterer Rücken", einheit: "kg",
      start: "Hüftbreiter Stand, Langhantel oder zwei Kurzhanteln vor den Oberschenkeln. Knie leicht gebeugt, Schultern zurück, Blick 2 m vor dir auf den Boden.",
      ablauf: ["Knie bleiben die ganze Zeit im gleichen leichten Winkel.", "Hüfte nach hinten schieben, als wolltest du mit dem Po eine Tür schließen.", "Gewicht gleitet nah am Bein nach unten.", "Stopp, sobald du hinten im Oberschenkel eine starke Dehnung spürst (meist knapp unter dem Knie).", "Hüfte nach vorn schieben und aufrichten, oben Po anspannen."],
      atmung: "Oben einatmen, beim Aufrichten ausatmen.",
      startgewicht: "30–40 kg Langhantel oder 2 × 12 kg",
      alternative: "Hyperextension auf der Rückenstrecker-Bank.",
      fehler: "Runder Rücken oder Stange weit weg vom Bein. Lieber weniger tief, dafür gerade." },
    plank: { bild: {"src": "fotos/plank.jpg", "by": "Jaykayfit", "lic": "CC BY-SA 3.0", "link": "https://commons.wikimedia.org/wiki/File:Plank.jpg"}, name: "Unterarmstütz (Plank)", saetze: 3, wdh: "30–45 Sek.", pauseSek: 60, muskeln: "Gerade und schräge Bauchmuskeln, Rumpf", einheit: "Sek.",
      start: "Unterarme auf dem Boden, Ellbogen genau unter den Schultern. Beine gestreckt, Zehenspitzen aufgestellt.",
      ablauf: ["Körper bildet eine gerade Linie von Kopf bis Ferse.", "Bauchnabel Richtung Wirbelsäule ziehen.", "Po fest anspannen, damit die Hüfte nicht durchhängt.", "Blick zum Boden, Nacken lang.", "Halten, bis die Spannung nicht mehr sauber geht."],
      atmung: "Ruhig und gleichmäßig weiteratmen, nicht die Luft anhalten.",
      startgewicht: "Körpergewicht, Start mit 30 Sek.",
      alternative: "Plank auf den Knien, wenn 30 Sek. noch nicht gehen.",
      fehler: "Hüfte hängt durch (Hohlkreuz) oder Po geht nach oben." },
    beinpresse: { bild: {"src": "fotos/beinpresse.jpg", "by": "SlimVirgin", "lic": "CC BY-SA 3.0", "link": "https://commons.wikimedia.org/wiki/File:Leg_press_(cropped,_flipped).jpg"}, name: "Beinpresse", saetze: 3, wdh: "10–12", pauseSek: 90, muskeln: "Oberschenkel vorne, Po", einheit: "kg",
      start: "Rücken und Po fest ins Polster. Füße hüftbreit mittig auf der Platte, Fußspitzen leicht nach außen. Griffe seitlich festhalten.",
      ablauf: ["Sicherung lösen, Beine fast gestreckt.", "Platte langsam in 2–3 Sekunden absenken.", "Runter, bis die Knie ca. 90° gebeugt sind.", "Über die Fersen kraftvoll wegdrücken.", "Oben die Knie nicht ganz durchstrecken."],
      atmung: "Beim Absenken einatmen, beim Drücken ausatmen.",
      startgewicht: "60–80 kg (Gerät ohne Schlitten gerechnet)",
      alternative: "Goblet-Kniebeuge oder Ausfallschritte mit Kurzhanteln.",
      fehler: "Po hebt unten vom Sitz ab oder Knie fallen nach innen." },
    latzug: { bild: {"src": "fotos/latzug.jpg", "by": "Tyler Read", "lic": "CC BY 2.0", "link": "https://commons.wikimedia.org/wiki/File:Girl_doing_lat_pulldown_exercise.jpg"}, name: "Latzug (breit, zur Brust)", saetze: 3, wdh: "8–10", pauseSek: 90, muskeln: "Breiter Rücken (Lat), Bizeps", einheit: "kg",
      start: "Knie unter dem Polster fixieren. Stange etwas breiter als schulterbreit greifen, Arme gestreckt.",
      ablauf: ["Oberkörper ca. 10–15° nach hinten lehnen, Brust raus.", "Schultern zuerst nach unten ziehen.", "Stange zur oberen Brust ziehen, Ellbogen zeigen nach unten.", "Unten kurz halten und Lat anspannen.", "Kontrolliert nach oben, bis die Arme fast gestreckt sind."],
      atmung: "Beim Ziehen ausatmen, beim Hochlassen einatmen.",
      startgewicht: "35–45 kg",
      alternative: "Klimmzüge mit Unterstützung (Gerät oder Band).",
      fehler: "Stange in den Nacken ziehen oder mit dem Oberkörper reißen." },
    schulterdruecken: { bild: {"src": "fotos/schulterdruecken.jpg", "by": "Tyler Read", "lic": "CC BY 2.0", "link": "https://commons.wikimedia.org/wiki/File:Girl_doing_dumbbell_shoulder_press_02.jpg"}, name: "Schulterdrücken Kurzhantel (sitzend)", saetze: 3, wdh: "8–10", pauseSek: 90, muskeln: "Schultern, Trizeps", einheit: "kg je Hand",
      start: "Bank senkrecht stellen, Rücken an der Lehne. Kurzhanteln auf Schulterhöhe, Handflächen nach vorn, Unterarme senkrecht.",
      ablauf: ["Bauch fest, unterer Rücken bleibt an der Lehne.", "Hanteln senkrecht nach oben drücken.", "Oben über dem Kopf fast zusammenführen, Arme nicht ganz durchstrecken.", "In 2 Sekunden kontrolliert zurück auf Schulterhöhe."],
      atmung: "Beim Drücken ausatmen, beim Absenken einatmen.",
      startgewicht: "8–12 kg je Hand",
      alternative: "Schulterpresse-Maschine.",
      fehler: "Hohlkreuz oder Hanteln fallen nach außen." },
    hipthrust: { name: "Hip Thrust (Langhantel)", saetze: 3, wdh: "10", pauseSek: 90, muskeln: "Po, Beinrückseite", einheit: "kg",
      start: "Schulterblätter an die Kante einer Bank legen. Stange mit Polster auf die Hüftbeuge. Füße hüftbreit, so weit vorn, dass oben die Schienbeine senkrecht stehen.",
      ablauf: ["Kinn leicht zur Brust, Blick nach vorn.", "Über die Fersen drücken und die Hüfte nach oben strecken.", "Oben bilden Knie, Hüfte und Schultern eine Linie.", "1 Sekunde halten, Po maximal anspannen.", "Kontrolliert absenken, ohne die Hüfte am Boden abzulegen."],
      atmung: "Beim Hochdrücken ausatmen, beim Absenken einatmen.",
      startgewicht: "Leere Stange (20 kg) mit Polster",
      alternative: "Hip-Thrust-Maschine oder Glute Bridge am Boden.",
      fehler: "Oben ins Hohlkreuz gehen statt die Hüfte zu strecken." },
    farmers: { bild: {"src": "fotos/farmerswalk.jpg", "by": "Michelle Tribe", "lic": "CC BY 2.0", "link": "https://commons.wikimedia.org/wiki/File:Farmers_walk.jpg"}, name: "Farmer's Walk", saetze: 3, wdh: "30 m", pauseSek: 90, muskeln: "Griffkraft, Rumpf, Nacken", einheit: "kg je Hand",
      start: "Zwei schwere Kurzhanteln mit geradem Rücken vom Boden heben (wie beim Kreuzheben). Aufrecht stehen, Arme lang.",
      ablauf: ["Schultern nach hinten-unten, Brust raus.", "Bauch fest anspannen.", "Kurze, zügige Schritte geradeaus.", "Nicht zur Seite kippen, Hanteln schwingen nicht.", "Nach 30 m kontrolliert abstellen."],
      atmung: "Kurz und gleichmäßig atmen.",
      startgewicht: "2 × 20 kg",
      alternative: "Mit Kettlebells oder Trap-Bar.",
      fehler: "Schultern zu den Ohren hochziehen oder seitlich wanken." }
  },

  fruehstueck: {
    text: "Ehrlich: Bis mittags nichts und unterwegs dann viel ist genau das Muster, das den Bauch hält. Ziel diese Woche: an 4 Tagen frühstücken.",
    optionen: ["Skyr (250 g) mit Banane, 2 Min.", "2 gekochte Eier + 1 Scheibe Vollkornbrot, Eier am Vorabend kochen"]
  },

  rezepte: [
    { id: "haehnchen-pfanne", bild: {"src": "fotos/pfanne.jpg", "by": "PattayaPatrol", "lic": "CC BY-SA 4.0", "link": "https://commons.wikimedia.org/wiki/File:DFC_2428_Sizzling_stir-fried_chicken_with_red_peppers_and_onions_served_alongside_a_mound_of_steamed_white_rice.jpg"}, art: "zuhause", name: "Hähnchen-Gemüse-Pfanne mit Reis", zeit: "25 Min.", portionen: "2 Erw. + Kind",
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
    { id: "linsen-bolognese", bild: {"src": "fotos/bolognese.jpg", "by": "Wikimedia Commons", "lic": "Public domain", "link": "https://commons.wikimedia.org/wiki/File:Spaghetti_Bolognese.jpg"}, art: "zuhause", name: "Linsen-Bolognese mit Vollkornnudeln", zeit: "30 Min.", portionen: "2 Erw. + Kind",
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
    { id: "ofenlachs", bild: {"src": "fotos/lachs.jpg", "by": "HaJunkiyada", "lic": "CC BY-SA 4.0", "link": "https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Oven-baked_teriyaki_salmon_with_vegetables.jpg"}, art: "zuhause", name: "Ofenlachs mit Kartoffeln und Brokkoli", zeit: "35 Min.", portionen: "2 Erw. + Kind",
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
    { id: "chili", bild: {"src": "fotos/chili.jpg", "by": "JIP", "lic": "CC BY-SA 4.0", "link": "https://commons.wikimedia.org/wiki/File:Chili_con_carne_as_a_convenience_meal_at_the_office.jpg"}, art: "mitnehmen", name: "Chili con Carne mit Reis", tag: "Tag 1 + 2", zeit: "So, 30 Min.", portionen: "2 Dosen",
      naehr: "ca. 620 kcal · 42 g Eiweiß pro Dose", farbe: "#8E2F1C",
      kurz: "Sonntag kochen, hält 3 Tage im Kühlschrank. Mittags kalt oder kurz in die Mikrowelle.",
      zutaten: ["400 g mageres Rinderhack", "1 Dose Kidneybohnen", "1 Dose Mais", "1 Dose gehackte Tomaten", "1 Paprika", "1 Zwiebel", "Reis vom Montag oder 150 g frisch", "1 TL Kreuzkümmel, Chili nach Geschmack"],
      schritte: [
        { t: "Anbraten", d: "Hack krümelig braten, Zwiebel und Paprika gewürfelt dazu, 4 Min.", min: 8 },
        { t: "Köcheln", d: "Tomaten, abgespülte Bohnen und Mais dazu, würzen, 15 Min. köcheln.", min: 15 },
        { t: "Abfüllen", d: "Mit Reis in 2 Dosen füllen, abkühlen lassen, Deckel drauf, Kühlschrank.", min: 5 }
      ] },
    { id: "wraps", bild: {"src": "fotos/wrap.jpg", "by": "Takeaway", "lic": "CC BY-SA 3.0", "link": "https://commons.wikimedia.org/wiki/File:Smoked_chicken_and_avocado_wrap.jpg"}, art: "mitnehmen", name: "Hähnchen-Wraps", tag: "Tag 3", zeit: "10 Min.", portionen: "2 Wraps",
      naehr: "ca. 520 kcal · 45 g Eiweiß", farbe: "#C8932B",
      kurz: "Am Vorabend rollen, in Alufolie.",
      zutaten: ["2 Vollkorn-Wraps", "200 g Hähnchenbrust (gebraten)", "100 g Hüttenkäse", "1 Handvoll Rucola", "1 Tomate"],
      schritte: [
        { t: "Bestreichen", d: "Hüttenkäse auf die Wraps streichen.", min: 2 },
        { t: "Belegen", d: "Hähnchen in Streifen, Rucola und Tomatenscheiben drauf.", min: 4 },
        { t: "Rollen", d: "Seiten einklappen, fest rollen, in Alufolie wickeln.", min: 2 }
      ] },
    { id: "snacks", bild: {"src": "fotos/snack.jpg", "by": "1997SPP", "lic": "CC BY-SA 4.0", "link": "https://commons.wikimedia.org/wiki/File:Double_choc_yogurt.jpg"}, art: "mitnehmen", name: "Snacks für unterwegs", tag: "jeden Tag", zeit: "1 Min.", portionen: "1 Tag",
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
