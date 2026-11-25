/* EasyMath — Leçon : les vecteurs du plan R² */
const slides = [
  String.raw`# Les vecteurs du plan

Dans le plan, un vecteur est caractérisé par une **direction**, un **sens** et une **longueur**. On le représente par une flèche. Deux flèches représentent le même vecteur si elles ont même direction, même sens et même longueur.

Dans un repère, on note un vecteur par ses coordonnées : $\vec{u}=(x,y)$. Le premier nombre donne le déplacement horizontal, le second le déplacement vertical.`,
  String.raw`# Coordonnées d’un vecteur

Si $A(x_A,y_A)$ et $B(x_B,y_B)$, alors

$$\overrightarrow{AB}=(x_B-x_A,y_B-y_A).$$

On soustrait les coordonnées du point de départ à celles du point d’arrivée. Par exemple, si $A(1,2)$ et $B(4,0)$, alors $\overrightarrow{AB}=(3,-2)$.`,
  String.raw`# Égalité et vecteur nul

Deux vecteurs du plan sont égaux si et seulement si leurs coordonnées sont égales composante par composante : $(a,b)=(c,d)$ exactement lorsque $a=c$ et $b=d$.

Le vecteur nul est $\vec{0}=(0,0)$. L’opposé de $\vec{u}=(x,y)$ est $-\vec{u}=(-x,-y)$ ; ainsi $\vec{u}+(-\vec{u})=\vec{0}$.`,
  String.raw`# Addition et soustraction

On additionne ou soustrait les coordonnées correspondantes :

$$ (a,b)+(c,d)=(a+c,b+d),\qquad (a,b)-(c,d)=(a-c,b-d). $$

L’addition est commutative et associative. Le vecteur nul est son élément neutre.`,
  String.raw`# Multiplication par un scalaire

Pour un nombre $k$, on multiplie chaque coordonnée par $k$ : $k(x,y)=(kx,ky)$. Si $k$ est négatif, le sens du vecteur est inversé.

La multiplication est distributive : $k(\vec{u}+\vec{v})=k\vec{u}+k\vec{v}$ et $(k+l)\vec{u}=k\vec{u}+l\vec{u}$. On a aussi $1\vec{u}=\vec{u}$ et $0\vec{u}=\vec{0}$.`,
  String.raw`# Norme et distance

La norme de $\vec{u}=(x,y)$ est sa longueur : $\|\vec{u}\|=\sqrt{x^2+y^2}$. La distance entre deux points $A$ et $B$ est la norme de $\overrightarrow{AB}$.

Exemple : si $\vec{u}=(3,4)$, alors $\|\vec{u}\|=5$.`,
  String.raw`# Vecteurs et parallélogrammes

Les coordonnées permettent de résoudre des problèmes géométriques sans mesurer sur un dessin. Si $A,B,C,D$ sont les sommets consécutifs d’un parallélogramme, alors $\overrightarrow{AD}=\overrightarrow{BC}$ et $D=A+C-B$ en coordonnées.

Pour vérifier un résultat, on traduit d’abord la situation par une relation entre vecteurs, puis on calcule coordonnée par coordonnée.`
];

const planeVisual = await EM.visual.plane({ x: 3, y: 2, label: 'u', title: 'Le plan repéré et les coordonnées du vecteur u' });
const arrowVisual = await EM.visual.vectorArrow({ x: 3, y: -2, label: 'AB', title: 'Le vecteur AB va du point A vers le point B' });
slides[0] += '\n\n' + planeVisual;
slides[1] += '\n\n' + arrowVisual;

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (items) => items[rnd(0, items.length - 1)];
const shuffle = (items) => {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = rnd(0, i);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};
const fmt = (v) => String(v).replace('-', '−');
const pair = (x, y) => String.raw`(${fmt(x)}, ${fmt(y)})`;
const vector = (x, y) => `\\begin{pmatrix}${fmt(x)}\\\\${fmt(y)}\\end{pmatrix}`;

const levels = [
  {
    name: 'Niveau 1 — Découvrir les coordonnées',
    description: 'Lire les coordonnées, reconnaître l’égalité de deux vecteurs et calculer un déplacement simple.',
    rounds: 5,
    exercises: [
      {
        type: 'Lire les coordonnées',
        generate() {
          const x = rnd(-8, 8), y = rnd(-8, 8), answer = pair(x, y);
          return { question: `Quelles sont les coordonnées du vecteur $\\vec{u}=${vector(x, y)}$ ?`, answer,
            distractors: [pair(y, x), pair(-x, y), pair(x, -y)],
            steps: [`La première coordonnée est l’abscisse ${fmt(x)} et la seconde l’ordonnée ${fmt(y)} : $\\vec{u}=${answer}$.`] };
        }
      },
      {
        type: 'Calculer un vecteur entre deux points',
        generate() {
          const ax = rnd(-6, 6), ay = rnd(-6, 6), dx = rnd(-8, 8), dy = rnd(-8, 8);
          const bx = ax + dx, by = ay + dy, ans = pair(dx, dy);
          return { question: `Soient $A${pair(ax, ay)}$ et $B${pair(bx, by)}$. Calculer $\\overrightarrow{AB}$.`, answer: ans,
            distractors: [pair(-dx, -dy), pair(bx, ay), pair(ax, by)],
            steps: [`On fait arrivée moins départ : $\\overrightarrow{AB}=(${bx}-${ax},${by}-${ay})=${ans}$.`] };
        }
      },
      {
        type: 'Tester l’égalité de deux vecteurs',
        generate() {
          const x = rnd(-7, 7), y = rnd(-7, 7), equal = Math.random() < 0.5;
          const other = equal ? [x, y] : [x + pick([-3, -2, -1, 1, 2, 3]), y];
          return {
            question: `Les vecteurs $${pair(x, y)}$ et $${pair(other[0], other[1])}$ sont-ils égaux ?`,
            choices: ['Oui', 'Non'], correctIndex: equal ? 0 : 1,
            steps: [`On compare les coordonnées une à une. ${equal ? 'Elles sont toutes les deux égales.' : `Les premières coordonnées ${x} et ${other[0]} sont différentes.`}`]
          };
        }
      }
    ]
  },
  {
    name: 'Niveau 2 — Addition et opposé',
    description: 'Additionner, soustraire et opposer des vecteurs en respectant les coordonnées.',
    rounds: 5,
    exercises: [
      {
        type: 'Additionner deux vecteurs',
        generate() {
          const a = rnd(-9, 9), b = rnd(-9, 9), c = rnd(-9, 9), d = rnd(-9, 9), ans = pair(a + c, b + d);
          return { question: `Calculer $${pair(a, b)}+${pair(c, d)}$.`, answer: ans,
            distractors: [pair(a + c, b - d), pair(a - c, b + d), pair(a + d, b + c)],
            steps: [`On additionne les coordonnées correspondantes : $(${a}+${c},${b}+${d})=${ans}$.`] };
        }
      },
      {
        type: 'Soustraire deux vecteurs',
        generate() {
          const a = rnd(-9, 9), b = rnd(-9, 9), c = rnd(-9, 9), d = rnd(-9, 9), ans = pair(a - c, b - d);
          return { question: `Calculer $${pair(a, b)}-${pair(c, d)}$.`, answer: ans,
            distractors: [pair(a + c, b + d), pair(c - a, d - b), pair(a - d, b - c)],
            steps: [`On soustrait les coordonnées correspondantes : $(${a}-${c},${b}-${d})=${ans}$.`] };
        }
      },
      {
        type: 'Trouver le vecteur opposé',
        generate() {
          const x = rnd(-9, 9), y = rnd(-9, 9), ans = pair(-x, -y);
          return { question: `Quel est l’opposé de $\\vec{u}=${pair(x, y)}$ ?`, answer: ans,
            distractors: [pair(x, -y), pair(-x, y), pair(x, y)],
            steps: [`On change le signe de chaque coordonnée : $-\\vec{u}=(${-x},${-y})=${ans}$.`] };
        }
      }
    ]
  },
  {
    name: 'Niveau 3 — Scalaires et combinaisons',
    description: 'Multiplier un vecteur par un nombre et calculer des combinaisons linéaires.',
    rounds: 5,
    exercises: [
      {
        type: 'Multiplier par un scalaire',
        generate() {
          const k = rnd(-6, 6), x = rnd(-7, 7), y = rnd(-7, 7), ans = pair(k * x, k * y);
          return { question: `Calculer $${k}\\vec{u}$ si $\\vec{u}=${pair(x, y)}$.`, answer: ans,
            distractors: [pair(k * x, y), pair(x, k * y), pair(-k * x, -k * y)],
            steps: [`On multiplie chaque coordonnée par ${k} : $${k}(${pair(x, y)})=${pair(k * x, k * y)}$.`] };
        }
      },
      {
        type: 'Calculer une combinaison linéaire',
        generate() {
          const a = rnd(-4, 4), b = rnd(-4, 4), x = rnd(-5, 5), y = rnd(-5, 5), z = rnd(-5, 5), t = rnd(-5, 5);
          const ans = pair(a * x + b * z, a * y + b * t);
          return { question: `Calculer $${a}\\vec{u}+${b}\\vec{v}$ avec $\\vec{u}=${pair(x, y)}$ et $\\vec{v}=${pair(z, t)}$.`, answer: ans,
            distractors: [pair(a * x - b * z, a * y - b * t), pair(a * x + b * t, a * y + b * z), pair(x + z, y + t)],
            steps: [`On calcule séparément : $${a}\\vec{u}=${pair(a * x, a * y)}$ et $${b}\\vec{v}=${pair(b * z, b * t)}$.`, `Puis on additionne : $(${a * x}+${b * z},${a * y}+${b * t})=${ans}$.`] };
        }
      }
    ]
  },
  {
    name: 'Niveau 4 — Propriétés et longueur',
    description: 'Utiliser les propriétés algébriques, calculer une norme ou une distance dans des cas exacts.',
    rounds: 5,
    exercises: [
      {
        type: 'Reconnaître une propriété',
        generate() {
          const statements = [
            ['$\\vec{u}+\\vec{v}=\\vec{v}+\\vec{u}$', true, 'L’addition des vecteurs est commutative.'],
            ['$2(\\vec{u}+\\vec{v})=2\\vec{u}+2\\vec{v}$', true, 'La multiplication par un scalaire est distributive sur l’addition.'],
            ['$\\vec{u}+\\vec{0}=\\vec{u}$', true, 'Le vecteur nul est l’élément neutre de l’addition.'],
            ['$\\vec{u}+\\vec{v}=\\vec{u}$ pour tous $\\vec{u},\\vec{v}$', false, 'Cette égalité n’est pas vraie en général ; elle n’impose pas que v soit nul.'],
            ['$-\\vec{u}=\\vec{u}$ pour tout $\\vec{u}$', false, 'Un vecteur et son opposé sont généralement différents.'],
            ['$\\vec{u}+\\vec{v}=\\vec{u}-\\vec{v}$ pour tous $\\vec{u},\\vec{v}$', false, 'Additionner v et soustraire v donnent généralement des résultats différents.']
          ];
          const [statement, valid, why] = pick(statements);
          const answer = valid ? 'Vraie' : 'Fausse';
          return { question: `Cette propriété est-elle vraie pour tous les vecteurs du plan ? ${statement}`, choices: ['Vraie', 'Fausse'], correctIndex: valid ? 0 : 1, steps: [why] };
        }
      },
      {
        type: 'Calculer une norme',
        generate() {
          const triple = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [9, 12, 15]]);
          const sx = Math.random() < 0.5 ? -1 : 1, sy = Math.random() < 0.5 ? -1 : 1;
          const x = sx * triple[0], y = sy * triple[1], ans = triple[2];
          return { question: `Calculer la norme de $\\vec{u}=${pair(x, y)}$.`, answer: ans,
            distractors: [Math.abs(x + y), Math.abs(x) + Math.abs(y), triple[0] + triple[1]],
            steps: [`$\\|\\vec{u}\\|=\\sqrt{${x}^2+${y}^2}=\\sqrt{${x * x + y * y}}=${ans}$.`] };
        }
      },
      {
        type: 'Calculer une distance',
        generate() {
          const x = rnd(-5, 5), y = rnd(-5, 5), triple = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]);
          const sx = Math.random() < 0.5 ? -1 : 1, sy = Math.random() < 0.5 ? -1 : 1, dx = sx * triple[0], dy = sy * triple[1];
          return { question: `Soient $A${pair(x, y)}$ et $B${pair(x + dx, y + dy)}$. Quelle est la distance $AB$ ?`, answer: triple[2],
            distractors: [Math.abs(dx) + Math.abs(dy), Math.abs(dx - dy), triple[0] + triple[1]],
            steps: [`$\\overrightarrow{AB}=${pair(dx, dy)}$, donc $AB=\\sqrt{${dx}^2+${dy}^2}=${triple[2]}$.`] };
        }
      }
    ]
  },
  {
    name: 'Niveau 5 — Problèmes de synthèse',
    description: 'Combiner plusieurs idées pour retrouver des coordonnées et résoudre des problèmes géométriques.',
    rounds: 5,
    exercises: [
      {
        type: 'Calculer une combinaison de quatre vecteurs',
        generate() {
          const u = [rnd(-6, 6), rnd(-6, 6)], v = [rnd(-6, 6), rnd(-6, 6)];
          const w = [rnd(-6, 6), rnd(-6, 6)], z = [rnd(-6, 6), rnd(-6, 6)];
          const result = [0, 1].map(i => 2 * u[i] + 3 * v[i] - w[i] + 4 * z[i]);
          const noMinus = [0, 1].map(i => 2 * u[i] + 3 * v[i] + w[i] + 4 * z[i]);
          const noScale = [0, 1].map(i => 2 * u[i] + 3 * v[i] - w[i] + z[i]);
          const swapped = [result[1], result[0]], answer = pair(result[0], result[1]);
          return {
            question: `Calculer $2\\vec{u}+3\\vec{v}-\\vec{w}+4\\vec{z}$ avec $\\vec{u}=${pair(...u)}$, $\\vec{v}=${pair(...v)}$, $\\vec{w}=${pair(...w)}$ et $\\vec{z}=${pair(...z)}$.`,
            answer,
            distractors: [pair(...noMinus), pair(...noScale), pair(...swapped)],
            steps: [
              `On applique les coefficients et le signe à chaque vecteur : $2\\vec{u}=${pair(2 * u[0], 2 * u[1])}$, $3\\vec{v}=${pair(3 * v[0], 3 * v[1])}$, $-\\vec{w}=${pair(-w[0], -w[1])}$ et $4\\vec{z}=${pair(4 * z[0], 4 * z[1])}$.`,
              `On additionne les premières coordonnées, puis les secondes : $(${2 * u[0]}+${3 * v[0]}-${w[0]}+${4 * z[0]}, ${2 * u[1]}+${3 * v[1]}-${w[1]}+${4 * z[1]})=${answer}$.`
            ]
          };
        }
      },
      {
        type: 'Déterminer le quatrième sommet',
        generate() {
          const ax = rnd(-6, 6), ay = rnd(-6, 6), ux = rnd(-5, 5), uy = rnd(-5, 5), vx = rnd(-5, 5), vy = rnd(-5, 5);
          const bx = ax + ux, by = ay + uy, cx = bx + vx, cy = by + vy, dx = ax + vx, dy = ay + vy, ans = pair(dx, dy);
          return { question: `A, B, C, D sont les sommets consécutifs d’un parallélogramme. Si $A${pair(ax, ay)}$, $B${pair(bx, by)}$ et $C${pair(cx, cy)}$, trouver D.`, answer: ans,
            distractors: [pair(ax + ux + vx, ay + uy - vy), pair(ax - vx, ay - vy), pair(cx - ax, cy - ay)],
            steps: [`Dans un parallélogramme, $\\overrightarrow{AD}=\\overrightarrow{BC}$. Ici $\\overrightarrow{BC}=${pair(vx, vy)}$, donc $D=A+\\overrightarrow{BC}=${pair(ax, ay)}+${pair(vx, vy)}=${ans}$.`] };
        }
      },
      {
        type: 'Compléter une égalité de vecteurs',
        generate() {
          const x = rnd(-8, 8), y = rnd(-8, 8), a = rnd(-5, 5), b = rnd(-5, 5), target = pair(x, y);
          const unknownFirst = Math.random() < 0.5;
          const known = unknownFirst ? pair(a, b) : pair(a, b);
          const kx = x - a, ky = y - b, answer = pair(kx, ky);
          return { question: unknownFirst
            ? `Compléter $\\vec{u}+${known}=${target}$. Quelle est $\\vec{u}$ ?`
            : `Compléter $${known}+\\vec{u}=${target}$. Quelle est $\\vec{u}$ ?`,
            answer, distractors: [pair(-kx, -ky), pair(kx, y), pair(x, ky)],
            steps: [`On isole le vecteur manquant en soustrayant $${known}$ : $\\vec{u}=${target}-${known}=${answer}$.`] };
        }
      },
      {
        type: 'Vérifier une égalité vectorielle',
        generate() {
          const x = rnd(-5, 5), y = rnd(-5, 5), z = rnd(-5, 5), t = rnd(-5, 5), k = rnd(2, 4);
          const valid = Math.random() < 0.5, left = pair(k * (x + z), k * (y + t));
          const right = valid ? pair(k * x + k * z, k * y + k * t) : pair(k * x + k * z + 1, k * y + k * t);
          return { question: `L’égalité $${k}(${pair(x, y)}+${pair(z, t)})=${right}$ est-elle vraie ?`, choices: ['Oui', 'Non'], correctIndex: valid ? 0 : 1,
            steps: [`Le membre gauche vaut $${left}$. Il ${valid ? 'est égal' : 'n’est pas égal'} au membre droit $${right}$.`] };
        }
      }
    ]
  }
];

EM.lesson({ slides, series: levels });
