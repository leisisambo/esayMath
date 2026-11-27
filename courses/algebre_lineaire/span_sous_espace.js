/* EasyMath — Leçon : span et sous-espaces vectoriels dans R² */
const slides = [
  String.raw`# Combinaisons linéaires et span

À partir de vecteurs $\vec{u}_1,\ldots,\vec{u}_p$, on forme des combinaisons linéaires en les multipliant par des nombres puis en les additionnant. Par exemple, $2\vec{u}-3\vec{v}$ est une combinaison linéaire de $\vec{u}$ et $\vec{v}$.

Le **span** (ou sous-espace engendré) de ces vecteurs, noté $\operatorname{Span}(\vec{u}_1,\ldots,\vec{u}_p)$, est l’ensemble de toutes leurs combinaisons linéaires, avec des coefficients réels.`,
  String.raw`# Le span d’un vecteur dans le plan

Si $\vec{u}\neq\vec{0}$ dans $\mathbb{R}^2$, alors

$$\operatorname{Span}(\vec{u})=\{t\vec{u}\mid t\in\mathbb{R}\}$$

est la droite passant par l’origine et dirigée par $\vec{u}$. Si $\vec{u}=\vec{0}$, son span est seulement $\{\vec{0}\}$. Une droite qui ne passe pas par l’origine n’est donc pas le span d’un vecteur.`,
  String.raw`# Le span de deux vecteurs

Dans $\mathbb{R}^2$, deux vecteurs non colinéaires engendrent tout le plan. Si deux vecteurs non nuls sont colinéaires, ils engendrent la même droite passant par l’origine.

Pour $\vec{u}=(a,b)$ et $\vec{v}=(c,d)$, le déterminant $ad-bc$ permet de trancher : s’il est non nul, les vecteurs ne sont pas colinéaires et leur span est $\mathbb{R}^2$ ; s’il est nul, leur span est une droite (ou $\{\vec{0}\}$ si les deux sont nuls).`,
  String.raw`# Reconnaître un sous-espace vectoriel

Un sous-ensemble $F$ de $\mathbb{R}^2$ est un **sous-espace vectoriel** s’il contient le vecteur nul et reste stable par addition et multiplication par un réel :

- si $\vec{u},\vec{v}\in F$, alors $\vec{u}+\vec{v}\in F$ ;
- si $\vec{u}\in F$ et $\lambda\in\mathbb{R}$, alors $\lambda\vec{u}\in F$.

Dans le plan, $\mathbb{R}^2$, $\{\vec{0}\}$ et les droites passant par l’origine sont des sous-espaces. Une droite décalée ou une réunion de deux axes ne l’est pas.`,
  String.raw`# Un span est le plus petit sous-espace

Le span d’une famille de vecteurs est le plus petit sous-espace vectoriel qui contient tous ces vecteurs. Il est automatiquement stable par addition et par multiplication par un scalaire.

Exemple : si $\vec{u}=(1,0)$ et $\vec{v}=(0,1)$, tout $(x,y)$ s’écrit $x\vec{u}+y\vec{v}$ : leur span est donc tout $\mathbb{R}^2$. Avec $\vec{w}=(2,0)$ à la place de $\vec{v}$, les vecteurs restent sur l’axe horizontal : leur span est cette droite.`,
  String.raw`# Méthode pour un exercice

1. Écris une combinaison générale $\lambda_1\vec{u}_1+\cdots+\lambda_p\vec{u}_p$.
2. Pour savoir si un vecteur appartient au span, cherche des coefficients qui donnent ses coordonnées.
3. Pour deux vecteurs du plan, calcule le déterminant pour savoir s’ils engendrent une droite ou tout le plan.
4. Pour tester un sous-espace, vérifie le vecteur nul et la stabilité par addition et multiplication par un réel.`
];

const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (xs) => xs[rnd(0, xs.length - 1)];
const shuffle = (xs) => {
  const out = xs.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = rnd(0, i);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};
const fmt = (n) => String(n).replace('-', '−');
const v = (x, y) => `(${fmt(x)}, ${fmt(y)})`;
const make = (question, answer, distractors, steps, type = 'Exercice sur les sous-espaces') => ({
  type,
  generate() {
    const correct = String(answer());
    const choices = [correct];
    for (const wrong of distractors().map(String)) {
      if (!choices.includes(wrong)) choices.push(wrong);
      if (choices.length === 4) break;
    }
    let candidate = 1;
    while (choices.length < 4) {
      const wrong = 'Aucune de ces réponses (' + candidate++ + ')';
      if (!choices.includes(wrong)) choices.push(wrong);
    }
    const arranged = shuffle(choices);
    return { question: question(), choices: arranged, correctIndex: arranged.indexOf(correct), steps: steps() };
  }
});

const levels = [
  {
    name: 'Niveau 1 — Comprendre les combinaisons',
    description: 'Lire la notation Span et reconnaître une combinaison linéaire.', rounds: 5,
    exercises: [
      make(
        () => pick([
          'Laquelle de ces expressions est une combinaison linéaire de $\\vec{u}$ et $\\vec{v}$ ?',
          'Choisissez une combinaison linéaire de $\\vec{u}$ et $\\vec{v}$.',
          'Quelle expression est construite en additionnant des multiples de $\\vec{u}$ et $\\vec{v}$ ?',
          'Quelle expression appartient à la forme $a\\vec{u}+b\\vec{v}$ ?',
          'Repérez l’expression qui combine linéairement $\\vec{u}$ et $\\vec{v}$. '
        ]),
        () => '$2\\vec{u}-3\\vec{v}$',
        () => ['$\\vec{u}\\times\\vec{v}$', '$\\vec{u}+\\vec{v}+1$', '$\\vec{u}^2+\\vec{v}$'],
        () => ['Une combinaison linéaire additionne des multiples scalaires des vecteurs : les coefficients sont des nombres réels.'],
        'Identifier une combinaison linéaire'
      ),
      make(
        () => pick([
          'Que représente $\\operatorname{Span}(\\vec{u},\\vec{v})$ ?',
          'Comment décrire $\\operatorname{Span}(\\vec{u},\\vec{v})$ ?',
          'Quels vecteurs trouve-t-on dans $\\operatorname{Span}(\\vec{u},\\vec{v})$ ?',
          'Quelle est la définition du span de $\\vec{u}$ et $\\vec{v}$ ?',
          'Que contient l’ensemble engendré par $\\vec{u}$ et $\\vec{v}$ ?'
        ]),
        () => 'Toutes les combinaisons $a\\vec{u}+b\\vec{v}$ avec $a,b\\in\\mathbb{R}$',
        () => ['Seulement $\\vec{u}+\\vec{v}$', 'Les vecteurs de longueur 1', 'Les deux vecteurs $\\vec{u}$ et $\\vec{v}$ uniquement'],
        () => ['Le span contient toutes les combinaisons linéaires possibles, donc les coefficients peuvent être n’importe quels réels.'],
        'Comprendre la notation Span'
      )
    ]
  },
  {
    name: 'Niveau 2 — Décrire un span',
    description: 'Déterminer le span d’un vecteur nul ou non nul et tester l’appartenance à une droite vectorielle.', rounds: 5,
    exercises: [
      {
        type: 'Décrire le span d’un vecteur',
        generate() {
          const x = rnd(-5, 5), y = rnd(-5, 5), zero = x === 0 && y === 0;
          const answer = zero ? 'Le singleton {0}' : 'Une droite passant par l’origine';
          return { question: `Quel est $\\operatorname{Span}(${v(x, y)})$ dans $\\mathbb{R}^2$ ?`, choices: [answer, zero ? 'Tout le plan' : 'Une droite ne passant pas par l’origine'], correctIndex: 0,
            distractors: [zero ? 'Une droite passant par l’origine' : 'Tout le plan', 'Un cercle centré à l’origine'],
            steps: [zero ? 'Tout multiple du vecteur nul reste nul : le span est {0}.' : `Tous les multiples $t${v(x, y)}$ sont sur la droite de direction ${v(x, y)}$, qui passe par l’origine.`] };
        }
      },
      {
        type: 'Tester l’appartenance à un span',
        generate() {
          const x = rnd(-5, 5) || 2, y = rnd(-5, 5) || 1, k = rnd(-4, 4), belongs = Math.random() < 0.5;
          const target = belongs ? [k * x, k * y] : [k * x + y, k * y - x];
          return { question: `Le vecteur ${v(target[0], target[1])} appartient-il à $\\operatorname{Span}(${v(x, y)})$ ?`, choices: ['Oui', 'Non'], correctIndex: belongs ? 0 : 1,
            steps: [`Les vecteurs sont colinéaires si leur déterminant est nul. Ici $${x}\\times${target[1]}-${y}\\times${target[0]}=${x * target[1] - y * target[0]}$, donc le vecteur ${belongs ? 'appartient' : 'n’appartient pas'} au span.`] };
        }
      }
    ]
  },
  {
    name: 'Niveau 3 — Déterminer la dimension du span',
    description: 'Utiliser le déterminant pour reconnaître une droite ou le plan entier.', rounds: 5,
    exercises: [
      {
        type: 'Déterminer le span de deux vecteurs',
        generate() {
          const x = rnd(-5, 5) || 1, y = rnd(-5, 5), k = rnd(-4, 4) || 2;
          const independent = Math.random() < 0.5;
          const second = independent ? [-y, x] : [k * x, k * y];
          const determinant = x * second[1] - y * second[0];
          const answer = determinant === 0 ? 'Une droite passant par l’origine' : 'Tout $\\mathbb{R}^2$';
          return { question: `Quel est le span de $\\vec{u}=${v(x, y)}$ et $\\vec{v}=${v(second[0], second[1])}$ ?`, choices: [answer, determinant === 0 ? 'Tout $\\mathbb{R}^2$' : 'Une droite passant par l’origine'], correctIndex: 0,
            distractors: ['Le singleton {0}', 'Une droite ne passant pas par l’origine'],
            steps: [`Le déterminant vaut $${x}\\times${second[1]}-${y}\\times${second[0]}=${determinant}$. ${determinant === 0 ? 'Il est nul : les vecteurs sont colinéaires et engendrent une droite.' : 'Il est non nul : les vecteurs ne sont pas colinéaires et engendrent tout le plan.'}`] };
        }
      }
    ]
  },
  {
    name: 'Niveau 4 — Reconnaître les sous-espaces',
    description: 'Tester le vecteur nul et les stabilités pour distinguer un sous-espace des autres ensembles.', rounds: 5,
    exercises: [
      {
        type: 'Tester si un ensemble est un sous-espace',
        generate() {
          const cases = [
            ['$F=\\{(x,y)\\mid y=2x\\}$', true, 'La droite passe par l’origine et est stable par addition et multiplication par un réel.'],
            ['$F=\\{(x,y)\\mid y=2x+1\\}$', false, 'Le vecteur nul ne vérifie pas $y=2x+1$ : la droite ne passe pas par l’origine.'],
            ['$F=\\{(x,0)\\mid x\\in\\mathbb{R}\\}$', true, 'C’est l’axe horizontal : il contient zéro et reste stable par les deux opérations.'],
            ['$F=\\{(x,y)\\mid xy=0\\}$', false, 'C’est la réunion des deux axes. $(1,0)$ et $(0,1)$ sont dedans, mais leur somme $(1,1)$ n’y est pas.'],
            ['$F=\\{(x,y)\\mid x\\geq0\\}$', false, 'Si $(1,0)$ appartient à F, son opposé $(-1,0)$ n’y appartient pas : la stabilité par scalaire échoue.']
          ];
          const [set, valid, explanation] = pick(cases);
          return { question: `L’ensemble $${set}$ est-il un sous-espace vectoriel de $\\mathbb{R}^2$ ?`, choices: ['Oui', 'Non'], correctIndex: valid ? 0 : 1, steps: [explanation] };
        }
      }
    ]
  },
  {
    name: 'Niveau 5 — Combinaisons et synthèse',
    description: 'Calculer des combinaisons à plusieurs termes et décider si des vecteurs engendrent le plan.', rounds: 5,
    exercises: [
      {
        type: 'Calculer une combinaison à plusieurs termes',
        generate() {
          const u = [rnd(-7, 7), rnd(-7, 7)], w = [rnd(-7, 7), rnd(-7, 7)];
          const b = [rnd(-7, 7), rnd(-7, 7)], z = [rnd(-7, 7), rnd(-7, 7)];
          const out = [2 * u[0] + 3 * b[0] - w[0] + 4 * z[0], 2 * u[1] + 3 * b[1] - w[1] + 4 * z[1]];
          const wrongSign = [2 * u[0] + 3 * b[0] + w[0] + 4 * z[0], 2 * u[1] + 3 * b[1] + w[1] + 4 * z[1]];
          const omitted = [2 * u[0] + 3 * b[0] - w[0] + z[0], 2 * u[1] + 3 * b[1] - w[1] + z[1]];
          const swapped = [out[1], out[0]];
          return { question: `Calculer $2\\vec{u}+3\\vec{b}-\\vec{w}+4\\vec{z}$ avec $\\vec{u}=${v(...u)}$, $\\vec{b}=${v(...b)}$, $\\vec{w}=${v(...w)}$ et $\\vec{z}=${v(...z)}$.`, answer: v(...out),
            distractors: [v(...wrongSign), v(...omitted), v(...swapped)],
            steps: [`On multiplie chaque vecteur par son coefficient : $2\\vec{u}=${v(2 * u[0], 2 * u[1])}$, $3\\vec{b}=${v(3 * b[0], 3 * b[1])}$, $-\\vec{w}=${v(-w[0], -w[1])}$ et $4\\vec{z}=${v(4 * z[0], 4 * z[1])}$.`, `On additionne composante par composante : $(${2 * u[0]}+${3 * b[0]}-${w[0]}+${4 * z[0]}, ${2 * u[1]}+${3 * b[1]}-${w[1]}+${4 * z[1]})=${v(...out)}$.`] };
        }
      },
      {
        type: 'Décider si deux vecteurs engendrent le plan',
        generate() {
          const u = [rnd(-6, 6) || 1, rnd(-6, 6)], k = rnd(-4, 4) || 2, independent = Math.random() < 0.5;
          const w = independent ? [-u[1], u[0]] : [k * u[0], k * u[1]];
          const det = u[0] * w[1] - u[1] * w[0], full = det !== 0;
          return { question: `Le span de $${v(...u)}$ et $${v(...w)}$ est-il tout $\\mathbb{R}^2$ ?`, choices: ['Oui', 'Non'], correctIndex: full ? 0 : 1,
            steps: [`Le déterminant vaut $${u[0]}\\times${w[1]}-${u[1]}\\times${w[0]}=${det}$. ${full ? 'Il est non nul : les vecteurs engendrent tout le plan.' : 'Il est nul : ils sont colinéaires et engendrent au plus une droite.'}`] };
        }
      }
    ]
  }
];

EM.lesson({ slides, series: levels, progressiveSeries: true });
