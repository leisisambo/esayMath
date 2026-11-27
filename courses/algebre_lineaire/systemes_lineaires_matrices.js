/* EasyMath — Leçon : systèmes linéaires et résolution matricielle */
const slides = [
  String.raw`# Qu’est-ce qu’un système linéaire ?

Un système linéaire est un ensemble d’équations où les inconnues n’apparaissent qu’à la puissance 1. Pour deux inconnues :

$$\begin{cases}a_1x+b_1y=c_1\\a_2x+b_2y=c_2\end{cases}$$

Une solution est un couple $(x,y)$ qui vérifie simultanément toutes les équations.`,
  String.raw`# Écriture matricielle

On rassemble les coefficients, les inconnues et les résultats :

$$A\vec{x}=\vec{b},\qquad
A=\begin{pmatrix}a_1&b_1\\a_2&b_2\end{pmatrix},\quad
\vec{x}=\begin{pmatrix}x\\y\end{pmatrix},\quad
\vec{b}=\begin{pmatrix}c_1\\c_2\end{pmatrix}.$$

Par exemple, $\begin{cases}2x+y=5\\x-y=1\end{cases}$ devient
$\begin{pmatrix}2&1\\1&-1\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}5\\1\end{pmatrix}$.`,
  String.raw`# Résoudre avec la matrice inverse

Si $A$ est inversible, on multiplie l’équation $A\vec{x}=\vec{b}$ par $A^{-1}$ :

$$\vec{x}=A^{-1}\vec{b}.$$

Pour une matrice $2\times2$, $A$ est inversible exactement lorsque $\det(A)\neq0$. Pour l’exemple précédent,

$$\det(A)=2\times(-1)-1\times1=-3.$$

L’inverse existe et le calcul donne $\vec{x}=\begin{pmatrix}2\\1\end{pmatrix}$, donc $x=2$ et $y=1$.`,
  String.raw`# Trois possibilités géométriques

Chaque équation à deux inconnues représente une droite du plan. Les solutions du système correspondent aux points communs aux deux droites.

- Deux droites sécantes : une solution unique.
- Deux droites parallèles distinctes : aucune solution.
- Deux droites confondues : une infinité de solutions.

Si la matrice des coefficients est inversible, les droites sont sécantes et la solution est unique.`,
  String.raw`# Systèmes dépendants

Dans $\begin{cases}x+y=1\\2x+2y=5\end{cases}$, le membre de gauche de la deuxième équation est le double du premier, mais $5$ n’est pas le double de $1$. Les droites sont parallèles et distinctes : il n’y a pas de solution.

Dans $\begin{cases}x+y=1\\2x+2y=2\end{cases}$, la deuxième équation est exactement le double de la première. Elles décrivent la même droite : il y a une infinité de solutions.`,
  String.raw`# Applications

En vision par ordinateur, des systèmes linéaires interviennent notamment dans l’estimation de transformations affines, le recalage d’images et la triangulation. Les problèmes de moindres carrés apparaissent lorsque les données comportent du bruit ou que le système est surdéterminé.

Pour résoudre un système $2\times2$ : former sa matrice des coefficients, calculer le déterminant, vérifier si l’inverse existe, puis calculer $A^{-1}\vec b$ et vérifier la solution dans les équations initiales.`
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
const mat = rows => `\\begin{pmatrix}${rows.map(row => row.join('&')).join('\\\\')}\\end{pmatrix}`;
const column = values => `\\begin{pmatrix}${values.join('\\\\')}\\end{pmatrix}`;
const pair = (x, y) => `(${x}, ${y})`;
const solutionChoice = (x, y) => `$(${x}, ${y})$`;
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
const determinant = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const frac = (n, d) => {
  const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
  const sign = d < 0 ? -1 : 1, divisor = gcd(n, d) || 1;
  const numerator = n * sign / divisor, denominator = Math.abs(d) / divisor;
  return denominator === 1 ? String(numerator) : `\\frac{${numerator}}{${denominator}}`;
};
const solve = (A, b) => {
  const det = determinant(A);
  return [A[1][1] * b[0] - A[0][1] * b[1], A[0][0] * b[1] - A[1][0] * b[0]].map(n => frac(n, det));
};
const system = (A, b) => `\\begin{cases}${A[0][0]}x${A[0][1] < 0 ? '' : '+'}${A[0][1]}y=${b[0]}\\\\${A[1][0]}x${A[1][1] < 0 ? '' : '+'}${A[1][1]}y=${b[1]}\\end{cases}`;

const levels = [
  {
    name: 'Niveau 1 — Écrire un système sous forme matricielle', rounds: 5,
    exercises: [{
      type: 'Identifier la matrice des coefficients',
      generate() {
        const A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-5, 5)));
        const b = [rnd(-8, 8), rnd(-8, 8)];
        const transposed = [[A[0][0], A[1][0]], [A[0][1], A[1][1]]];
        const wrongSign = A.map(row => row.map(x => -x));
        const wrongOrder = [[A[0][1], A[0][0]], [A[1][1], A[1][0]]];
        return mc(`Dans le système $${system(A, b)}$, quelle est la matrice des coefficients $A$ dans $A\\vec{x}=\\vec{b}$ ?`, mat(A),
          [mat(transposed), mat(wrongSign), mat(wrongOrder)],
          [`On lit les coefficients de $x$ et de $y$ dans chaque équation, dans le même ordre que les lignes.`,
            `Première ligne : les coefficients sont ${A[0][0]} et ${A[0][1]}.`,
            `Deuxième ligne : les coefficients sont ${A[1][0]} et ${A[1][1]}.`,
            `Donc $A=${mat(A)}$, $\\vec{x}=${column(['x', 'y'])}$ et $\\vec{b}=${column(b)}$.`]);
      }
    }]
  },
  {
    name: 'Niveau 2 — Classer les solutions', rounds: 5,
    exercises: [{
      type: 'Déterminer le nombre de solutions',
      generate() {
        const kind = pick(['unique', 'aucune', 'infinité']);
        let A, b, relationFactor = 0;
        if (kind === 'unique') {
          do {
            A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-5, 5)));
          } while (determinant(A) === 0);
          const solution = [rnd(-4, 4), rnd(-4, 4)];
          b = A.map(row => row[0] * solution[0] + row[1] * solution[1]);
        } else {
          const a = rnd(-5, 5) || 1, c = rnd(-5, 5), k = pick([-3, -2, 2, 3]);
          relationFactor = k;
          A = [[a, c], [k * a, k * c]];
          const firstResult = rnd(-6, 6);
          b = [firstResult, kind === 'infinité' ? k * firstResult : k * firstResult + pick([-3, -2, 2, 3])];
        }
        const det = determinant(A), answer = kind === 'unique' ? 'Une solution unique' : kind === 'aucune' ? 'Aucune solution' : 'Une infinité de solutions';
        return mc(`Combien de solutions possède le système $${system(A, b)}$ ?`, answer,
          ['Une solution unique', 'Aucune solution', 'Une infinité de solutions'].filter(choice => choice !== answer),
          [`Le déterminant de la matrice des coefficients vaut $${A[0][0]}\\times${A[1][1]}-${A[0][1]}\\times${A[1][0]}=${det}$.`,
            det !== 0 ? 'Il est non nul : la matrice est inversible et le système possède une solution unique.'
              : kind === 'aucune' ? `Les coefficients de la deuxième équation sont ${relationFactor} fois ceux de la première, mais son résultat ${b[1]} n’est pas ${relationFactor} fois ${b[0]} : le système est incompatible.`
                : `La deuxième équation est ${relationFactor} fois la première, y compris pour le résultat : les deux équations décrivent la même droite.`]);
      }
    }]
  },
  {
    name: 'Niveau 3 — Résoudre un système à solution entière', rounds: 5,
    exercises: [{
      type: 'Résoudre un système par la matrice inverse',
      generate() {
        let A;
        do {
          A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-4, 4)));
        } while (determinant(A) === 0);
        const solution = [rnd(-5, 5), rnd(-5, 5)];
        const b = A.map(row => row[0] * solution[0] + row[1] * solution[1]);
        const det = determinant(A), answer = pair(...solution);
        const swapped = pair(solution[1], solution[0]), wrongSign = pair(-solution[0], solution[1]);
        const steps = [
          `On écrit $A=${mat(A)}$ et $\\vec{b}=${column(b)}$.`,
          `Déterminant : $${A[0][0]}\\times${A[1][1]}-${A[0][1]}\\times${A[1][0]}=${det}\\neq0$. L’inverse existe.`,
          `Pour $A\\vec{x}=\\vec{b}$, on calcule $\\vec{x}=A^{-1}\\vec{b}$.`,
          `Première coordonnée : $\\frac{${A[1][1]}\\times${b[0]}-${A[0][1]}\\times${b[1]}}{${det}}=${solution[0]}$.`,
          `Deuxième coordonnée : $\\frac{${A[0][0]}\\times${b[1]}-${A[1][0]}\\times${b[0]}}{${det}}=${solution[1]}$.`,
          `La solution est $(x,y)=${answer}$.`];
        return mc(`Résoudre le système $${system(A, b)}$.`, answer, [swapped, wrongSign, pair(solution[0] + 1, solution[1])], steps);
      }
    }]
  },
  {
    name: 'Niveau 4 — Résoudre avec des fractions', rounds: 5,
    exercises: [{
      type: 'Résoudre un système avec la matrice inverse',
      generate() {
        let A, b, result;
        do {
          A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-5, 5)));
          b = [rnd(-9, 9), rnd(-9, 9)];
          if (determinant(A) !== 0) result = solve(A, b);
        } while (determinant(A) === 0 || result.every(value => !value.includes('frac')));
        const det = determinant(A), answer = solutionChoice(...result);
        return mc(`Résoudre exactement le système $${system(A, b)}$.`, answer,
          [solutionChoice(result[1], result[0]), solutionChoice(result[0], result[1] === '0' ? '1' : '0'), solutionChoice(result[0], `(${result[1]}+1)`)],
          [`La matrice des coefficients est $A=${mat(A)}$ et $\\det(A)=${A[0][0]}\\times${A[1][1]}-${A[0][1]}\\times${A[1][0]}=${det}\\neq0$.`,
            `On applique $A^{-1}$ : $x=\\frac{${A[1][1]}\\times${b[0]}-${A[0][1]}\\times${b[1]}}{${det}}=${result[0]}$.`,
            `De même, $y=\\frac{${A[0][0]}\\times${b[1]}-${A[1][0]}\\times${b[0]}}{${det}}=${result[1]}$.`,
            `La solution exacte est $${pair(...result)}$.`]);
      }
    }]
  },
  {
    name: 'Niveau 5 — Vérifier et interpréter une solution', rounds: 5,
    exercises: [{
      type: 'Vérifier une solution de système',
      generate() {
        let A;
        do {
          A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-6, 6)));
        } while (determinant(A) === 0);
        const solution = [rnd(-5, 5), rnd(-5, 5)];
        const b = A.map(row => row[0] * solution[0] + row[1] * solution[1]);
        const candidate = Math.random() < 0.5 ? solution : [solution[0] + pick([-2, -1, 1, 2]), solution[1]];
        const valid = candidate[0] === solution[0] && candidate[1] === solution[1];
        return mc(`Le couple $${pair(...candidate)}$ est-il solution du système $${system(A, b)}$ ?`, valid ? 'Oui' : 'Non',
          [valid ? 'Non' : 'Oui', 'Oui si les deux droites sont parallèles', 'Le déterminant suffit à vérifier le couple'],
          [`Première équation : ${A[0][0]} × ${candidate[0]} + ${A[0][1]} × ${candidate[1]} = ${A[0][0] * candidate[0] + A[0][1] * candidate[1]}, alors que le membre de droite vaut ${b[0]}.`,
            `Deuxième équation : ${A[1][0]} × ${candidate[0]} + ${A[1][1]} × ${candidate[1]} = ${A[1][0] * candidate[0] + A[1][1] * candidate[1]}, alors que le membre de droite vaut ${b[1]}.`,
            valid ? 'Les deux égalités sont vérifiées : le couple est solution.' : 'Au moins une égalité n’est pas vérifiée : le couple n’est pas solution.']);
      }
    }]
  }
];

EM.lesson({ slides, series: levels, progressiveSeries: true });
