/* EasyMath — Leçon : bases et dimension d’un espace vectoriel */
const slides = [
  String.raw`# Pourquoi une base ?

Dans un espace vectoriel, une famille de vecteurs peut servir à décrire tous les autres. Dans $\mathbb{R}^2$, les vecteurs $\vec e_1=(1,0)$ et $\vec e_2=(0,1)$ suffisent :

$$ (x,y)=x\vec e_1+y\vec e_2. $$

Une base fournit ainsi un système de coordonnées adapté à l’espace.`,
  String.raw`# Définition d’une base

Une famille $(\vec v_1,\ldots,\vec v_p)$ est une **base** de $E$ si elle vérifie deux conditions :

1. elle est **linéairement indépendante** ;
2. elle **engendre** $E$, c’est-à-dire que tout vecteur de $E$ est une combinaison linéaire de ses éléments.

L’indépendance garantit qu’aucun vecteur de la famille n’est superflu. L’engendrement garantit que la famille suffit à représenter tout l’espace.`,
  String.raw`# Indépendance linéaire

La famille $(\vec v_1,\ldots,\vec v_p)$ est linéairement indépendante si

$$\alpha_1\vec v_1+\cdots+\alpha_p\vec v_p=\vec 0$$

implique $\alpha_1=\cdots=\alpha_p=0$. Sinon, elle est dépendante : au moins un vecteur peut être exprimé comme combinaison linéaire des autres.

Dans $\mathbb{R}^2$, deux vecteurs sont indépendants exactement lorsqu’ils ne sont pas colinéaires.`,
  String.raw`# Exemple dans $\mathbb{R}^2$

Considérons $\vec u_1=(1,2)$ et $\vec u_2=(3,1)$. Si

$$\alpha\vec u_1+\beta\vec u_2=\vec 0,$$

alors $\alpha+3\beta=0$ et $2\alpha+\beta=0$. La première équation donne $\alpha=-3\beta$ ; dans la seconde, $-5\beta=0$. Ainsi $\alpha=\beta=0$ : les vecteurs sont indépendants.

Leur déterminant vaut $1\cdot1-2\cdot3=-5\neq0$. Ils forment donc une base de $\mathbb{R}^2$.`,
  String.raw`# Coordonnées dans une base

Dans une base, tout vecteur s’écrit comme combinaison linéaire des vecteurs de la base, et cette écriture est **unique**.

Par exemple, pour la base canonique de $\mathbb{R}^3$,

$$\vec e_1=(1,0,0),\quad \vec e_2=(0,1,0),\quad \vec e_3=(0,0,1),$$

on a $(x,y,z)=x\vec e_1+y\vec e_2+z\vec e_3$. Les coordonnées du vecteur sont les coefficients de cette combinaison.`,
  String.raw`# Dimension

Un espace vectoriel de dimension finie possède des bases ayant toutes le même nombre d’éléments. Ce nombre est sa **dimension**, notée $\dim(E)$.

Ainsi, $\dim(\mathbb{R})=1$, $\dim(\mathbb{R}^2)=2$ et $\dim(\mathbb{R}^3)=3$. La dimension compte le nombre de vecteurs nécessaires dans une base, donc le nombre de coordonnées indépendantes.`,
  String.raw`# Applications et méthode

En vision par ordinateur, une image ou un descripteur peut être représenté par un vecteur de grande dimension. L’analyse en composantes principales (ACP/PCA) construit des directions orthogonales permettant de représenter les données avec moins de coordonnées, en conservant autant que possible leur information.

Pour vérifier qu’une famille est une base : établir son indépendance, puis vérifier qu’elle engendre l’espace. Dans $\mathbb{R}^n$, une famille de $n$ vecteurs est une base si et seulement si elle est indépendante ; pour une matrice carrée, cela revient à vérifier que son déterminant est non nul.`
  ,String.raw`# Vérification numérique avec NumPy

On place les vecteurs en colonnes d’une matrice. Son rang est le nombre maximal de colonnes linéairement indépendantes. Pour les vecteurs $(1,1)$ et $(2,2)$, le rang vaut 1 : ils sont dépendants et ne forment pas une base de $\\mathbb{R}^2$.

\`\`\`python
import numpy as np

u1 = np.array([1, 1])
u2 = np.array([2, 2])
M = np.column_stack((u1, u2))
rang = np.linalg.matrix_rank(M)
print("Rang de la matrice =", rang)
\`\`\``
];

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
const pair = (x, y) => `(${x}, ${y})`;
const mc = (question, answer, distractors, steps) => {
  const choices = [...new Set([String(answer), ...distractors.map(String)])].slice(0, 4);
  while (choices.length < 4) choices.push(`Autre réponse (${choices.length})`);
  const arranged = shuffle(choices);
  return { question, choices: arranged, correctIndex: arranged.indexOf(String(answer)), steps };
};

const levels = [
  {
    name: 'Niveau 1 — Comprendre la dimension', rounds: 5,
    exercises: [{
      type: 'Déterminer une dimension',
      generate() {
        const n = pick([1, 2, 3]);
        const answer = String(n);
        return mc(`La base canonique de $\\mathbb{R}^{${n}}$ contient combien de vecteurs ?`, answer,
          [String(n + 1), String(Math.max(0, n - 1)), String(2 * n)],
          [`La base canonique de $\\mathbb{R}^{${n}}$ contient un vecteur par coordonnée : $\\dim(\\mathbb{R}^{${n}})=${n}$.`]);
      }
    }]
  },
  {
    name: 'Niveau 2 — Reconnaître la dépendance', rounds: 5,
    exercises: [{
      type: 'Tester l’indépendance de deux vecteurs',
      generate() {
        const x = rnd(-5, 5) || 1, y = rnd(-5, 5), k = pick([-3, -2, 2, 3]);
        const dependent = Math.random() < 0.5;
        const v = dependent ? [k * x, k * y] : [-y, x];
        const answer = dependent ? 'Dépendants' : 'Indépendants';
        return mc(`Les vecteurs $${pair(x, y)}$ et $${pair(v[0], v[1])}$ sont-ils linéairement indépendants ?`, answer,
          [dependent ? 'Indépendants' : 'Dépendants', 'Ils engendrent toujours $\\mathbb{R}^2$', 'On ne peut pas conclure'],
          [dependent
            ? `Le second vecteur est ${k} fois le premier. La famille est dépendante ; par exemple, $${k}\\vec u-\\vec v=\\vec 0$.`
            : `Le déterminant vaut $${x}\\times${v[1]}-${y}\\times${v[0]}=${x * v[1] - y * v[0]}\\neq0$. Les vecteurs sont indépendants.`]);
      }
    }]
  },
  {
    name: 'Niveau 3 — Vérifier une base de $\\mathbb{R}^2$', rounds: 5,
    exercises: [{
      type: 'Tester si deux vecteurs forment une base',
      generate() {
        const x = rnd(-5, 5) || 1, y = rnd(-5, 5), k = pick([-3, -2, 2, 3]);
        const isBasis = Math.random() < 0.5;
        const v = isBasis ? [-y, x] : [k * x, k * y];
        const det = x * v[1] - y * v[0];
        const answer = isBasis ? 'Oui' : 'Non';
        return mc(`Les vecteurs $${pair(x, y)}$ et $${pair(v[0], v[1])}$ forment-ils une base de $\\mathbb{R}^2$ ?`, answer,
          [isBasis ? 'Non' : 'Oui', 'Ils forment une base de $\\mathbb{R}^3$', 'La dimension est 1 dans tous les cas'],
          [`Le déterminant vaut $${x}\\times${v[1]}-${y}\\times${v[0]}=${det}$. ${det === 0 ? 'Il est nul : les vecteurs sont dépendants et ne forment pas une base.' : 'Il est non nul : les deux vecteurs sont indépendants et forment une base de $\\mathbb{R}^2$.'}`]);
      }
    }]
  },
  {
    name: 'Niveau 4 — Calculer des coordonnées dans une base', rounds: 5,
    exercises: [{
      type: 'Exprimer un vecteur dans une base',
      generate() {
        let a, b, c, d, det;
        do {
          a = rnd(-4, 4); b = rnd(-4, 4); c = rnd(-4, 4); d = rnd(-4, 4);
          det = a * d - b * c;
        } while (!det);
        const alpha = rnd(-4, 4), beta = rnd(-4, 4);
        const x = alpha * a + beta * c, y = alpha * b + beta * d;
        const answer = pair(alpha, beta);
        return mc(`Dans la base $B=(${pair(a, b)},${pair(c, d)})$, quelles sont les coordonnées du vecteur $${pair(x, y)}$ ?`, answer,
          [pair(beta, alpha), pair(-alpha, beta), pair(alpha, -beta)],
          [`On cherche $\\alpha'(${a},${b})+\\beta'(${c},${d})=(${x},${y})$. Par construction, $${alpha}(${a},${b})+${beta}(${c},${d})=(${x},${y})$. L’unicité des coordonnées dans une base donne $(${alpha},${beta})$.`]);
      }
    }]
  },
  {
    name: 'Niveau 5 — Synthèse dans $\\mathbb{R}^3$', rounds: 5,
    exercises: [{
      type: 'Tester une base de $\\mathbb{R}^3$',
      generate() {
        const isBasis = Math.random() < 0.5;
        let matrix, det;
        do {
          matrix = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => rnd(-3, 3)));
          const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
          det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
        } while (isBasis ? det === 0 : det !== 0);
        const answer = det === 0 ? 'Non' : 'Oui';
        const vec = row => `(${row.join(', ')})`;
        return mc(`Les vecteurs $${vec(matrix[0])}$, $${vec(matrix[1])}$ et $${vec(matrix[2])}$ forment-ils une base de $\\mathbb{R}^3$ ?`, answer,
          [det === 0 ? 'Oui' : 'Non', 'Ils forment une base de $\\mathbb{R}^2$', 'Trois vecteurs sont toujours dépendants'],
          [`Le déterminant de la matrice ayant ces vecteurs pour colonnes vaut $${det}$. ${det === 0 ? 'La famille est dépendante : ce n’est pas une base.' : 'La famille est indépendante ; trois vecteurs indépendants de $\\mathbb{R}^3$ forment une base.'}`]);
      }
    }]
  }
];

EM.lesson({ slides, series: levels, progressiveSeries: true });
