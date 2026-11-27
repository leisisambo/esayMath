/* EasyMath — Leçon : opérations fondamentales sur les matrices */
const slides = [
  String.raw`# La transposée

La **transposée** d’une matrice $A$, notée $A^{\mathsf T}$, s’obtient en échangeant ses lignes et ses colonnes. Si $A$ est de dimension $m\times n$, sa transposée est de dimension $n\times m$.

$$A=\begin{pmatrix}1&2&3\\4&5&6\end{pmatrix}\quad\Longrightarrow\quad A^{\mathsf T}=\begin{pmatrix}1&4\\2&5\\3&6\end{pmatrix}.$$`,
  String.raw`# Déterminant d’une matrice $2\times2$

Pour $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$, son déterminant est

$$\det(A)=ad-bc.$$

Le déterminant est défini pour les matrices carrées. Dans le plan, sa valeur absolue mesure le facteur d’aire de la transformation associée ; son signe indique aussi si l’orientation est conservée ou inversée.`,
  String.raw`# Inverse d’une matrice

Une matrice carrée $A$ est **inversible** s’il existe $A^{-1}$ tel que $AA^{-1}=A^{-1}A=I$, où $I$ est la matrice identité.

Pour une matrice $2\times2$ de déterminant non nul,

$$A^{-1}=\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}.$$

Si $\det(A)=0$, la matrice n’a pas d’inverse.`,
  String.raw`# Rang d’une matrice

Le **rang** est le nombre maximal de colonnes linéairement indépendantes ; il est aussi égal au nombre maximal de lignes indépendantes.

Pour une matrice $2\times2$ : un déterminant non nul donne un rang 2 ; un déterminant nul avec au moins un coefficient non nul donne un rang 1 ; la matrice nulle a le rang 0. Le rang indique combien de directions indépendantes la matrice décrit.`,
  String.raw`# Trace et puissances

La **trace** d’une matrice carrée est la somme des coefficients de sa diagonale principale. Ainsi, $\operatorname{tr}\begin{pmatrix}2&1\\4&3\end{pmatrix}=2+3=5$.

Une puissance $A^n$ n’est définie que si $A$ est carrée. Pour un entier positif $n$, $A^n$ est le produit de $n$ facteurs égaux à $A$. En particulier,

$$A^2=A\times A.$$

Elle représente l’application répétée d’une même transformation.`,
  String.raw`# Démarche de calcul

Pour transposer, lire les colonnes de la matrice initiale comme les lignes de la transposée. Pour le déterminant $2\times2$, calculer $ad$ puis $bc$, et faire la différence. Pour l’inverse, vérifier d’abord que le déterminant n’est pas nul, puis échanger les termes diagonaux, changer le signe des autres et diviser par le déterminant.

Pour le rang d’une matrice $2\times2$, commencer par le déterminant. Pour la trace, additionner uniquement les termes diagonaux. Pour une puissance, calculer le produit matriciel en multipliant chaque ligne par chaque colonne.`
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
const mat = (rows) => `\\begin{pmatrix}${rows.map(row => row.join('&')).join('\\\\')}\\end{pmatrix}`;
const mc = (question, answer, distractors, steps) => {
  const formatChoice = choice => {
    const text = String(choice);
    return text.includes('\\begin{pmatrix}') ? `$${text}$` : text;
  };
  const correct = formatChoice(answer);
  const choices = [...new Set([correct, ...distractors.map(formatChoice)])].slice(0, 4);
  while (choices.length < 4) choices.push(`Autre réponse (${choices.length})`);
  const arranged = shuffle(choices);
  return { question, choices: arranged, correctIndex: arranged.indexOf(correct), steps };
};
const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const product2 = (A, B) => A.map(row => B[0].map((_, j) => row[0] * B[0][j] + row[1] * B[1][j]));
const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
const fraction = (numerator, denominator) => {
  const sign = denominator < 0 ? -1 : 1;
  const n = numerator * sign, d = Math.abs(denominator), divisor = gcd(n, d) || 1;
  const reducedN = n / divisor, reducedD = d / divisor;
  return reducedD === 1 ? String(reducedN) : `\\frac{${reducedN}}{${reducedD}}`;
};

const levels = [
  {
    name: 'Niveau 1 — Transposer une matrice', rounds: 5,
    exercises: [{
      type: 'Calculer une transposée',
      generate() {
        const A = Array.from({ length: 2 }, () => Array.from({ length: 3 }, () => rnd(-6, 6)));
        const transpose = A[0].map((_, j) => A.map(row => row[j]));
        const unchanged = A;
        const reversed = A.slice().reverse();
        const steps = transpose.flatMap((row, i) => row.map((value, j) => `Le coefficient (${i + 1}, ${j + 1}) de $A^{\\mathsf T}$ est le coefficient (${j + 1}, ${i + 1}) de $A$ : ${value}.`));
        return mc(`Calculer $A^{\\mathsf T}$ pour $A=${mat(A)}$.`, mat(transpose), [mat(unchanged), mat(reversed), mat([[...A[0]].reverse(), [...A[1]].reverse()])],
          [`On échange les lignes et les colonnes. La matrice initiale est de dimension $2\\times3$, donc sa transposée est de dimension $3\\times2$.`, ...steps, `Ainsi, $A^{\\mathsf T}=${mat(transpose)}$.`]);
      }
    }]
  },
  {
    name: 'Niveau 2 — Calculer trace et déterminant', rounds: 5,
    exercises: [
      {
        type: 'Calculer la trace',
        generate() {
          const A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-8, 8)));
          const trace = A[0][0] + A[1][1];
          return mc(`Calculer $\\operatorname{tr}(A)$ si $A=${mat(A)}$.`, String(trace),
            [String(A[0][0] + A[1][0]), String(A[0][1] + A[1][1]), String(A[0][0] + A[0][1] + A[1][0] + A[1][1])],
            [`La trace est la somme des coefficients diagonaux : $\\operatorname{tr}(A)=${A[0][0]}+${A[1][1]}=${trace}$.`]);
        }
      },
      {
        type: 'Calculer un déterminant',
        generate() {
          const A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-7, 7)));
          const det = det2(A);
          return mc(`Calculer $\\det(A)$ si $A=${mat(A)}$.`, String(det),
            [String(A[0][0] * A[1][1] + A[0][1] * A[1][0]), String(A[0][0] - A[1][1]), String(-det)],
            [`Pour $A=\\begin{pmatrix}a&b\\c&d\\end{pmatrix}$, $\\det(A)=ad-bc$. Ici : $${A[0][0]}\\times${A[1][1]}-${A[0][1]}\\times${A[1][0]}=${A[0][0] * A[1][1]}-${A[0][1] * A[1][0]}=${det}$.`]);
        }
      }
    ]
  },
  {
    name: 'Niveau 3 — Déterminer le rang et l’inversibilité', rounds: 5,
    exercises: [
      {
        type: 'Déterminer le rang',
        generate() {
          const kind = pick([0, 1, 2]);
          let A;
          if (kind === 0) A = [[0, 0], [0, 0]];
          else if (kind === 1) {
            const a = rnd(-5, 5) || 1, b = rnd(-5, 5) || 2, k = pick([-3, -2, 2, 3]);
            A = [[a, b], [k * a, k * b]];
          } else {
            A = [[rnd(-5, 5) || 1, rnd(-5, 5)], [rnd(-5, 5), rnd(-5, 5) || 1]];
            while (det2(A) === 0) A[1][1]++;
          }
          const rank = kind;
          const det = det2(A);
          return mc(`Quel est le rang de $A=${mat(A)}$ ?`, String(rank), ['0', '1', '2'].filter(x => x !== String(rank)),
            [det === 0 ? `Le déterminant est nul. ` : `Le déterminant vaut $${det}\\neq0$. `,
              rank === 0 ? 'Tous les coefficients sont nuls : le rang est 0.' : rank === 1 ? 'Les lignes sont proportionnelles et la matrice n’est pas nulle : le rang est 1.' : 'Le déterminant est non nul : les deux lignes et les deux colonnes sont indépendantes, donc le rang est 2.']);
        }
      },
      {
        type: 'Tester si une matrice est inversible',
        generate() {
          const invertible = Math.random() < 0.5;
          let A;
          if (invertible) {
            do {
              A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-5, 5)));
            } while (det2(A) === 0);
          } else {
            const a = rnd(-5, 5) || 1, b = rnd(-5, 5), k = pick([-3, -2, 2, 3]);
            A = [[a, b], [k * a, k * b]];
          }
          const det = det2(A);
          return mc(`La matrice $A=${mat(A)}$ est-elle inversible ?`, invertible ? 'Oui' : 'Non',
            [invertible ? 'Non' : 'Oui', 'Seulement si ses coefficients sont tous positifs', 'On ne peut pas le savoir'],
            [`On calcule $\\det(A)=${A[0][0]}\\times${A[1][1]}-${A[0][1]}\\times${A[1][0]}=${det}$. ${det === 0 ? 'Le déterminant est nul : la matrice n’est pas inversible.' : 'Le déterminant est non nul : la matrice est inversible.'}`]);
        }
      }
    ]
  },
  {
    name: 'Niveau 4 — Calculer une matrice inverse', rounds: 5,
    exercises: [{
      type: 'Calculer l’inverse d’une matrice',
      generate() {
        const k = rnd(-5, 5) || pick([-4, -3, -2, -1, 1, 2, 3, 4]);
        const A = Math.random() < 0.5 ? [[1, k], [0, 1]] : [[1, 0], [k, 1]];
        const det = det2(A);
        const inverse = [[fraction(A[1][1], det), fraction(-A[0][1], det)], [fraction(-A[1][0], det), fraction(A[0][0], det)]];
        const transposed = [[inverse[0][0], inverse[1][0]], [inverse[0][1], inverse[1][1]]];
        return mc(`Calculer $A^{-1}$ pour $A=${mat(A)}$.`, mat(inverse), [mat(A), mat([[1, 0], [0, 1]]), mat(transposed)],
          [`Le déterminant vaut $${A[0][0]}\\times${A[1][1]}-${A[0][1]}\\times${A[1][0]}=${det}$.`,
            `On échange les termes diagonaux et on change le signe des autres : $\\begin{pmatrix}${A[1][1]}&${-A[0][1]}\\${-A[1][0]}&${A[0][0]}\\end{pmatrix}$.`,
            `On divise ensuite chaque coefficient par ${det}.`,
            `Donc $A^{-1}=${mat(inverse)}$.`]);
      }
    }]
  },
  {
    name: 'Niveau 5 — Calculer une puissance', rounds: 5,
    exercises: [{
      type: 'Calculer le carré d’une matrice',
      generate() {
        const A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-4, 4)));
        const square = product2(A, A);
        const steps = square.flatMap((row, i) => row.map((value, j) => `Coefficient (${i + 1}, ${j + 1}) : ${A[i][0]} × ${A[0][j]} + ${A[i][1]} × ${A[1][j]} = ${A[i][0] * A[0][j]} + ${A[i][1] * A[1][j]} = ${value}.`));
        const wrong = A.map(row => row.map(x => x * x));
        const twice = A.map(row => row.map(x => 2 * x));
        const transpose = [[square[0][0], square[1][0]], [square[0][1], square[1][1]]];
        return mc(`Calculer $A^2$ si $A=${mat(A)}$.`, mat(square), [mat(wrong), mat(twice), mat(transpose)],
          [`Par définition, $A^2=A\\times A$.`, ...steps, `Ainsi, $A^2=${mat(square)}$.`]);
      }
    }]
  }
];

EM.lesson({ slides, series: levels, progressiveSeries: true });
