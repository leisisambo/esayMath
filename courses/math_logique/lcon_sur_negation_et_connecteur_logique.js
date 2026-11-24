/* ============================================================
   EasyMath — Cours : Logique mathématique
   Leçon 1 : Connecteurs logiques et tables de vérité
   Contenu : négation, conjonction, disjonction, implication,
             équivalence, tables de vérité, exercices générés.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Utilitaires ---------- */
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const pick = (arr) => arr[rnd(0, arr.length - 1)];
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = rnd(0, i);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const VF = (b) => (b ? 'V' : 'F');
  const word = (b) => (b ? 'Vrai' : 'Faux');

  const OPS = {
    '∧': (p, q) => p && q,
    '∨': (p, q) => p || q,
    '⇒': (p, q) => !p || q,
    '⇔': (p, q) => p === q,
  };
  const OP_NAMES = {
    '∧': 'conjonction (ET)',
    '∨': 'disjonction (OU)',
    '⇒': 'implication',
    '⇔': 'équivalence',
  };
  const OP_RULES = {
    '∧': 'P ∧ Q est vraie seulement si P et Q sont toutes les deux vraies.',
    '∨': 'P ∨ Q est fausse seulement si P et Q sont toutes les deux fausses.',
    '⇒': 'P ⇒ Q est fausse seulement si P est vraie et Q est fausse.',
    '⇔': 'P ⇔ Q est vraie si P et Q ont la même valeur de vérité.',
  };

  /* Construit un exercice à choix multiples avec UNE seule bonne réponse */
  function buildExercise({ type, question, correct, wrongs, steps, timeLimit }) {
    const choices = shuffle([correct, ...wrongs]);
    return {
      type,
      question,
      choices,
      answer: choices.indexOf(correct), // index de la bonne réponse
      steps, // solution pas à pas (tableau de chaînes markdown)
      timeLimit: timeLimit || 45, // secondes (compteur géré par l'application)
    };
  }

  /* ---------- Slides de la leçon (markdown) ---------- */
  const slides = [
    {
      title: 'Qu\'est-ce qu\'une proposition ?',
      content:
`# Une **proposition** est un énoncé qui est soit **vrai**, soit **faux**.

Exemples :
- « 7 est un nombre premier » → proposition **vraie** (V)
- « 2 + 2 = 5 » → proposition **fausse** (F)
- « Quelle heure est-il ? » → **pas** une proposition (question)

On note les propositions par des lettres : **P**, **Q**, **R**…`,
    },
    {
      title: 'Les connecteurs logiques',
      content:
`# Les **connecteurs logiques**

Ils permettent de construire de nouvelles propositions à partir d'autres :

| Symbole | Nom | Lecture |
|:---:|:---|:---|
| ¬P | négation | « non P » |
| P ∧ Q | conjonction | « P et Q » |
| P ∨ Q | disjonction | « P ou Q » |
| P ⇒ Q | implication | « P implique Q » |
| P ⇔ Q | équivalence | « P équivaut à Q » |`,
    },
    {
      title: 'La négation ¬',
      content:
`# La **négation** : ¬P

¬P est **vraie** quand P est **fausse**, et inversement.

| P | ¬P |
|:---:|:---:|
| V | F |
| F | V |

**Exemple** : P : « 3 est pair » (F). Alors ¬P : « 3 n'est pas pair » (V).`,
    },
    {
      title: 'La conjonction ∧',
      content:
`# La **conjonction** : P ∧ Q (« P et Q »)

Elle est vraie **seulement si P et Q sont toutes les deux vraies**.

| P | Q | P ∧ Q |
|:---:|:---:|:---:|
| V | V | **V** |
| V | F | F |
| F | V | F |
| F | F | F |

**Exemple** : « 4 est pair **et** 4 > 3 » est vraie.`,
    },
    {
      title: 'La disjonction ∨',
      content:
`# La **disjonction** : P ∨ Q (« P ou Q »)

Elle est fausse **seulement si P et Q sont toutes les deux fausses**.

| P | Q | P ∨ Q |
|:---:|:---:|:---:|
| V | V | V |
| V | F | V |
| F | V | V |
| F | F | **F** |

⚠️ En mathématiques, le « ou » est **inclusif** : P ∨ Q reste vraie si P et Q sont vraies ensemble.`,
    },
    {
      title: 'L\'implication ⇒',
      content:
`# L'**implication** : P ⇒ Q (« si P alors Q »)

Elle est fausse **seulement si P est vraie et Q est fausse**.

| P | Q | P ⇒ Q |
|:---:|:---:|:---:|
| V | V | V |
| V | F | **F** |
| F | V | V |
| F | F | V |

💡 À partir d'une prémisse **fausse**, l'implication est toujours **vraie**.

**Exemple** : « 1 > 2 ⇒ 3 = 4 » est **vraie**.`,
    },
    {
      title: 'Réciproque et contraposée',
      content:
`# À partir de P ⇒ Q

- **Réciproque** : Q ⇒ P
- **Contraposée** : ¬Q ⇒ ¬P
- **Inverse** : ¬P ⇒ ¬Q

✅ Une implication est **équivalente à sa contraposée**.
❌ Elle n'est **pas** équivalente à sa réciproque.

**Exemple** : « Si x > 5 alors x > 2 »
- Contraposée : « Si x ≤ 2 alors x ≤ 5 » (vraie aussi)
- Réciproque : « Si x > 2 alors x > 5 » (fausse : x = 3)`,
    },
    {
      title: 'L\'équivalence ⇔',
      content:
`# L'**équivalence** : P ⇔ Q (« P si et seulement si Q »)

Elle est vraie quand **P et Q ont la même valeur de vérité**.

| P | Q | P ⇔ Q |
|:---:|:---:|:---:|
| V | V | **V** |
| V | F | F |
| F | V | F |
| F | F | **V** |

P ⇔ Q signifie que **P ⇒ Q** et **Q ⇒ P** sont vraies en même temps.`,
    },
    {
      title: 'Construire une table de vérité',
      content:
`# Table de vérité d'une formule composée

**Méthode** :
1. Lister toutes les combinaisons de valeurs (2 propositions → **4 lignes**).
2. Calculer les parties simples (¬P, ¬Q…).
3. Calculer les connecteurs, du plus interne au plus externe.

**Exemple** : ¬(P ∧ Q)

| P | Q | P ∧ Q | ¬(P ∧ Q) |
|:---:|:---:|:---:|:---:|
| V | V | V | F |
| V | F | F | V |
| F | V | F | V |
| F | F | F | V |`,
    },
    {
      title: 'Lois de De Morgan',
      content:
`# Lois de **De Morgan**

- ¬(P ∧ Q) ⇔ **¬P ∨ ¬Q**
- ¬(P ∨ Q) ⇔ **¬P ∧ ¬Q**
- ¬(P ⇒ Q) ⇔ **P ∧ ¬Q**

On les vérifie en comparant les tables de vérité : les colonnes sont **identiques**.`,
    },
    {
      title: 'Tautologie et contradiction',
      content:
`# Tautologie et contradiction

- **Tautologie** : formule **toujours vraie** (colonne finale : que des V).
  Exemple : P ∨ ¬P
- **Contradiction** : formule **toujours fausse** (que des F).
  Exemple : P ∧ ¬P

| P | ¬P | P ∨ ¬P | P ∧ ¬P |
|:---:|:---:|:---:|:---:|
| V | F | V | F |
| F | V | V | F |`,
    },
    {
      title: 'Récapitulatif',
      content:
`# À retenir

- **¬P** : inverse la valeur de P
- **P ∧ Q** : vraie ⇔ les deux sont vraies
- **P ∨ Q** : fausse ⇔ les deux sont fausses
- **P ⇒ Q** : fausse ⇔ P vraie et Q fausse
- **P ⇔ Q** : vraie ⇔ même valeur de vérité
- Une implication ⇔ sa **contraposée**
- Une table à 2 propositions a **4 lignes**`,
    },
  ];

  /* ---------- Générateurs d'exercices ---------- */
  const generators = {
    /* 1. Évaluer un connecteur avec des valeurs données */
    evaluerConnecteur() {
      const op = pick(Object.keys(OPS));
      const p = Math.random() < 0.5;
      const q = Math.random() < 0.5;
      const res = OPS[op](p, q);
      return buildExercise({
        type: 'evaluerConnecteur',
        question: `Soit **P = ${VF(p)}** et **Q = ${VF(q)}**. Quelle est la valeur de vérité de **P ${op} Q** ?`,
        correct: word(res),
        wrongs: [word(!res)],
        steps: [
          `On identifie le connecteur : **${op}**, la ${OP_NAMES[op]}.`,
          `Règle : ${OP_RULES[op]}`,
          `On remplace : ${VF(p)} ${op} ${VF(q)} = **${VF(res)}**.`,
        ],
        timeLimit: 30,
      });
    },

    /* 2. Évaluer une formule composée */
    formuleComposee() {
      const bank = [
        ['¬P ∧ Q', (p, q) => !p && q],
        ['P ∨ ¬Q', (p, q) => p || !q],
        ['¬(P ∧ Q)', (p, q) => !(p && q)],
        ['¬(P ∨ Q)', (p, q) => !(p || q)],
        ['P ⇒ ¬Q', (p, q) => !p || !q],
        ['¬P ⇔ Q', (p, q) => !p === q],
        ['(P ∨ Q) ∧ ¬P', (p, q) => (p || q) && !p],
        ['¬P ⇒ Q', (p, q) => p || q],
      ];
      const [formula, fn] = pick(bank);
      const p = Math.random() < 0.5;
      const q = Math.random() < 0.5;
      const res = fn(p, q);
      const substituted = formula.replace(/P/g, VF(p)).replace(/Q/g, VF(q));
      return buildExercise({
        type: 'formuleComposee',
        question: `Pour **P = ${VF(p)}** et **Q = ${VF(q)}**, quelle est la valeur de **${formula}** ?`,
        correct: word(res),
        wrongs: [word(!res)],
        steps: [
          `On remplace P et Q par leurs valeurs : **${substituted}**.`,
          'On calcule d\'abord les négations (¬), puis les parenthèses, puis les autres connecteurs.',
          `Résultat : **${VF(res)}**.`,
        ],
        timeLimit: 40,
      });
    },

    /* 3. Implication entre deux inégalités numériques */
    implicationNumerique() {
      const a = rnd(1, 9), b = rnd(1, 9), c = rnd(1, 9), d = rnd(1, 9);
      const p = a > b;
      const q = c > d;
      const res = !p || q;
      return buildExercise({
        type: 'implicationNumerique',
        question: `L'implication « **${a} > ${b} ⇒ ${c} > ${d}** » est-elle vraie ou fausse ?`,
        correct: word(res),
        wrongs: [word(!res)],
        steps: [
          `P : « ${a} > ${b} » est **${word(p)}**.`,
          `Q : « ${c} > ${d} » est **${word(q)}**.`,
          'Rappel : P ⇒ Q est fausse seulement si P est vraie et Q est fausse.',
          `Donc P ⇒ Q est **${word(res)}**.`,
        ],
        timeLimit: 40,
      });
    },

    /* 4. Négation d'une formule (De Morgan) */
    negationFormule() {
      const bank = [
        { f: 'P ∧ Q', neg: '¬P ∨ ¬Q', wrong: ['¬P ∧ ¬Q', 'P ∨ Q', '¬P ∨ Q'], law: '¬(P ∧ Q) ⇔ ¬P ∨ ¬Q' },
        { f: 'P ∨ Q', neg: '¬P ∧ ¬Q', wrong: ['¬P ∨ ¬Q', 'P ∧ Q', '¬P ∧ Q'], law: '¬(P ∨ Q) ⇔ ¬P ∧ ¬Q' },
        { f: 'P ⇒ Q', neg: 'P ∧ ¬Q', wrong: ['¬P ⇒ ¬Q', '¬P ∧ Q', 'P ⇒ ¬Q'], law: '¬(P ⇒ Q) ⇔ P ∧ ¬Q' },
      ];
      const item = pick(bank);
      return buildExercise({
        type: 'negationFormule',
        question: `Quelle est la négation de **${item.f}** ?`,
        correct: item.neg,
        wrongs: item.wrong,
        steps: [
          'On applique les lois de De Morgan (et la négation d\'une implication).',
          `**${item.law}**`,
          `La bonne réponse est **${item.neg}**.`,
        ],
        timeLimit: 40,
      });
    },

    /* 5. Contraposée d'une implication */
    contraposee() {
      const bank = [
        { P: 'x > 5', Q: 'x > 2', nP: 'x ≤ 5', nQ: 'x ≤ 2' },
        { P: 'n est divisible par 6', Q: 'n est pair', nP: 'n n\'est pas divisible par 6', nQ: 'n est impair' },
        { P: 'ABCD est un carré', Q: 'ABCD est un rectangle', nP: 'ABCD n\'est pas un carré', nQ: 'ABCD n\'est pas un rectangle' },
        { P: 'x est un multiple de 10', Q: 'x est un multiple de 5', nP: 'x n\'est pas un multiple de 10', nQ: 'x n\'est pas un multiple de 5' },
      ];
      const t = pick(bank);
      const correct = `Si ${t.nQ}, alors ${t.nP}`;
      return buildExercise({
        type: 'contraposee',
        question: `Quelle est la **contraposée** de « Si ${t.P}, alors ${t.Q} » ?`,
        correct,
        wrongs: [
          `Si ${t.Q}, alors ${t.P}`, // réciproque
          `Si ${t.nP}, alors ${t.nQ}`, // inverse
          `Si ${t.P}, alors ${t.nQ}`,
        ],
        steps: [
          'La contraposée de P ⇒ Q est **¬Q ⇒ ¬P**.',
          `Ici : P = « ${t.P} » et Q = « ${t.Q} ».`,
          `¬Q = « ${t.nQ} » et ¬P = « ${t.nP} ».`,
          `Contraposée : **${correct}**.`,
        ],
        timeLimit: 45,
      });
    },

    /* 6. Compter les lignes vraies d'une table de vérité */
    compterLignesVraies() {
      const bank = [
        ['P ∧ Q', (p, q) => p && q],
        ['P ∨ Q', (p, q) => p || q],
        ['P ⇒ Q', (p, q) => !p || q],
        ['P ⇔ Q', (p, q) => p === q],
        ['¬P ∨ Q', (p, q) => !p || q],
        ['P ∧ ¬Q', (p, q) => p && !q],
        ['¬(P ∨ Q)', (p, q) => !(p || q)],
      ];
      const [formula, fn] = pick(bank);
      const rows = [[true, true], [true, false], [false, true], [false, false]];
      const count = rows.filter(([p, q]) => fn(p, q)).length;
      const wrongs = shuffle([0, 1, 2, 3, 4].filter((n) => n !== count)).slice(0, 3).map(String);
      return buildExercise({
        type: 'compterLignesVraies',
        question: `Dans la table de vérité de **${formula}** (4 lignes), combien de lignes valent **V** ?`,
        correct: String(count),
        wrongs,
        steps: [
          'On calcule la formule pour les 4 combinaisons (P, Q) : VV, VF, FV, FF.',
          ...rows.map(([p, q]) => `P = ${VF(p)}, Q = ${VF(q)} → **${VF(fn(p, q))}**`),
          `Nombre de V : **${count}**.`,
        ],
        timeLimit: 50,
      });
    },

    /* 7. Reconnaître une tautologie */
    tautologie() {
      const bank = [
        ['P ∨ ¬P', (p) => p || !p],
        ['P ⇒ P', (p) => !p || p],
        ['(P ∧ Q) ⇒ P', (p, q) => !(p && q) || p],
        ['P ⇒ (P ∨ Q)', (p, q) => !p || (p || q)],
        ['P ∧ ¬P', (p) => p && !p],
        ['P ⇔ ¬P', (p) => p === !p],
        ['P ∨ Q', (p, q) => p || q],
        ['P ⇒ (P ∧ Q)', (p, q) => !p || (p && q)],
        ['P ∧ Q', (p, q) => p && q],
      ];
      const rows = [[true, true], [true, false], [false, true], [false, false]];
      const isTaut = (fn) => rows.every(([p, q]) => fn(p, q));
      const taut = pick(bank.filter(([, fn]) => isTaut(fn)));
      const wrongs = shuffle(bank.filter(([, fn]) => !isTaut(fn))).slice(0, 3);
      const counter = (fn) => rows.find(([p, q]) => !fn(p, q));
      const [cp, cq] = counter(wrongs[0][1]);
      return buildExercise({
        type: 'tautologie',
        question: 'Laquelle de ces formules est une **tautologie** (toujours vraie) ?',
        correct: taut[0],
        wrongs: wrongs.map((w) => w[0]),
        steps: [
          'Une tautologie vaut V sur **toutes** les lignes de sa table de vérité.',
          `**${taut[0]}** vaut V pour les 4 combinaisons de (P, Q).`,
          `Les autres échouent : par exemple **${wrongs[0][0]}** vaut F pour P = ${VF(cp)}, Q = ${VF(cq)}.`,
        ],
        timeLimit: 60,
      });
    },
  };

  const generatorList = Object.values(generators);

  /* Génère n exercices en variant les types */
  function generateExercises(n = 8) {
    const out = [];
    let pool = [];
    while (out.length < n) {
      if (pool.length === 0) pool = shuffle(generatorList);
      out.push(pool.pop()());
    }
    return out;
  }

  /* ---------- Objet leçon exposé à l'application ---------- */
  const LESSON = {
    course: 'Logique mathématique',
    title: 'Leçon 1 : Connecteurs logiques et tables de vérité',
    slides,
    understoodPrompt: 'As-tu compris cette leçon ?',
    exercises: {
      generators, // un générateur par type d'exercice
      generate: generateExercises, // generate(n) → tableau d'exercices
      generateOne: () => pick(generatorList)(),
    },
  };

  // Adaptateur pour le moteur EasyMath : ce fichier reste aussi utilisable
  // seul via EasyMathLesson, mais lance la leçon quand EM est fourni.
  if (typeof EM !== 'undefined' && EM && typeof EM.lesson === 'function') {
    EM.lesson({
      slides: slides.map((slide) => slide.content),
      rounds: 8,
      exercises: [{
        type: 'Logique mathématique',
        generate() {
          const exercise = generateExercises(1)[0];
          return {
            type: exercise.type,
            question: exercise.question,
            choices: exercise.choices,
            correctIndex: exercise.answer,
            steps: exercise.steps,
            timeout: exercise.timeLimit,
          };
        },
      }],
    });
  }

  const root = typeof self !== 'undefined' ? self : window;
  root.EasyMathLesson = LESSON;
  return LESSON;
})();
