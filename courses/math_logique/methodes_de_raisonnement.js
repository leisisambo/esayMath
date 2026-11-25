/* ============================================================
   EasyMath — Leçon : Les méthodes de raisonnement
   Cours : Logique mathématique
   Script autonome : à coller dans le champ « script » du modal.
   Même contrat de messages que la leçon « Les quantificateurs » :
     émis  : ready, understood{minutes}, not_understood, exercise_result{exerciseType,correct,seconds,data}
     reçu  : { type:'init', understood:true|false }
   ============================================================ */
(function () {
  // EasyMath execute les scripts dans un Web Worker : document et window DOM
  // n'y existent pas. Ce chemin utilise l'API EM ; le mode autonome ci-dessous
  // reste disponible lorsque le fichier est execute dans une page HTML.
  if (typeof EM !== 'undefined' && EM && typeof EM.lesson === 'function') {
    const slides = [
      `# Les méthodes de raisonnement\n\nUne démonstration part d'hypothèses et enchaîne des arguments jusqu'à une conclusion. Une implication $P\\Rightarrow Q$ signifie « si P, alors Q » : P est l'hypothèse et Q la conclusion. Pour démontrer, réfuter ou résoudre un problème, on choisit une méthode adaptée.`,
      `# Le raisonnement direct\n\nPour démontrer $P\\Rightarrow Q$ directement, on suppose P vraie puis on déduit Q à l'aide des définitions et des résultats connus.\n\nExemple : si n est pair, alors $n=2k$ pour un entier k. Donc $n^2=4k^2=2(2k^2)$, ainsi $n^2$ est pair.`,
      `# La disjonction de cas\n\nOn sépare les possibilités en cas qui couvrent toutes les situations, puis on démontre le résultat dans chaque cas.\n\nExemple : pour tout entier n, $n(n+1)$ est pair. Si n est pair, le produit est pair. Si n est impair, n+1 est pair. Ces deux cas couvrent tous les entiers.`,
      `# La contraposée\n\nPour démontrer $P\\Rightarrow Q$, on peut démontrer sa contraposée $\\neg Q\\Rightarrow\\neg P$, qui lui est équivalente.\n\nExemple : pour prouver « si $n^2$ est pair, alors n est pair », on démontre « si n est impair, alors $n^2$ est impair ».\n\nNe confonds pas la contraposée avec la réciproque $Q\\Rightarrow P$ : elles ne sont pas équivalentes.`,
      `# Le raisonnement par l'absurde\n\nPour prouver P par l'absurde, on suppose que P est fausse et on montre que cette supposition entraîne une contradiction. La supposition contraire est donc impossible, et P est vraie.\n\nExemple : supposons qu'il existe un plus grand entier n. Alors n+1 est un entier plus grand, ce qui contredit l'hypothèse.`,
      `# Le contre-exemple\n\nPour réfuter une affirmation universelle (« pour tout x, P(x) »), un seul contre-exemple suffit : il vérifie les hypothèses et rend la conclusion fausse.\n\nExemple : « tout nombre premier est impair » est faux, car 2 est premier et pair. Quelques exemples qui confirment une affirmation ne prouvent pas qu'elle est vraie pour tous les cas.`,
      `# La récurrence\n\nPour prouver une propriété P(n) pour tout entier à partir d'un rang :\n\n1. **Initialisation :** vérifier la propriété au premier rang.\n2. **Hérédité :** supposer P(k) vraie et démontrer P(k+1).\n3. **Conclusion :** la propriété est vraie à tous les rangs suivants.\n\nSans initialisation, l'hérédité seule ne garantit rien.`,
      `# L'analyse-synthèse\n\nPour résoudre une équation ou trouver des objets qui vérifient une condition :\n\n- **Analyse :** on part d'une solution éventuelle et on déduit les candidats possibles. Toute solution doit figurer parmi ces candidats.\n- **Synthèse :** on vérifie chaque candidat dans les conditions de départ. Cela confirme qu'il convient.\n\nL'analyse seule ne prouve pas que les candidats sont réellement des solutions.`
    ];
    const exercises = [
      { question: `Pour démontrer « si n est pair, alors $n^2$ est pair », quelle méthode convient le plus directement ?`, choices: ['Raisonnement direct', 'Contre-exemple', 'Analyse-synthèse'], correctIndex: 0, steps: [`On écrit n=2k, puis $n^2=2(2k^2)$ : on déduit directement la conclusion de l'hypothèse.`] },
      { question: `Quelle est la contraposée de « si P, alors Q » ?`, choices: ['$\\neg Q\\Rightarrow\\neg P$', '$Q\\Rightarrow P$', '$\\neg P\\Rightarrow\\neg Q$'], correctIndex: 0, steps: [`On nie la conclusion et l'hypothèse, puis on inverse leur ordre : non Q implique non P.`] },
      { question: `Pour réfuter « tout nombre premier est impair », quel contre-exemple utiliser ?`, choices: ['2', '3', '5'], correctIndex: 0, steps: [`2 est un nombre premier, mais il est pair. Il suffit donc à réfuter l'affirmation universelle.`] },
      { question: `Dans une preuve par récurrence, que faut-il faire avant l'hérédité ?`, choices: ['Vérifier la propriété au rang initial', 'Chercher un contre-exemple', 'Prouver la réciproque'], correctIndex: 0, steps: [`C'est l'étape d'initialisation. Elle fournit le premier cas à partir duquel l'hérédité s'applique.`] },
      { question: `Pour prouver P par l'absurde, quelle est la première étape ?`, choices: ['Supposer que P est fausse', 'Supposer que P est vraie', 'Prouver la réciproque de P'], correctIndex: 0, steps: [`On suppose non P, puis on cherche à déduire une contradiction.`] },
      { question: `Dans une disjonction de cas, que doit-on vérifier à propos des cas ?`, choices: ['Ils couvrent toutes les possibilités', 'Ils donnent tous le même calcul', 'Ils sont toujours au nombre de deux'], correctIndex: 0, steps: [`Les cas doivent être exhaustifs. Sinon, une possibilité pourrait ne pas être démontrée.`] },
      { question: `Que garantit l'analyse seule dans une méthode d'analyse-synthèse ?`, choices: ['Toute solution éventuelle est parmi les candidats trouvés', 'Chaque candidat est forcément solution', "Qu'il existe au moins une solution"], correctIndex: 0, steps: [`L'analyse donne des conditions nécessaires et produit des candidats. La synthèse vérifie lesquels satisfont réellement le problème.`] },
      { question: `La réciproque d'une implication vraie est-elle toujours vraie ?`, choices: ["Non : cela dépend de l'implication", 'Oui, toujours', 'Non : elle est toujours fausse'], correctIndex: 0, steps: [`Exemple : « si un nombre est multiple de 4, alors il est pair » est vraie. Sa réciproque est fausse : 2 est pair mais pas multiple de 4.`] }
    ];
    EM.lesson({
      slides,
      rounds: exercises.length,
      exercises: [{
        type: 'Méthodes de raisonnement',
        generate() {
          if (!this.exercisePool) this.exercisePool = exercises.map((_, i) => i);
          if (!this.exercisePool.length) this.exercisePool = exercises.map((_, i) => i);
          for (let i = this.exercisePool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.exercisePool[i], this.exercisePool[j]] = [this.exercisePool[j], this.exercisePool[i]];
          }
          return exercises[this.exercisePool.pop()];
        }
      }]
    });
    return;
  }
  const COURSE = typeof courseName !== 'undefined' ? courseName : 'Logique mathématique';
  const LESSON = typeof lessonName !== 'undefined' ? lessonName : 'Les méthodes de raisonnement';
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
  .center{text-align:center;margin:auto}
  .pf{border-left:3px solid var(--line);padding:2px 0 2px 16px;margin:12px 0}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  document.title = LESSON;
  document.body.innerHTML = '<div id="em"><div class="bar"><i id="bar"></i></div><div id="view"></div></div>';
  const view = document.getElementById('view'), bar = document.getElementById('bar');
  const M = s => `<span class="m">${s}</span>`;

  /* ---------- Contenu de la leçon ---------- */
  const slides = [
    `<div class="center"><span class="tag">Logique mathématique</span>
      <h1>Les méthodes de raisonnement</h1>
      <p class="big">Comment démontrer une affirmation : choisir la bonne stratégie.</p>
      <p style="color:var(--mut)">Durée : environ 20 minutes · 10 slides · puis exercices</p></div>`,

    `<span class="tag">1 · Cadre</span><h2>Démontrer, c'est quoi ?</h2>
      <p class="big">Une démonstration enchaîne des implications, à partir d'hypothèses, jusqu'à la conclusion.</p>
      <div class="def"><span class="lbl">Implication</span>
        <span class="f">P ⟹ Q</span>
        « Si ${M('P')} alors ${M('Q')} ». ${M('P')} est l'<b>hypothèse</b>, ${M('Q')} la <b>conclusion</b>.
        Elle n'est fausse que dans un seul cas : ${M('P')} vraie et ${M('Q')} fausse.</div>
      <table><tr><th>P</th><th>Q</th><th>P ⟹ Q</th></tr>
        <tr><td>V</td><td>V</td><td>V</td></tr><tr><td>V</td><td>F</td><td style="color:var(--ko)"><b>F</b></td></tr>
        <tr><td>F</td><td>V</td><td>V</td></tr><tr><td>F</td><td>F</td><td>V</td></tr></table>
      <p style="color:var(--mut)">Une hypothèse fausse rend l'implication vraie : « si 1 = 2 alors 3 = 3 » est vraie.</p>`,

    `<span class="tag">2 · Méthode 1</span><h2>Le raisonnement direct</h2>
      <div class="def"><span class="lbl">Principe</span>
        On suppose ${M('P')} vraie et on enchaîne des implications ${M('P ⟹ P₁ ⟹ P₂ ⟹ … ⟹ Q')}.</div>
      <div class="ex"><span class="lbl">Exemple</span>
        <b>Montrons :</b> si ${M('n')} est pair, alors ${M('n²')} est pair.
        <div class="pf">Soit ${M('n')} pair : ${M('n = 2k')} avec ${M('k ∈ ℤ')}.<br>
        Alors ${M('n² = 4k² = 2·(2k²)')}, et ${M('2k²')} est entier.<br>
        Donc ${M('n²')} est pair. ∎</div></div>
      <p>C'est la méthode à essayer <b>en premier</b>.</p>`,

    `<span class="tag">3 · Méthode 2</span><h2>La disjonction de cas</h2>
      <div class="def"><span class="lbl">Principe</span>
        On découpe en cas qui <b>couvrent toutes les possibilités</b> (${M('A')} ou ${M('B')}), puis on prouve la conclusion dans chaque cas.</div>
      <div class="ex"><span class="lbl">Exemple</span>
        <b>Montrons :</b> pour tout ${M('n ∈ ℤ')}, ${M('n(n+1)')} est pair.
        <div class="pf"><i>Cas 1 :</i> ${M('n')} pair → le facteur ${M('n')} est pair, donc le produit aussi.<br>
        <i>Cas 2 :</i> ${M('n')} impair → ${M('n+1')} est pair, donc le produit aussi.<br>
        Les deux cas épuisent les entiers. ∎</div></div>
      <div class="warn"><span class="lbl">Attention</span>Vérifie que les cas sont <b>exhaustifs</b> : on ne doit oublier aucune possibilité.</div>`,

    `<span class="tag">4 · Méthode 3</span><h2>La contraposée</h2>
      <div class="rule"><span class="lbl">Équivalence</span>
        <span class="f">(P ⟹ Q) ⟺ (non Q ⟹ non P)</span>
        Pour prouver ${M('P ⟹ Q')}, on prouve sa <b>contraposée</b>.</div>
      <div class="ex"><span class="lbl">Exemple</span>
        <b>Montrons :</b> si ${M('n²')} est pair, alors ${M('n')} est pair.
        <div class="pf">Contraposée : si ${M('n')} est impair, alors ${M('n²')} est impair.<br>
        ${M('n = 2k+1')} ⟹ ${M('n² = 4k² + 4k + 1 = 2(2k²+2k) + 1')}, impair. ∎</div></div>
      <div class="warn"><span class="lbl">Ne pas confondre</span>
        Réciproque : ${M('Q ⟹ P')} · Inverse : ${M('non P ⟹ non Q')} · Contraposée : ${M('non Q ⟹ non P')}.
        <b>Seule la contraposée</b> est équivalente à ${M('P ⟹ Q')}.</div>`,

    `<span class="tag">5 · Méthode 4</span><h2>Le raisonnement par l'absurde</h2>
      <div class="def"><span class="lbl">Principe</span>
        Pour prouver ${M('P')}, on suppose ${M('non P')} et on aboutit à une <b>contradiction</b> (une absurdité). Donc ${M('non P')} est fausse, donc ${M('P')} est vraie.</div>
      <div class="ex"><span class="lbl">Exemple classique</span>
        <b>Montrons :</b> ${M('√2')} est irrationnel.
        <div class="pf">Supposons ${M('√2 = p/q')} avec ${M('p/q')} irréductible.<br>
        Alors ${M('p² = 2q²')}, donc ${M('p²')} est pair, donc ${M('p')} est pair (slide précédente) : ${M('p = 2m')}.<br>
        Alors ${M('4m² = 2q²')}, soit ${M('q² = 2m²')}, donc ${M('q')} est pair aussi.<br>
        ${M('p')} et ${M('q')} pairs : la fraction n'est pas irréductible. Contradiction. ∎</div></div>`,

    `<span class="tag">6 · Méthode 5</span><h2>Le contre-exemple</h2>
      <div class="def"><span class="lbl">Principe</span>
        Pour <b>réfuter</b> une phrase ${M('∀x, P(x)')}, il suffit d'exhiber <b>un seul</b> ${M('x')} qui ne vérifie pas ${M('P')}.</div>
      <div class="ex"><span class="lbl">Exemple</span>
        « Tout nombre premier est impair » est fausse : ${M('2')} est premier et pair.<br>
        « ${M('∀n ∈ ℕ, n² + n + 41')} est premier » est fausse : pour ${M('n = 40')}, on obtient ${M('1681 = 41²')}.</div>
      <div class="warn"><span class="lbl">Rappel</span>
        Des exemples <b>ne prouvent pas</b> une phrase en ${M('∀')}. Un contre-exemple <b>réfute</b> une phrase en ${M('∀')}.</div>`,

    `<span class="tag">7 · Méthode 6</span><h2>Le raisonnement par récurrence</h2>
      <p class="big">Pour prouver ${M('P(n)')} pour tout entier ${M('n ≥ n₀')}.</p>
      <div class="def"><span class="lbl">Les trois étapes</span>
        <b>1. Initialisation :</b> vérifier ${M('P(n₀)')}.<br>
        <b>2. Hérédité :</b> soit ${M('k ≥ n₀')} fixé ; on <i>suppose</i> ${M('P(k)')} et on démontre ${M('P(k+1)')}.<br>
        <b>3. Conclusion :</b> d'après le principe de récurrence, ${M('P(n)')} est vraie pour tout ${M('n ≥ n₀')}.</div>
      <div class="ex"><span class="lbl">Exemple</span>
        ${M('P(n) : 1 + 2 + … + n = n(n+1)/2')}<br>
        <i>Init.</i> ${M('n=1')} : ${M('1 = 1·2/2')} ✓.<br>
        <i>Hérédité.</i> Si ${M('P(k)')}, alors ${M('1+…+k+(k+1) = k(k+1)/2 + (k+1) = (k+1)(k+2)/2')} : c'est ${M('P(k+1)')}. ∎</div>
      <div class="warn">Sans initialisation, ou sans utiliser l'hypothèse dans l'hérédité, la preuve est invalide.</div>`,

    `<span class="tag">8 · Méthode 7</span><h2>L'analyse-synthèse</h2>
      <div class="def"><span class="lbl">Principe</span>
        Pour <b>trouver</b> tous les objets vérifiant une condition :<br>
        <b>Analyse</b> : on suppose qu'un objet convient et on déduit des <i>conditions nécessaires</i> (candidats).<br>
        <b>Synthèse</b> : on <i>vérifie</i> que les candidats conviennent réellement.</div>
      <div class="ex"><span class="lbl">Exemple</span> Résoudre ${M('√(x+2) = x')} dans ${M('ℝ')}.
        <div class="pf"><i>Analyse.</i> Si ${M('x')} est solution, alors ${M('x ≥ 0')} et ${M('x + 2 = x²')}, soit ${M('x² − x − 2 = 0')}, donc ${M('x = 2')} ou ${M('x = −1')}.<br>
        <i>Synthèse.</i> ${M('x = 2')} : ${M('√4 = 2')} ✓. ${M('x = −1')} : ${M('√1 = 1 ≠ −1')} ✗.<br>
        Ensemble des solutions : ${M('{2}')}.</div></div>
      <p style="color:var(--mut)">L'analyse donne des conditions nécessaires ; seule la synthèse assure qu'elles sont suffisantes.</p>`,

    `<span class="tag">9 · Synthèse</span><h2>Quelle méthode choisir ?</h2>
      <table><tr><th>Situation</th><th>Méthode</th></tr>
        <tr><td>L'hypothèse mène naturellement à la conclusion</td><td>Direct</td></tr>
        <tr><td>Plusieurs configurations possibles (pair/impair, signe…)</td><td>Disjonction de cas</td></tr>
        <tr><td>La négation de Q est plus riche en information que P</td><td>Contraposée</td></tr>
        <tr><td>Prouver une non-existence ou une irrationalité</td><td>Absurde</td></tr>
        <tr><td>Réfuter une phrase en ∀</td><td>Contre-exemple</td></tr>
        <tr><td>Propriété indexée par ${M('n ∈ ℕ')}, lien entre ${M('n')} et ${M('n+1')}</td><td>Récurrence</td></tr>
        <tr><td>Trouver toutes les solutions d'une équation ou d'un problème</td><td>Analyse-synthèse</td></tr></table>
      <div class="warn"><span class="lbl">Erreurs fréquentes</span>
        Prouver la réciproque au lieu de l'implication · oublier l'initialisation · conclure à partir d'exemples · oublier la synthèse.</div>
      <p><b>Bilan :</b> « non » ne se démontre pas avec des exemples, « oui pour tout » ne se démontre pas avec des exemples non plus.</p>`
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
      <h2>As-tu compris les méthodes de raisonnement ?</h2>
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

  // 1. Contraposée / réciproque / inverse / négation
  const IMPL = [
    { P: 'n est pair', Q: 'n² est pair', nP: 'n est impair', nQ: 'n² est impair' },
    { P: 'x > 2', Q: 'x² > 4', nP: 'x ≤ 2', nQ: 'x² ≤ 4' },
    { P: 'le quadrilatère est un carré', Q: 'le quadrilatère est un rectangle', nP: 'le quadrilatère n\'est pas un carré', nQ: 'le quadrilatère n\'est pas un rectangle' },
    { P: 'n est divisible par 6', Q: 'n est divisible par 3', nP: 'n n\'est pas divisible par 6', nQ: 'n n\'est pas divisible par 3' },
    { P: 'f est dérivable en a', Q: 'f est continue en a', nP: 'f n\'est pas dérivable en a', nQ: 'f n\'est pas continue en a' }
  ];
  function genContra() {
    const r = pick(IMPL), target = pick(['contraposée', 'réciproque', 'inverse']);
    const forms = { contraposée: `Si ${r.nQ}, alors ${r.nP}`, réciproque: `Si ${r.Q}, alors ${r.P}`, inverse: `Si ${r.nP}, alors ${r.nQ}`, negation: `${r.P} et ${r.nQ}` };
    const keys = ['contraposée', 'réciproque', 'inverse', 'negation'];
    const order = shuffle(keys);
    const descr = { contraposée: 'La contraposée de P ⟹ Q est non Q ⟹ non P.', réciproque: 'La réciproque de P ⟹ Q est Q ⟹ P.', inverse: 'L\'inverse de P ⟹ Q est non P ⟹ non Q.' };
    return { type: 'contraposee',
      q: `Soit l'implication « Si ${r.P}, alors ${r.Q} ». Quelle est sa <b>${target}</b> ?`,
      options: order.map(k => forms[k]), answer: order.indexOf(target), raw: true,
      steps: [`On note P : « ${r.P} » et Q : « ${r.Q} ».`, descr[target],
              `Ici : « ${forms[target]} ».`,
              target === 'contraposée' ? 'Seule la contraposée est équivalente à l\'implication de départ.' : 'Cette forme n\'est pas équivalente à l\'implication de départ.'] };
  }

  // 2. Choix de la méthode
  const METH = ['Raisonnement direct', 'Disjonction de cas', 'Contraposée', 'Absurde', 'Contre-exemple', 'Récurrence', 'Analyse-synthèse'];
  const SCEN = [
    { t: 'Montrer que « tout réel x vérifie x² > x » est faux.', m: 'Contre-exemple', why: 'Phrase en ∀ à réfuter : x = 0 ou x = 1/2 suffit.' },
    { t: 'Montrer que ∀n ∈ ℕ, 1 + 3 + 5 + … + (2n−1) = n².', m: 'Récurrence', why: 'Propriété indexée par n qui relie n et n+1.' },
    { t: 'Montrer que √3 est irrationnel.', m: 'Absurde', why: 'On suppose √3 = p/q irréductible et on cherche une contradiction.' },
    { t: 'Montrer que pour tout entier n, n² + n est pair.', m: 'Disjonction de cas', why: 'Deux cas exhaustifs : n pair, n impair.' },
    { t: 'Montrer que si n² est impair alors n est impair.', m: 'Contraposée', why: 'La contraposée « n pair ⟹ n² pair » est immédiate.' },
    { t: 'Trouver toutes les fonctions f : ℝ → ℝ telles que f(x) = 2f(x) pour tout x.', m: 'Analyse-synthèse', why: 'On déduit d\'abord les candidats (analyse), puis on les vérifie (synthèse).' },
    { t: 'Montrer que si a et b sont pairs, alors a + b est pair.', m: 'Raisonnement direct', why: 'On écrit a = 2k, b = 2m, donc a + b = 2(k + m).' }
  ];
  function genMethod() {
    const s = pick(SCEN), others = shuffle(METH.filter(m => m !== s.m)).slice(0, 3);
    const opts = shuffle([s.m, ...others]);
    return { type: 'choix_methode', q: `Quelle méthode est la plus adaptée ?<br><span style="font-weight:500">${s.t}</span>`,
      options: opts, answer: opts.indexOf(s.m), fixedOrder: true,
      steps: [s.why, `Méthode retenue : ${s.m}.`] };
  }

  // 3. Trouver un contre-exemple parmi 4 nombres
  const CE = [
    { s: 'n est multiple de 3', a: x => x % 3 === 0, b: 'n est impair', f: x => x % 2 === 1 },
    { s: 'n est premier', a: isPrime, b: 'n est impair', f: x => x % 2 === 1 },
    { s: 'n est pair', a: x => x % 2 === 0, b: 'n est multiple de 4', f: x => x % 4 === 0 },
    { s: 'n est multiple de 5', a: x => x % 5 === 0, b: 'n est impair', f: x => x % 2 === 1 }
  ];
  function genCounter() {
    const r = pick(CE); let S;
    do { S = [...new Set(Array.from({ length: 4 }, () => rnd(2, 40)))]; }
    while (S.length < 4 || S.filter(x => r.a(x) && !r.f(x)).length !== 1);
    const bad = S.find(x => r.a(x) && !r.f(x));
    return { type: 'contre_exemple',
      q: `La phrase « pour tout entier n, si ${r.s} alors ${r.b} » est fausse. Lequel de ces entiers en est un contre-exemple ?`,
      options: S.map(String), answer: S.indexOf(bad),
      steps: ['Un contre-exemple vérifie l\'hypothèse mais pas la conclusion.',
              ...S.map(x => `${x} : hypothèse ${r.a(x) ? 'vraie' : 'fausse'}, conclusion ${r.f(x) ? 'vraie' : 'fausse'}`),
              `Seul ${bad} vérifie l'hypothèse sans la conclusion.`] };
  }

  // 4. Hérédité d'une récurrence
  const SER = [
    { S: '1 + 2 + … + n', u: k => `${k}+1`, name: 'k + 1', val: 'k + 1' },
    { S: '1 + 3 + 5 + … + (2n−1)', name: '2k + 1', val: '2k + 1' },
    { S: '2 + 4 + 6 + … + 2n', name: '2k + 2', val: '2k + 2' },
    { S: '1² + 2² + … + n²', name: '(k+1)²', val: '(k + 1)²' }
  ];
  function genRec() {
    const r = pick(SER), wrong = ['k', 'k + 2', '2k', 'k²'].filter(w => w !== r.val);
    const opts = shuffle([r.val, ...shuffle(wrong).slice(0, 3)]);
    return { type: 'recurrence',
      q: `On démontre par récurrence une formule pour ${M('S(n) = ' + r.S)}. Dans l'hérédité, on écrit ${M('S(k+1) = S(k) + u')}. Que vaut le dernier terme ${M('u')} ?`,
      options: opts.map(o => M(o)), answer: opts.indexOf(r.val), raw: true,
      steps: [`${M('S(n)')} est la somme des termes jusqu'au rang ${M('n')}.`,
              `${M('S(k+1)')} ajoute à ${M('S(k)')} le terme de rang ${M('k+1')}.`,
              `Ce terme vaut ${M(r.val)}.`,
              'On applique ensuite l\'hypothèse de récurrence sur S(k) et on simplifie.'] };
  }

  // 5. Analyse-synthèse : √(x+a) = x
  function genAnalyse() {
    const m = rnd(2, 5), a = m * m - m, bad = -(m - 1);
    const opts = [`{${m}}`, `{${m} ; ${bad}}`, '∅', `{${bad}}`], order = shuffle([0, 1, 2, 3]);
    return { type: 'analyse_synthese',
      q: `Quel est l'ensemble des solutions réelles de ${M('√(x + ' + a + ') = x')} ?`,
      options: order.map(i => M(opts[i])), answer: order.indexOf(0), raw: true,
      steps: [`Analyse : ${M('x ≥ 0')} et ${M('x + ' + a + ' = x²')}, soit ${M('x² − x − ' + a + ' = 0')}.`,
              `Les racines sont ${M('x = ' + m)} et ${M('x = ' + bad)}.`,
              `Synthèse : ${M(m + ' ≥ 0')} et ${M('√' + (m * m) + ' = ' + m)} ✓ ; ${M(bad + ' < 0')} donc ${M(bad)} est rejeté.`,
              `Solutions : ${M('{' + m + '}')}.`] };
  }

  // 6. Vocabulaire / pièges
  function genVocab() {
    const cases = [
      { q: 'La réciproque d\'une implication vraie est :', o: ['Toujours vraie', 'Toujours fausse', 'Parfois vraie, parfois fausse', 'Équivalente à l\'implication'], a: 2, s: ['Ex. : « si n est multiple de 4 alors n est pair » est vraie.', 'Sa réciproque « si n est pair alors n est multiple de 4 » est fausse (n = 2).', 'Aucune règle générale : il faut la vérifier.'] },
      { q: 'Quelle est la première étape d\'un raisonnement par l\'absurde pour prouver P ?', o: ['Supposer non P', 'Supposer P', 'Chercher un contre-exemple', 'Prouver la réciproque'], a: 0, s: ['On suppose le contraire de ce qu\'on veut démontrer : non P.', 'On cherche ensuite une contradiction.'] },
      { q: 'Une récurrence sans initialisation est :', o: ['Valide si l\'hérédité est prouvée', 'Invalide : la chaîne n\'a pas de premier maillon', 'Valide pour n pair seulement', 'Toujours fausse'], a: 1, s: ['L\'hérédité dit « P(k) ⟹ P(k+1) », mais ne dit pas que P(k) est vraie pour un premier k.', 'Sans initialisation, la conclusion n\'est pas garantie.'] },
      { q: 'Si P est fausse, l\'implication P ⟹ Q est :', o: ['Vraie', 'Fausse', 'Vraie seulement si Q est vraie', 'Indéterminée'], a: 0, s: ['L\'implication n\'est fausse que si P est vraie et Q fausse.', 'Si P est fausse, elle est vraie quelle que soit Q.'] },
      { q: 'Dans une analyse-synthèse, que garantit l\'analyse seule ?', o: ['Que les candidats trouvés sont des solutions', 'Que toute solution est parmi les candidats', 'Que l\'ensemble des solutions est non vide', 'Rien du tout'], a: 1, s: ['L\'analyse produit des conditions nécessaires : toute solution est un candidat.', 'La synthèse vérifie que chaque candidat convient (condition suffisante).'] },
      { q: 'Dans une disjonction de cas, il faut que les cas soient :', o: ['Exhaustifs (ils couvrent toutes les possibilités)', 'Au nombre de deux exactement', 'Choisis au hasard', 'Tous démontrés par l\'absurde'], a: 0, s: ['Si un cas est oublié, la preuve est incomplète.', 'Ex. : « n pair ou n impair » couvre tous les entiers.'] }
    ];
    const c = pick(cases);
    return { type: 'vocabulaire', q: c.q, options: c.o, answer: c.a, raw: true, steps: c.s };
  }

  const GENS = [genContra, genContra, genMethod, genMethod, genCounter, genRec, genAnalyse, genVocab];
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
    const msg = pct >= 80 ? 'Excellent : les méthodes sont maîtrisées.' : pct >= 50 ? 'Bien, mais revois la contraposée et le choix de la méthode.' : 'À consolider : relis la leçon, puis réessaie.';
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
