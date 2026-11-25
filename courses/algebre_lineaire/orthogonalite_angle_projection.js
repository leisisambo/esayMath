/* EasyMath — Orthogonalité, angles et projections dans R² */
const slides = [
  String.raw`# Produit scalaire dans le plan

Pour deux vecteurs $\vec{u}=(x_1,y_1)$ et $\vec{v}=(x_2,y_2)$, leur **produit scalaire** est

$$\vec{u}\cdot\vec{v}=x_1x_2+y_1y_2.$$

Le résultat est un nombre réel. Le produit scalaire est commutatif : $\vec{u}\cdot\vec{v}=\vec{v}\cdot\vec{u}$.`,
  String.raw`# Orthogonalité

Deux vecteurs sont **orthogonaux** lorsque leur produit scalaire est nul :

$$\vec{u}\perp\vec{v}\quad\Longleftrightarrow\quad\vec{u}\cdot\vec{v}=0.$$

Exemple : $(3,4)\cdot(4,-3)=12-12=0$, donc ces vecteurs sont perpendiculaires. Le vecteur nul a un produit scalaire nul avec tous les vecteurs.`,
  String.raw`# Angle entre deux vecteurs

Pour deux vecteurs non nuls, l’angle $\theta$ compris entre eux vérifie

$$\cos(\theta)=\frac{\vec{u}\cdot\vec{v}}{\|\vec{u}\|\,\|\vec{v}\|},\qquad 0^\circ\leq\theta\leq180^\circ.$$

Un produit scalaire positif donne un angle aigu, un produit nul un angle droit, et un produit négatif un angle obtus.`,
  String.raw`# Projection orthogonale d’un vecteur

La projection de $\vec{v}$ sur la direction d’un vecteur non nul $\vec{u}$ est

$$\operatorname{proj}_{\vec{u}}(\vec{v})=\frac{\vec{u}\cdot\vec{v}}{\vec{u}\cdot\vec{u}}\vec{u}.$$

Cette projection est parallèle à $\vec{u}$. Le vecteur $\vec{v}-\operatorname{proj}_{\vec{u}}(\vec{v})$ lui est orthogonal : il représente la partie perpendiculaire.`,
  String.raw`# Projection d’un point sur une droite

Soit une droite passant par $A$ et dirigée par un vecteur non nul $\vec{u}$. Pour projeter un point $P$ sur cette droite, on projette le vecteur $\overrightarrow{AP}$ sur $\vec{u}$.

Le pied $H$ de la perpendiculaire vérifie

$$\overrightarrow{AH}=\operatorname{proj}_{\vec{u}}(\overrightarrow{AP}),\qquad H=A+\overrightarrow{AH}.$$

La distance de $P$ à la droite est $PH=\|\overrightarrow{AP}-\overrightarrow{AH}\|$.`,
  String.raw`# Une méthode de calcul

1. Calcule le produit scalaire en multipliant les coordonnées correspondantes puis en additionnant.
2. Pour tester l’orthogonalité, vérifie si ce produit vaut zéro.
3. Pour un angle, calcule les deux normes puis utilise la formule du cosinus.
4. Pour une projection, calcule le coefficient $\frac{\vec{u}\cdot\vec{v}}{\vec{u}\cdot\vec{u}}$, puis multiplie chaque coordonnée de $\vec{u}$ par ce coefficient.

On ne projette jamais sur le vecteur nul : le dénominateur serait nul.`
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
const fmt = (x) => String(x).replace('-', '−');
const v = (x, y) => `(${fmt(x)}, ${fmt(y)})`;
const levels = [
  {
    name: 'Niveau 1 — Calculer un produit scalaire',
    description: 'Appliquer la formule coordonnée par coordonnée et interpréter le résultat.', rounds: 5,
    exercises: [
      {
        type: 'Calculer un produit scalaire',
        generate() {
          const a = rnd(-8, 8), b = rnd(-8, 8), c = rnd(-8, 8), d = rnd(-8, 8), dot = a * c + b * d;
          return { question: `Calculer $${v(a, b)}\\cdot${v(c, d)}$.`, answer: String(dot), distractors: [a * c - b * d, (a + b) * (c + d), a * d + b * c],
            steps: [`On multiplie les coordonnées correspondantes : $${a}\\times${c}+${b}\\times${d}=${a * c}+${b * d}=${dot}$.`] };
        }
      },
      {
        type: 'Lire un produit scalaire simple',
        generate() {
          const x = rnd(-10, 10), y = rnd(-10, 10);
          return { question: `Quel est $${v(1, 0)}\\cdot${v(x, y)}$ ?`, answer: String(x), distractors: [y, x + y, -x],
            steps: [`$${v(1, 0)}\\cdot${v(x, y)}=1\\times${x}+0\\times${y}=${x}$.`] };
        }
      }
    ]
  },
  {
    name: 'Niveau 2 — Reconnaître l’orthogonalité',
    description: 'Décider si deux vecteurs sont perpendiculaires et trouver une coordonnée manquante.', rounds: 5,
    exercises: [
      {
        type: 'Tester l’orthogonalité',
        generate() {
          const a = rnd(-7, 7) || 2, b = rnd(-7, 7) || 1, perpendicular = Math.random() < 0.5;
          const c = perpendicular ? -b : a, d = perpendicular ? a : b;
          const dot = a * c + b * d;
          return { question: `Les vecteurs $${v(a, b)}$ et $${v(c, d)}$ sont-ils orthogonaux ?`, choices: ['Oui', 'Non'], correctIndex: perpendicular ? 0 : 1,
            steps: [`Leur produit scalaire vaut $${a}\\times${c}+${b}\\times${d}=${dot}$. ${perpendicular ? 'Il vaut zéro, donc les vecteurs sont orthogonaux.' : 'Il est non nul, donc les vecteurs ne sont pas orthogonaux.'}`] };
        }
      },
      {
        type: 'Trouver une coordonnée pour obtenir l’orthogonalité',
        generate() {
          const a = rnd(-7, 7) || 2, b = rnd(-7, 7) || 1, k = rnd(-5, 5) || 2, x = b * k, y = -a * k;
          return { question: `Trouver $y$ pour que les vecteurs $${v(a, b)}$ et $(${x}, y)$ soient orthogonaux.`, answer: String(y), distractors: [-y, a * x, -(b * x) / a],
            steps: [`Il faut que le produit scalaire soit nul : $${a}\\times${x}+${b}y=0$. Donc $y=-\\frac{${a * x}}{${b}}=${y}$.`] };
        }
      }
    ]
  },
  {
    name: 'Niveau 3 — Calculer un angle',
    description: 'Utiliser le produit scalaire et les normes pour obtenir un angle en degrés.', rounds: 5,
    exercises: [
      {
        type: 'Calculer l’angle entre deux vecteurs',
        generate() {
          const pairs = [[1, 0, 0, 1], [1, 0, -1, 0], [1, 0, 1, 1], [1, 0, -1, 1], [1, 0, 3, 4], [3, 4, 4, -3], [2, 0, 1, 1]];
          const [a, b, c, d] = pick(pairs);
          const dot = a * c + b * d, normU = Math.hypot(a, b), normV = Math.hypot(c, d);
          const angle = Math.round(Math.acos(Math.max(-1, Math.min(1, dot / (normU * normV)))) * 180 / Math.PI);
          return { question: `À un degré près, quel est l’angle entre $${v(a, b)}$ et $${v(c, d)}$ ?`, answer: angle + '°',
            distractors: [(180 - angle) + '°', (angle + 15) % 180 + '°', Math.max(0, angle - 15) + '°'],
            steps: [`Le produit scalaire vaut ${dot}, et les normes valent $${normU.toFixed(2)}$ et $${normV.toFixed(2)}$. Ainsi $\\cos(\\theta)=\\frac{${dot}}{${(normU * normV).toFixed(2)}}$, donc $\\theta\\approx${angle}^\\circ$.`] };
        }
      }
    ]
  },
  {
    name: 'Niveau 4 — Projeter un vecteur',
    description: 'Calculer une projection vectorielle à partir de la formule.', rounds: 5,
    exercises: [
      {
        type: 'Calculer une projection vectorielle',
        generate() {
          const u = pick([[3, 4], [4, 3], [5, 12], [8, 15]]), t = rnd(-5, 5), s = rnd(-4, 4) || 2;
          const perp = [-u[1], u[0]], target = [t * u[0] + s * perp[0], t * u[1] + s * perp[1]], answer = v(t * u[0], t * u[1]);
          return { question: `Calculer $\\operatorname{proj}_{${v(...u)}}(${v(...target)})$.`, answer,
            distractors: [v(...target), v(-t * u[0], -t * u[1]), v(t * u[0] + s * perp[0], t * u[1])],
            steps: [`Le coefficient de projection vaut $\\frac{${u[0]}\\times${target[0]}+${u[1]}\\times${target[1]}}{${u[0]}^2+${u[1]}^2}=${t}$. On multiplie $${v(...u)}$ par ${t} : la projection est $${answer}$.`] };
        }
      }
    ]
  },
  {
    name: 'Niveau 5 — Projections et problèmes de synthèse',
    description: 'Combiner plusieurs vecteurs et utiliser les projections pour calculer une distance à une droite.', rounds: 5,
    exercises: [
      {
        type: 'Projeter une combinaison de vecteurs',
        generate() {
          const u = pick([[3, 4], [4, 3], [5, 12]]), perp = [-u[1], u[0]];
          const coeffs = [rnd(-4, 4), rnd(-4, 4), rnd(-4, 4)];
          const vectors = coeffs.map((k, i) => [k * u[0] + (i + 1) * perp[0], k * u[1] + (i + 1) * perp[1]]);
          const [a, b, c] = vectors, [ka, kb, kc] = coeffs;
          const projectedCoefficient = 2 * kb - kc + 3 * ka;
          const ans = v(projectedCoefficient * u[0], projectedCoefficient * u[1]);
          const combined = [0, 1].map(i => 2 * b[i] - c[i] + 3 * a[i]);
          return { question: `Calculer $\\operatorname{proj}_{${v(...u)}}(2\\vec{b}-\\vec{c}+3\\vec{a})$ avec $\\vec{a}=${v(...a)}$, $\\vec{b}=${v(...b)}$ et $\\vec{c}=${v(...c)}$.`, answer: ans,
            distractors: [v(...combined), v(-projectedCoefficient * u[0], -projectedCoefficient * u[1]), v(projectedCoefficient * u[1], projectedCoefficient * u[0])],
            steps: [`Par linéarité, le coefficient parallèle à $${v(...u)}$ dans $2\\vec{b}-\\vec{c}+3\\vec{a}$ vaut $2\\times${kb}-${kc}+3\\times${ka}=${projectedCoefficient}$. La projection est donc ${projectedCoefficient} fois $${v(...u)}$, soit $${ans}$.`] };
        }
      },
      {
        type: 'Distance d’un point à une droite',
        generate() {
          const u = pick([[3, 4], [4, 3], [5, 12]]), c = rnd(-5, 5) || 2, A = [rnd(-5, 5), rnd(-5, 5)];
          const perp = [-u[1], u[0]], P = [A[0] + c * perp[0], A[1] + c * perp[1]], norm = Math.hypot(...u), answer = Math.abs(c) * norm;
          return { question: `Une droite passe par $A=${v(...A)}$ et a pour direction $${v(...u)}$. Le point $P=${v(...P)}$ est décalé perpendiculairement à cette droite. Calculer sa distance à la droite.`, answer: answer,
            distractors: [Math.abs(c), answer + norm, Math.abs(c) + norm],
            steps: [`Le décalage perpendiculaire est $${c}(-${u[1]},${u[0]})$. Sa longueur vaut $|${c}|\\sqrt{${u[0]}^2+${u[1]}^2}=${answer}$.`] };
        }
      }
    ]
  }
];

EM.lesson({ slides, series: levels });
