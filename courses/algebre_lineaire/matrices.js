/* EasyMath — Leçon : introduction aux matrices */
const slides = [
  String.raw`# Définition et dimensions

Une **matrice** est un tableau rectangulaire de nombres organisé en lignes et en colonnes. Par exemple,

$$A=\begin{pmatrix}1&2&3\\4&5&6\end{pmatrix}$$

possède deux lignes et trois colonnes : c’est une matrice de dimension $2\times3$. En général, une matrice à $m$ lignes et $n$ colonnes est dite de dimension $m\times n$.`,
  String.raw`# Notation des coefficients

On note souvent une matrice $A=(a_{ij})$. L’indice $i$ désigne la ligne et l’indice $j$ la colonne. Ainsi, $a_{23}$ est le coefficient situé sur la deuxième ligne et la troisième colonne.

Par exemple, si $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$, alors $a_{12}=2$ et $a_{21}=3$.`,
  String.raw`# Quelques types de matrices

- Une matrice **carrée** a autant de lignes que de colonnes.
- Une matrice **ligne** n’a qu’une ligne ; une matrice **colonne** n’a qu’une colonne.
- Une matrice **nulle** ne contient que des zéros.
- Une matrice **diagonale** est carrée et ses coefficients hors diagonale sont nuls.
- La matrice **identité** a des 1 sur la diagonale et des 0 ailleurs.`,
  String.raw`# Addition et multiplication par un scalaire

On additionne deux matrices coefficient par coefficient ; elles doivent avoir la même dimension. Ainsi,

$$\begin{pmatrix}1&2\\3&4\end{pmatrix}+\begin{pmatrix}5&6\\7&8\end{pmatrix}=\begin{pmatrix}6&8\\10&12\end{pmatrix}.$$

Pour multiplier une matrice par un nombre, on multiplie chacun de ses coefficients par ce nombre. Par exemple, $2\begin{pmatrix}1&2\\3&4\end{pmatrix}=\begin{pmatrix}2&4\\6&8\end{pmatrix}$.`,
  String.raw`# Produit de deux matrices

Le produit $AB$ est défini si le nombre de colonnes de $A$ est égal au nombre de lignes de $B$. Si $A$ est de dimension $m\times n$ et $B$ de dimension $n\times p$, alors $AB$ est de dimension $m\times p$.

Chaque coefficient du produit s’obtient en multipliant une ligne de $A$ par une colonne de $B$, puis en additionnant les produits. Par exemple,

$$\begin{pmatrix}1&2\\3&4\end{pmatrix}\begin{pmatrix}2&0\\1&2\end{pmatrix}=\begin{pmatrix}4&4\\10&8\end{pmatrix}.$$

En général, $AB\neq BA$ : l’ordre des facteurs compte.`,
  String.raw`# Une matrice transforme un vecteur

Un vecteur colonne peut être multiplié par une matrice. Par exemple,

$$\begin{pmatrix}2&0\\0&3\end{pmatrix}\begin{pmatrix}1\\1\end{pmatrix}=\begin{pmatrix}2\\3\end{pmatrix}.$$

Cette matrice étire la première coordonnée par 2 et la seconde par 3. D’autres matrices peuvent effectuer une rotation ou une réflexion. Les matrices servent ainsi à représenter des transformations géométriques, des tableaux de données et les coefficients de modèles en apprentissage automatique.`
];

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = (items) => {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = rnd(0, i);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};
const mat = (rows) => `\\begin{pmatrix}${rows.map(row => row.join('&')).join('\\\\')}\\end{pmatrix}`;
const vec = (values) => `\\begin{pmatrix}${values.join('\\\\')}\\end{pmatrix}`;
const mc = (question, answer, distractors, steps) => {
  const formatChoice = (choice) => {
    const text = String(choice);
    return text.includes('\\begin{pmatrix}') ? `$${text}$` : text;
  };
  const correct = formatChoice(answer);
  const choices = [...new Set([correct, ...distractors.map(formatChoice)])].slice(0, 4);
  while (choices.length < 4) choices.push(`Autre réponse (${choices.length})`);
  const arranged = shuffle(choices);
  return { question, choices: arranged, correctIndex: arranged.indexOf(correct), steps };
};

const levels = [
  {
    name: 'Niveau 1 — Lire les dimensions et les coefficients', rounds: 5,
    exercises: [{
      type: 'Lire la dimension d’une matrice',
      generate() {
        const rows = rnd(2, 4), cols = rnd(2, 4);
        const entries = Array.from({ length: rows }, () => Array.from({ length: cols }, () => rnd(-6, 6)));
        const answer = `${rows} × ${cols}`;
        return mc(`Quelle est la dimension de $A=${mat(entries)}$ ?`, answer,
          [`${cols} × ${rows}`, `${rows + 1} × ${cols}`, `${rows} × ${cols + 1}`],
          [`La matrice comporte ${rows} lignes et ${cols} colonnes : sa dimension est $${answer}$.`]);
      }
    }]
  },
  {
    name: 'Niveau 2 — Additionner des matrices', rounds: 5,
    exercises: [{
      type: 'Additionner deux matrices',
      generate() {
        const A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-6, 6)));
        const B = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-6, 6)));
        const sum = A.map((row, i) => row.map((x, j) => x + B[i][j]));
        const firstOnly = A.map((row, i) => row.map((x, j) => x + (i === 0 ? B[i][j] : 0)));
        const sub = A.map((row, i) => row.map((x, j) => x - B[i][j]));
        const swapped = [[sum[0][0], sum[1][0]], [sum[0][1], sum[1][1]]];
        const steps = sum.flatMap((row, i) => row.map((value, j) => `Coefficient (${i + 1}, ${j + 1}) : ${A[i][j]} + ${B[i][j]} = ${value}.`));
        return mc(`Calculer $${mat(A)}+${mat(B)}$.`, mat(sum), [mat(firstOnly), mat(sub), mat(swapped)],
          [`On additionne séparément les coefficients de même position.`, ...steps, `Donc $${mat(A)}+${mat(B)}=${mat(sum)}$.`]);
      }
    }]
  },
  {
    name: 'Niveau 3 — Multiplier par un scalaire', rounds: 5,
    exercises: [{
      type: 'Multiplier une matrice par un scalaire',
      generate() {
        const A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-5, 5)));
        const k = pickNonZero();
        const product = A.map(row => row.map(x => k * x));
        const partial = A.map((row, i) => row.map(x => i === 0 ? k * x : x));
        const opposite = A.map(row => row.map(x => -k * x));
        const transposed = [[product[0][0], product[1][0]], [product[0][1], product[1][1]]];
        const steps = product.flatMap((row, i) => row.map((value, j) => `Coefficient (${i + 1}, ${j + 1}) : ${k} × ${A[i][j]} = ${value}.`));
        return mc(`Calculer $${k}${mat(A)}$.`, mat(product), [mat(partial), mat(opposite), mat(transposed)],
          [`On multiplie séparément chaque coefficient par $${k}$.`, ...steps, `Donc $${k}${mat(A)}=${mat(product)}$.`]);
      }
    }]
  },
  {
    name: 'Niveau 4 — Calculer un produit matriciel', rounds: 5,
    exercises: [{
      type: 'Multiplier deux matrices',
      generate() {
        const A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-4, 4)));
        const B = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-4, 4)));
        const product = A.map(row => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
        const reversed = B.map(row => A[0].map((_, j) => row.reduce((sum, x, k) => sum + x * A[k][j], 0)));
        const wrongAdd = A.map((row, i) => row.map((x, j) => x + B[i][j]));
        const wrongDiag = A.map((row, i) => row.map((x, j) => x * B[i][j]));
        const steps = product.flatMap((row, i) => row.map((value, j) => `Coefficient (${i + 1}, ${j + 1}) : ${A[i][0]} × ${B[0][j]} + ${A[i][1]} × ${B[1][j]} = ${value}.`));
        return mc(`Calculer $${mat(A)}\\times${mat(B)}$.`, mat(product), [mat(reversed), mat(wrongAdd), mat(wrongDiag)],
          [`Pour chaque coefficient, on multiplie les nombres d’une ligne de la première matrice par les nombres correspondants d’une colonne de la seconde, puis on additionne.`, ...steps, `On obtient ainsi $${mat(product)}$.`]);
      }
    }]
  },
  {
    name: 'Niveau 5 — Transformer un vecteur', rounds: 5,
    exercises: [{
      type: 'Appliquer une matrice à un vecteur',
      generate() {
        const A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-5, 5)));
        const v = [rnd(-5, 5), rnd(-5, 5)];
        const result = A.map(row => row[0] * v[0] + row[1] * v[1]);
        const swapped = A.map(row => row[0] * v[1] + row[1] * v[0]);
        const wrongSign = A.map(row => row[0] * v[0] - row[1] * v[1]);
        const wrongOrder = [A[0][0] * v[0] + A[1][0] * v[1], A[0][1] * v[0] + A[1][1] * v[1]];
        const steps = result.map((value, i) => `Coordonnée ${i + 1} : ${A[i][0]} × ${v[0]} + ${A[i][1]} × ${v[1]} = ${value}.`);
        return mc(`Calculer $${mat(A)}\\times${vec(v)}$.`, vec(result), [vec(swapped), vec(wrongSign), vec(wrongOrder)],
          [`On calcule chaque coordonnée en utilisant une ligne de la matrice.`, ...steps, `Donc $${mat(A)}\\times${vec(v)}=${vec(result)}$.`]);
      }
    }]
  }
];

function pickNonZero() {
  let value = 0;
  while (value === 0) value = rnd(-5, 5);
  return value;
}

EM.lesson({ slides, series: levels, progressiveSeries: true });
