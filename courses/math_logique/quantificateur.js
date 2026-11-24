/* ============================================================
   EasyMath — Leçon : Les quantificateurs
   Cours : Logique mathématique
   Script autonome : à coller dans le champ « script » du modal.
   Variables facultatives injectées par l'app : courseName, lessonName
   Contrat de messages envoyés au parent (postMessage) :
     { source:'easymath-lesson', type:'understood',     lesson, course, minutes }
     { source:'easymath-lesson', type:'not_understood', lesson, course }
     { source:'easymath-lesson', type:'exercise_result', lesson, course,
       exerciseType, correct, seconds, data }
   Message reçu du parent (optionnel) :
     { type:'init', understood:true|false }
   ============================================================ */
(function () {
  // EasyMath exécute les leçons dans un Web Worker, sans accès au DOM.
  // Ce chemin utilise son API ; le code autonome ci-dessous reste disponible
  // lorsque le fichier est ouvert directement dans une page HTML.
  if (typeof EM !== 'undefined' && EM && typeof EM.lesson === 'function') {
    const slides = [
      `# Les quantificateurs\n\nUn **prédicat** dépend d'une variable et n'est pas encore une proposition complète. Par exemple, « x est pair » change de valeur selon x. Un quantificateur précise comment interpréter cette phrase.`,
      `# Le quantificateur universel : ∀\n\n**∀x ∈ E, P(x)** se lit « pour tout x de E, P(x) ». La phrase est vraie si chaque élément de E vérifie P.\n\nExemple : ∀x ∈ ℝ, x² ≥ 0 est vraie. Pour montrer qu'une phrase universelle est fausse, un seul **contre-exemple** suffit.`,
      `# Le quantificateur existentiel : ∃\n\n**∃x ∈ E, P(x)** se lit « il existe au moins un x de E tel que P(x) ». Il suffit de donner un **témoin** qui vérifie P.\n\nExemple : ∃x ∈ ℕ, x² = 49 est vraie, car x = 7 convient.`,
      `# Nier un quantificateur\n\nLa négation de **∀x, P(x)** est **∃x, ¬P(x)** : il existe un contre-exemple.\n\nLa négation de **∃x, P(x)** est **∀x, ¬P(x)** : aucun élément ne vérifie P.\n\nAttention : la négation porte aussi sur la propriété.`,
      `# L'ordre compte\n\n**∀x ∃y, R(x,y)** signifie que chaque x peut avoir un y qui lui convient.\n\n**∃y ∀x, R(x,y)** demande un seul y qui convient pour tous les x.\n\nExemple sur ℝ : ∀x ∃y, y > x est vraie (prendre y = x + 1), tandis que ∃y ∀x, y > x est fausse.`,
      `# À retenir\n\n- **∀** : tous les éléments ; un contre-exemple réfute la phrase.\n- **∃** : au moins un élément ; un témoin prouve la phrase.\n- ¬(∀x P(x)) ⇔ ∃x ¬P(x).\n- ¬(∃x P(x)) ⇔ ∀x ¬P(x).\n- Changer l'ordre des quantificateurs peut changer le sens.`
    ];
    const questions = [
      () => { const n = Math.floor(Math.random() * 10) + 1; return { question: `La proposition « ∀x ∈ ℕ, x + ${n} > x » est-elle vraie ?`, choices: ['Vraie', 'Fausse'], correctIndex: 0, steps: ['Pour tout entier naturel x, ajouter un entier positif augmente x.'] }; },
      () => { const k = Math.floor(Math.random() * 8) + 2; return { question: `Quel nombre réfute « ∀x ∈ ℕ, x > ${k} » ?`, choices: ['x = 0', `x = ${k + 1}`, `x = ${k + 3}`, 'Aucun'], correctIndex: 0, steps: [`0 est naturel et 0 > ${k} est faux : c'est un contre-exemple.`] }; },
      () => ({ question: 'Quelle est la négation de « ∀x, P(x) » ?', choices: ['∃x, ¬P(x)', '∀x, ¬P(x)', '∃x, P(x)'], correctIndex: 0, steps: ['La phrase universelle est fausse dès qu’il existe au moins un contre-exemple.'] }),
      () => ({ question: 'Quelle est la négation de « ∃x, P(x) » ?', choices: ['∀x, ¬P(x)', '∃x, ¬P(x)', '∀x, P(x)'], correctIndex: 0, steps: ['Dire qu’il n’existe aucun témoin revient à dire que tous les éléments vérifient ¬P.'] }),
      () => ({ question: 'Que signifie « ∀x ∃y, R(x,y) » ?', choices: ['Pour chaque x, on peut trouver un y qui convient', 'Il existe un y qui convient pour tous les x', 'Pour tous x et y, R(x,y)'], correctIndex: 0, steps: ['Le quantificateur ∃y est à l’intérieur de ∀x : y peut dépendre de x.'] }),
      () => ({ question: 'Sur ℝ, « ∃y ∀x, y > x » est :', choices: ['Fausse', 'Vraie'], correctIndex: 0, steps: ['Quel que soit y, x = y + 1 est plus grand. Aucun réel ne dépasse tous les réels.'] })
    ];
    EM.lesson({
      slides,
      rounds: 8,
      exercises: [{
        type: 'Quantificateurs',
        generate() {
          const q = questions[Math.floor(Math.random() * questions.length)]();
          return { ...q, timeout: 45 };
        }
      }]
    });
    return;
  }
  const COURSE = typeof courseName !== 'undefined' ? courseName : 'Logique mathématique';
  const LESSON = typeof lessonName !== 'undefined' ? lessonName : 'Les quantificateurs';
  const t0 = Date.now();

  const emit = (type, payload = {}) => {
    const msg = Object.assign({ source: 'easymath-lesson', type, lesson: LESSON, course: COURSE }, payload);
    try { window.parent !== window ? window.parent.postMessage(msg, '*') : console.log(msg); } catch (e) { console.log(msg); }
  };

  /* ---------- Utilitaires ---------- */
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const pick = arr => arr[rnd(0, arr.length - 1)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const isPrime = n => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };

  /* ---------- Styles ---------- */
  const css = `
  :root{--bg:#ffffff;--fg:#0f172a;--mut:#64748b;--line:#e2e8f0;--card:#f8fafc;--acc:#4f46e5;--acc2:#eef2ff;--ok:#16a34a;--ko:#dc2626}
  @media (prefers-color-scheme:dark){:root{--bg:#0b1020;--fg:#e5e7eb;--mut:#94a3b8;--line:#1e293b;--card:#111827;--acc:#818cf8;--acc2:#1e1b4b;--ok:#4ade80;--ko:#f87171}}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.65 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
  #em{max-width:820px;margin:0 auto;padding:28px 22px 60px;min-height:100vh;display:flex;flex-direction:column}
  .bar{height:5px;background:var(--line);border-radius:9px;overflow:hidden;margin-bottom:26px}
  .bar>i{display:block;height:100%;background:var(--acc);width:0;transition:width .4s}
  .tag{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--acc);font-weight:700}
  h1{font-size:44px;line-height:1.15;margin:.3em 0;font-weight:800}
  h2{font-size:32px;line-height:1.2;margin:.2em 0 .5em;font-weight:800}
  .slide{flex:1;animation:in .35s ease}
  @keyframes in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .big{font-size:26px;font-weight:700;line-height:1.4}
  .def,.ex,.warn,.rule{border-radius:14px;padding:16px 20px;margin:16px 0;border:1px solid var(--line)}
  .def{background:var(--acc2);border-color:transparent}
  .ex{background:var(--card)} .warn{border-color:var(--ko)} .rule{border-left:5px solid var(--acc)}
  .lbl{font-weight:800;font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--mut);display:block;margin-bottom:4px}
  .m{font-family:Cambria Math,STIX Two Math,Georgia,serif;font-size:1.15em;white-space:nowrap}
  .f{display:block;text-align:center;font-family:Cambria Math,STIX Two Math,Georgia,serif;font-size:1.45em;margin:12px 0}
  table{border-collapse:collapse;width:100%;margin:12px 0} td,th{border:1px solid var(--line);padding:8px 12px;text-align:left}
  th{background:var(--card)}
  .nav{display:flex;justify-content:space-between;gap:12px;margin-top:30px}
  button{font:inherit;font-weight:600;border:1px solid var(--line);background:var(--card);color:var(--fg);padding:11px 22px;border-radius:999px;cursor:pointer;transition:.2s}
  button:hover{transform:translateY(-1px);border-color:var(--acc)}
  button.p{background:var(--acc);color:#fff;border-color:var(--acc)} button:disabled{opacity:.35;cursor:default;transform:none}
  .opts{display:grid;gap:10px;margin:18px 0}
  .opt{text-align:left;border-radius:14px;padding:14px 18px;font-weight:500}
  .opt.ok{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 14%,transparent)}
  .opt.ko{border-color:var(--ko);background:color-mix(in srgb,var(--ko) 14%,transparent)}
  .sol{margin-top:14px;padding:16px 20px;border-radius:14px;background:var(--card);border:1px solid var(--line)}
  .sol ol{margin:6px 0 0 18px;padding:0}
  .center{text-align:center;margin:auto}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  document.title = LESSON;
  document.body.innerHTML = '<div id="em"><div class="bar"><i id="bar"></i></div><div id="view"></div></div>';
  const view = document.getElementById('view'), bar = document.getElementById('bar');
  const M = s => `<span class="m">${s}</span>`;

  /* ---------- Contenu de la leçon (slides progressifs) ---------- */
  const slides = [
    `<div class="center"><span class="tag">Logique mathématique</span>
      <h1>Les quantificateurs</h1>
      <p class="big">Dire « pour tout » et « il existe » avec rigueur.</p>
      <p style="color:var(--mut)">Durée : environ 15 minutes · 10 slides · puis exercices</p></div>`,

    `<span class="tag">1 · Point de départ</span><h2>Pourquoi des quantificateurs ?</h2>
      <p class="big">Un prédicat n'est ni vrai ni faux tant que la variable n'est pas fixée.</p>
      <div class="ex"><span class="lbl">Exemple</span>
        ${M('P(x) : « x est pair »')} — pour ${M('x = 4')} c'est vrai, pour ${M('x = 7')} c'est faux.
        Que dire de ${M('P(x)')} « en général » ? Rien : la phrase est incomplète.</div>
      <div class="def"><span class="lbl">Idée clé</span>
        Un <b>quantificateur</b> transforme un prédicat en une <b>proposition</b>, c'est-à-dire une phrase qui est soit vraie, soit fausse.</div>`,

    `<span class="tag">2 · Quantificateur universel</span><h2>Le quantificateur ${M('∀')}</h2>
      <p class="big">${M('∀')} se lit « pour tout », « quel que soit ».</p>
      <div class="def"><span class="lbl">Définition</span>
        <span class="f">∀x ∈ E, P(x)</span>
        signifie : <b>tous</b> les éléments de ${M('E')} vérifient ${M('P')}.</div>
      <div class="ex"><span class="lbl">Exemples</span>
        ${M('∀x ∈ ℝ, x² ≥ 0')} est <b style="color:var(--ok)">vraie</b>.<br>
        ${M('∀x ∈ ℕ, x est pair')} est <b style="color:var(--ko)">fausse</b> : ${M('x = 3')} est un <b>contre-exemple</b>.</div>`,

    `<span class="tag">3 · Quantificateur existentiel</span><h2>Le quantificateur ${M('∃')}</h2>
      <p class="big">${M('∃')} se lit « il existe (au moins un) ».</p>
      <div class="def"><span class="lbl">Définition</span>
        <span class="f">∃x ∈ E, P(x)</span>
        signifie : <b>au moins un</b> élément de ${M('E')} vérifie ${M('P')}. Cet élément s'appelle un <b>témoin</b>.</div>
      <div class="ex"><span class="lbl">Exemples</span>
        ${M('∃x ∈ ℕ, x² = 49')} est <b style="color:var(--ok)">vraie</b> (témoin : ${M('x = 7')}).<br>
        ${M('∃x ∈ ℝ, x² = −1')} est <b style="color:var(--ko)">fausse</b> : aucun réel n'a un carré négatif.</div>
      <div class="warn"><span class="lbl">Attention</span>« Il existe » veut dire « au moins un », jamais « exactement un ».</div>`,

    `<span class="tag">4 · Unicité</span><h2>Le quantificateur ${M('∃!')}</h2>
      <div class="def"><span class="lbl">Définition</span>
        <span class="f">∃!x ∈ E, P(x)</span>
        signifie : il existe <b>un et un seul</b> élément de ${M('E')} qui vérifie ${M('P')}.</div>
      <div class="ex"><span class="lbl">Exemples</span>
        ${M('∃!x ∈ ℝ, 2x + 6 = 0')} est vraie (seule solution : ${M('x = −3')}).<br>
        ${M('∃!x ∈ ℝ, x² = 4')} est fausse : ${M('2')} et ${M('−2')} conviennent.</div>
      <p>Pour prouver ${M('∃!')}, on prouve deux choses : l'<b>existence</b> (on exhibe un élément) et l'<b>unicité</b> (si deux éléments conviennent, ils sont égaux).</p>`,

    `<span class="tag">5 · Négation</span><h2>Nier une phrase quantifiée</h2>
      <div class="rule"><span class="lbl">Règle fondamentale</span>
        <span class="f">non(∀x, P(x)) ⟺ ∃x, non P(x)</span>
        <span class="f">non(∃x, P(x)) ⟺ ∀x, non P(x)</span>
        On <b>change</b> le quantificateur, puis on <b>nie</b> le prédicat.</div>
      <div class="ex"><span class="lbl">Exemple</span>
        Phrase : ${M('∀x ∈ ℝ, x > 2')}<br>
        Négation : ${M('∃x ∈ ℝ, x ≤ 2')} (et non ${M('x < 2')} !)</div>
      <p style="color:var(--mut)">Intuition : pour réfuter « tous », il suffit d'un contre-exemple ; pour réfuter « il existe », il faut que <i>personne</i> ne convienne.</p>`,

    `<span class="tag">6 · Quantificateurs imbriqués</span><h2>L'ordre compte</h2>
      <p class="big">Intervertir ${M('∀')} et ${M('∃')} change le sens de la phrase.</p>
      <table><tr><th>Phrase</th><th>Sens</th><th>Dans ℝ, avec ${M('y > x')}</th></tr>
        <tr><td>${M('∀x ∃y, y > x')}</td><td>à chaque ${M('x')} on associe un ${M('y')} (qui <i>dépend</i> de ${M('x')})</td><td style="color:var(--ok)">Vraie (${M('y = x+1')})</td></tr>
        <tr><td>${M('∃y ∀x, y > x')}</td><td>un seul ${M('y')} <i>fixe</i> qui convient pour tous les ${M('x')}</td><td style="color:var(--ko)">Fausse</td></tr></table>
      <div class="ex"><span class="lbl">En français</span>
        « Tout le monde a une mère » ≠ « Il existe une personne qui est la mère de tout le monde ».</div>
      <div class="rule">On a toujours ${M('∃y ∀x R(x,y) ⟹ ∀x ∃y R(x,y)')}, jamais la réciproque en général.
        Deux quantificateurs <b>identiques</b> consécutifs peuvent être permutés.</div>`,

    `<span class="tag">7 · Méthodes de preuve</span><h2>Comment démontrer ?</h2>
      <table><tr><th>Pour…</th><th>On…</th></tr>
        <tr><td>Prouver ${M('∀x, P(x)')}</td><td>fixe un <b>x quelconque</b> dans ${M('E')} et démontre ${M('P(x)')}.</td></tr>
        <tr><td>Prouver ${M('∃x, P(x)')}</td><td><b>exhibe un témoin</b> et vérifie ${M('P')} (ou prouve son existence).</td></tr>
        <tr><td>Réfuter ${M('∀x, P(x)')}</td><td>donne un <b>contre-exemple</b>.</td></tr>
        <tr><td>Réfuter ${M('∃x, P(x)')}</td><td>prouve ${M('∀x, non P(x)')}.</td></tr></table>
      <div class="warn"><span class="lbl">Erreur classique</span>
        Vérifier quelques valeurs ne prouve <b>jamais</b> une phrase en ${M('∀')} : des exemples ne font pas une démonstration, un seul contre-exemple suffit à la détruire.</div>`,

    `<span class="tag">8 · Pièges</span><h2>Les erreurs à éviter</h2>
      <div class="warn"><span class="lbl">1 · L'ensemble vide</span>
        ${M('∀x ∈ ∅, P(x)')} est <b>toujours vraie</b> (aucun contre-exemple possible) ; ${M('∃x ∈ ∅, P(x)')} est <b>toujours fausse</b>.</div>
      <div class="warn"><span class="lbl">2 · Mauvaise négation</span>
        non(« tous les x sont > 2 ») n'est pas « tous les x sont ≤ 2 ».</div>
      <div class="warn"><span class="lbl">3 · L'ordre</span>
        ${M('∀x ∃y')} ≠ ${M('∃y ∀x')}.</div>
      <div class="warn"><span class="lbl">4 · Variable muette</span>
        Dans ${M('∀x, P(x)')}, la lettre ${M('x')} est muette : ${M('∀x, P(x)')} et ${M('∀t, P(t)')} disent la même chose.</div>`,

    `<span class="tag">9 · Synthèse</span><h2>À retenir</h2>
      <table><tr><th>Notation</th><th>Lecture</th><th>Négation</th></tr>
        <tr><td>${M('∀x, P(x)')}</td><td>pour tout x</td><td>${M('∃x, non P(x)')}</td></tr>
        <tr><td>${M('∃x, P(x)')}</td><td>il existe au moins un x</td><td>${M('∀x, non P(x)')}</td></tr>
        <tr><td>${M('∃!x, P(x)')}</td><td>il existe un unique x</td><td>aucun, ou au moins deux</td></tr></table>
      <ul><li>Un quantificateur transforme un prédicat en proposition.</li>
      <li>Pour ${M('∀')} : x quelconque. Pour ${M('∃')} : un témoin.</li>
      <li>Nier = changer ${M('∀ ↔ ∃')} et nier le prédicat.</li>
      <li>L'ordre des quantificateurs différents est essentiel.</li></ul>`
  ];

  /* ---------- Rendu de la leçon ---------- */
  let idx = 0;
  function renderSlide() {
    bar.style.width = ((idx + 1) / (slides.length + 1)) * 100 + '%';
    view.innerHTML = `<div class="slide">${slides[idx]}</div>
      <div class="nav"><button id="prev" ${idx === 0 ? 'disabled' : ''}>← Précédent</button>
      <button class="p" id="next">${idx === slides.length - 1 ? 'Terminer la leçon' : 'Suivant →'}</button></div>`;
    document.getElementById('prev').onclick = () => { idx--; renderSlide(); };
    document.getElementById('next').onclick = () => { idx === slides.length - 1 ? renderFeedback() : (idx++, renderSlide()); };
  }
  function renderFeedback() {
    bar.style.width = '100%';
    view.innerHTML = `<div class="center slide"><span class="tag">Fin de la leçon</span>
      <h2>As-tu compris les quantificateurs ?</h2>
      <p style="color:var(--mut)">Sois honnête : « Je n'ai pas compris » relance la leçon depuis le début.</p>
      <div class="nav" style="justify-content:center">
        <button id="no">Je n'ai pas compris</button><button class="p" id="yes">J'ai compris</button></div></div>`;
    document.getElementById('yes').onclick = () => {
      emit('understood', { minutes: Math.round(((Date.now() - t0) / 60000) * 10) / 10 });
      startExercises();
    };
    document.getElementById('no').onclick = () => { emit('not_understood'); idx = 0; renderSlide(); };
  }

  /* ---------- Générateurs d'exercices (non stockés) ---------- */
  const PRED = [
    { name: 'est pair', f: x => x % 2 === 0 }, { name: 'est impair', f: x => x % 2 === 1 },
    { name: 'est multiple de 3', f: x => x % 3 === 0 }, { name: 'est premier', f: isPrime }
  ];

  // 1. Valeur de vérité sur un ensemble fini
  function genTruth() {
    const p = pick(PRED), S = [...new Set(Array.from({ length: 5 }, () => rnd(1, 20)))].sort((a, b) => a - b);
    const q = pick(['∀', '∃']), vals = S.map(p.f);
    const truth = q === '∀' ? vals.every(Boolean) : vals.some(Boolean);
    const steps = S.map((x, i) => `${x} ${p.name} ? ${vals[i] ? 'oui' : 'non'}`);
    const why = q === '∀'
      ? (truth ? 'Tous les éléments vérifient le prédicat : la phrase est vraie.'
               : `${S[vals.indexOf(false)]} ne vérifie pas le prédicat : c'est un contre-exemple, la phrase est fausse.`)
      : (truth ? `${S[vals.indexOf(true)]} vérifie le prédicat : c'est un témoin, la phrase est vraie.`
               : 'Aucun élément ne vérifie le prédicat : la phrase est fausse.');
    return { type: 'valeur_de_verite',
      q: `Soit ${M('E = {' + S.join(', ') + '}')}. La proposition ${M(q + 'x ∈ E, x ' + p.name)} est :`,
      options: ['Vraie', 'Fausse'], answer: truth ? 0 : 1, fixedOrder: true,
      steps: ['On teste chaque élément de E :', ...steps, why] };
  }

  // 2. Trouver le contre-exemple
  function genCounter() {
    const p = pick(PRED.slice(0, 3));
    const good = [], bad = [];
    while (good.length < 3) { const x = rnd(1, 40); if (p.f(x) && !good.includes(x)) good.push(x); }
    while (bad.length < 1) { const x = rnd(1, 40); if (!p.f(x)) bad.push(x); }
    const S = shuffle([...good, ...bad]);
    return { type: 'contre_exemple',
      q: `On considère ${M('∀x ∈ {' + S.join(', ') + '}, x ' + p.name)}. Cette proposition est fausse. Quel élément en est un contre-exemple ?`,
      options: S.map(String), answer: S.indexOf(bad[0]),
      steps: [`Un contre-exemple est un élément qui ne vérifie PAS « x ${p.name} ».`,
              `On teste : ${S.map(x => x + (p.f(x) ? ' ✓' : ' ✗')).join(' ; ')}.`,
              `Seul ${bad[0]} échoue : c'est le contre-exemple.`] };
  }

  // 3. Négation
  const NEG = [
    { P: 'x > a', N: 'x ≤ a', W: 'x < a', dom: 'ℝ' }, { P: 'x ≥ a', N: 'x < a', W: 'x ≤ a', dom: 'ℝ' },
    { P: 'x² < a', N: 'x² ≥ a', W: 'x² > a', dom: 'ℝ' }, { P: 'f(x) = 0', N: 'f(x) ≠ 0', W: 'f(x) < 0', dom: 'ℝ' },
    { P: 'x est pair', N: 'x est impair', W: 'x est premier', dom: 'ℤ' }
  ];
  function genNegation() {
    const r = pick(NEG), a = rnd(1, 9), q = pick(['∀', '∃']), nq = q === '∀' ? '∃' : '∀';
    const fix = s => s.replace('a', a);
    const mk = (Q, pr) => `${Q}x ∈ ${r.dom}, ${fix(pr)}`;
    const opts = [mk(nq, r.N), mk(q, r.N), mk(nq, r.P), mk(nq, r.W)];
    const order = shuffle([0, 1, 2, 3]);
    return { type: 'negation',
      q: `Quelle est la négation de ${M(mk(q, r.P))} ?`,
      options: order.map(i => M(opts[i])), answer: order.indexOf(0), raw: true,
      steps: [`On change le quantificateur : ${q} devient ${nq}.`,
              `On nie le prédicat : « ${fix(r.P)} » devient « ${fix(r.N)} ».`,
              `Négation : ${M(opts[0])}.`] };
  }

  // 4. Ordre des quantificateurs
  const REL = [
    { R: 'y > x', D: 'ℤ', A: true,  B: false, ex: 'A : y = x + 1 convient. B : aucun entier n\'est supérieur à tous les entiers.' },
    { R: 'y + x = 0', D: 'ℝ', A: true, B: false, ex: 'A : y = −x convient. B : un y fixe ne peut pas valoir −x pour tous les x.' },
    { R: 'y ≤ x', D: 'ℕ', A: true, B: true, ex: 'A et B : y = 0 convient pour tout x (c\'est un y fixe, donc B est vraie, donc A aussi).' },
    { R: 'x·y = 0', D: 'ℝ', A: true, B: true, ex: 'y = 0 convient pour tout x : B est vraie, donc A aussi.' },
    { R: 'y² = x', D: 'ℕ', A: false, B: false, ex: 'A : x = 2 n\'est le carré d\'aucun entier. B : un y fixe ne donne qu\'un seul x = y².' },
    { R: 'y > x²', D: 'ℝ', A: true, B: false, ex: 'A : y = x² + 1 convient. B : aucun réel n\'est supérieur à tous les x².' }
  ];
  function genOrder() {
    const r = pick(REL), A = `∀x ∈ ${r.D}, ∃y ∈ ${r.D}, ${r.R}`, B = `∃y ∈ ${r.D}, ∀x ∈ ${r.D}, ${r.R}`;
    const opts = [`Seule A : ${M(A)}`, `Seule B : ${M(B)}`, 'A et B sont toutes les deux vraies', 'A et B sont toutes les deux fausses'];
    const ans = r.A && r.B ? 2 : r.A ? 0 : !r.A && !r.B ? 3 : 1;
    return { type: 'ordre_quantificateurs',
      q: `On pose A : ${M(A)}  et  B : ${M(B)}. Laquelle est vraie ?`,
      options: opts, answer: ans, raw: true, fixedOrder: true,
      steps: [r.ex, 'Rappel : B ⟹ A, jamais l\'inverse en général.'] };
  }

  // 5. Vocabulaire / ensemble vide
  function genVocab() {
    const cases = [
      { q: `${M('∀x ∈ ∅, x > 5')} est :`, o: ['Vraie', 'Fausse'], a: 0, s: ['Pour être fausse, il faudrait un contre-exemple dans ∅.', 'Il n\'y en a pas : la proposition est vraie (vacuité).'] },
      { q: `${M('∃x ∈ ∅, x = x')} est :`, o: ['Vraie', 'Fausse'], a: 1, s: ['Pour être vraie, il faudrait un témoin dans ∅.', 'Il n\'y en a pas : la proposition est fausse.'] },
      { q: `Pour montrer qu'une phrase ${M('∀x, P(x)')} est fausse, il suffit de :`,
        o: ['Trouver un contre-exemple', 'Vérifier P sur dix valeurs', 'Trouver un témoin de P', 'Prouver ∃x, P(x)'], a: 0, s: ['Un seul x ne vérifiant pas P détruit le « pour tout ».'] },
      { q: `Pour montrer ${M('∃x, P(x)')}, la méthode la plus directe est de :`,
        o: ['Exhiber un témoin', 'Prendre x quelconque', 'Chercher un contre-exemple', 'Nier P'], a: 0, s: ['On donne un x précis et on vérifie P(x).'] }
    ];
    const c = pick(cases);
    return { type: 'vocabulaire', q: c.q, options: c.o, answer: c.a, raw: true, fixedOrder: c.o.length === 2, steps: c.s };
  }

  const GENS = [genTruth, genTruth, genCounter, genNegation, genNegation, genOrder, genOrder, genVocab];
  const TOTAL = GENS.length;

  /* ---------- Exercices ---------- */
  let n = 0, score = 0, results = [];
  function startExercises() { n = 0; score = 0; results = []; nextExercise(); }
  function nextExercise() {
    if (n >= TOTAL) return renderEnd();
    const ex = GENS[n]();
    const order = ex.fixedOrder ? ex.options.map((_, i) => i) : shuffle(ex.options.map((_, i) => i));
    const started = Date.now();
    bar.style.width = (n / TOTAL) * 100 + '%';
    view.innerHTML = `<div class="slide"><span class="tag">Exercice ${n + 1} / ${TOTAL}</span>
      <p class="big">${ex.q}</p><div class="opts" id="opts">
      ${order.map((oi, k) => `<button class="opt" data-k="${k}">${ex.options[oi]}</button>`).join('')}</div>
      <div id="fb"></div></div>`;
    document.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      const chosen = order[+b.dataset.k], ok = chosen === ex.answer, secs = Math.round((Date.now() - started) / 100) / 10;
      document.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (order[+x.dataset.k] === ex.answer) x.classList.add('ok'); });
      if (!ok) b.classList.add('ko'); else score++;
      emit('exercise_result', { exerciseType: ex.type, correct: ok, seconds: secs,
        data: { question: ex.q.replace(/<[^>]+>/g, ''), chosen: ex.options[chosen].replace(/<[^>]+>/g, '') } });
      results.push({ type: ex.type, ok });
      document.getElementById('fb').innerHTML = `<div class="sol"><b style="color:var(${ok ? '--ok' : '--ko'})">${ok ? 'Correct !' : 'Incorrect.'}</b>
        <span class="lbl" style="margin-top:8px">Solution pas à pas</span><ol>${ex.steps.map(s => `<li>${s}</li>`).join('')}</ol></div>
        <div class="nav" style="justify-content:flex-end"><button class="p" id="go">${n === TOTAL - 1 ? 'Voir le bilan' : 'Exercice suivant →'}</button></div>`;
      document.getElementById('go').onclick = () => { n++; nextExercise(); };
    });
  }
  function renderEnd() {
    bar.style.width = '100%';
    const pct = Math.round((score / TOTAL) * 100);
    const msg = pct >= 80 ? 'Excellent : notion maîtrisée.' : pct >= 50 ? 'Bien, mais revois les négations et l\'ordre des quantificateurs.' : 'À consolider : relis la leçon, puis réessaie.';
    view.innerHTML = `<div class="center slide"><span class="tag">Bilan</span><h2>${score} / ${TOTAL}</h2>
      <p class="big">${msg}</p><div class="nav" style="justify-content:center">
      <button id="again" class="p">Nouveaux exercices</button><button id="review">Revoir la leçon</button></div></div>`;
    document.getElementById('again').onclick = startExercises;
    document.getElementById('review').onclick = () => { idx = 0; renderSlide(); };
  }

  /* ---------- Démarrage ---------- */
  let started = false;
  const begin = understood => { if (started) return; started = true; understood ? startExercises() : renderSlide(); };
  window.addEventListener('message', e => { if (e.data && e.data.type === 'init') begin(!!e.data.understood); });
  if (typeof window.EASYMATH_UNDERSTOOD !== 'undefined') begin(!!window.EASYMATH_UNDERSTOOD);
  else { setTimeout(() => begin(false), 250); try { window.parent.postMessage({ source: 'easymath-lesson', type: 'ready', lesson: LESSON, course: COURSE }, '*'); } catch (e) {} }
})();
