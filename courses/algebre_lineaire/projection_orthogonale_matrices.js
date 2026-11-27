/* EasyMath — Leçon : projection orthogonale et matrices de projection */
const slides = [
  String.raw`# Projection d’un vecteur sur une direction

Soient $u$ un vecteur et $v\neq0$ une direction. La projection orthogonale de $u$ sur la droite dirigée par $v$ est

$$\operatorname{proj}_v(u)=\frac{u\cdot v}{v\cdot v}v=\frac{u\cdot v}{\|v\|^2}v.$$

Le résultat est parallèle à $v$. Le vecteur résiduel $u-\operatorname{proj}_v(u)$ est orthogonal à $v$.`,
  String.raw`# Exemple de projection dans le plan

Prenons $u=(3,4)$ et $v=(1,0)$. Alors $u\cdot v=3\times1+4\times0=3$ et $v\cdot v=1^2+0^2=1$. Donc

$$\operatorname{proj}_v(u)=\frac{3}{1}(1,0)=(3,0).$$

La projection est l’ombre de $u$ sur la droite de direction $v$.`,
  String.raw`# Exemple : projection et distance à une droite

Prenons $u=(5,2)$ et $v=(1,3)$. Le produit scalaire vaut $5\times1+2\times3=11$ et $v\cdot v=1^2+3^2=10$. Ainsi,

$$\operatorname{proj}_v(u)=\frac{11}{10}(1,3)=\left(\frac{11}{10},\frac{33}{10}\right).$$

Le résidu est $u-\operatorname{proj}_v(u)=\left(\frac{39}{10},-\frac{13}{10}\right)$. Il est orthogonal à $v$, car $\frac{39}{10}\times1-\frac{13}{10}\times3=0$. La distance vaut

$$\left\|u-\operatorname{proj}_v(u)\right\|=\sqrt{\left(\frac{39}{10}\right)^2+\left(-\frac{13}{10}\right)^2}=\frac{13\sqrt{10}}{10}.$$`,
  String.raw`# Matrice de projection sur une droite

Pour un vecteur colonne $v\neq0$, la projection de $u$ s’écrit $Pu$, avec

$$P=\frac{vv^{\mathsf T}}{v^{\mathsf T}v}.$$

Par exemple, si $v=\begin{pmatrix}2\\1\end{pmatrix}$, alors $v^{\mathsf T}v=5$ et

$$P=\frac15\begin{pmatrix}4&2\\2&1\end{pmatrix}.$$

La matrice de projection vérifie $P^{\mathsf T}=P$ et $P^2=P$.`,
  String.raw`# Projection sur un sous-espace

Soit $V$ une matrice dont les colonnes forment une base d’un sous-espace. Si ces colonnes sont indépendantes, $V^{\mathsf T}V$ est inversible et la matrice de projection orthogonale est

$$P=V(V^{\mathsf T}V)^{-1}V^{\mathsf T}.$$

Pour projeter $u$, on calcule $Pu$. Si le sous-espace est un plan de $\mathbb{R}^3$ de vecteur normal $n$, une formule équivalente est $P=I-\frac{nn^{\mathsf T}}{n^{\mathsf T}n}$.`,
  String.raw`# Exemple et distance perpendiculaire

Pour $u=(3,4)$ et $v=(2,1)$, on a $u\cdot v=3\times2+4\times1=10$ et $v\cdot v=2^2+1^2=5$. Ainsi,

$$\operatorname{proj}_v(u)=\frac{10}{5}(2,1)=(4,2).$$

Le résidu est $u-\operatorname{proj}_v(u)=(-1,2)$ ; il est orthogonal à $v$ car $(-1)\times2+2\times1=0$. La distance de $u$ à la droite est la norme du résidu : $\sqrt{(-1)^2+2^2}=\sqrt5$.`,
  String.raw`# Applications

Les projections orthogonales interviennent dans la régression linéaire, les moindres carrés, la réduction de dimension par ACP/PCA et les calculs de distances en géométrie. En vision 3D, elles servent à relier des points à des plans ou à des directions.

Pour un calcul : déterminer les produits scalaires, trouver le coefficient de projection, multiplier le vecteur directeur par ce coefficient, puis vérifier l’orthogonalité du résidu. Pour la distance, calculer la norme de ce résidu.`
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
const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
const frac = (n, d) => {
  const sign = d < 0 ? -1 : 1, divisor = gcd(n, d) || 1;
  const numerator = n * sign / divisor, denominator = Math.abs(d) / divisor;
  return denominator === 1 ? String(numerator) : `\\frac{${numerator}}{${denominator}}`;
};
const mat = rows => `\\begin{pmatrix}${rows.map(row => row.join('&')).join('\\\\')}\\end{pmatrix}`;
const vector = values => `\\begin{pmatrix}${values.join('\\\\')}\\end{pmatrix}`;
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

const levels = [
  {
    name: 'Niveau 1 — Projeter un vecteur sur une direction', rounds: 5,
    exercises: [{
      type: 'Calculer une projection vectorielle',
      generate() {
        const u = [rnd(-5, 5), rnd(-5, 5)];
        let v;
        do { v = [rnd(-4, 4), rnd(-4, 4)]; } while (v[0] === 0 && v[1] === 0);
        const dot = u[0] * v[0] + u[1] * v[1], norm2 = v[0] ** 2 + v[1] ** 2;
        const projected = v.map(x => frac(dot * x, norm2));
        const answer = vector(projected);
        return mc(`Calculer $\\operatorname{proj}_v(u)$ pour $u=${vector(u)}$ et $v=${vector(v)}$.`, answer,
          [vector([u[0], u[1]]), vector(projected.map(x => `-${x}`)), vector([frac(dot, norm2), frac(dot, norm2)])],
          [`Produit scalaire : $u\\cdot v=${u[0]}\\times${v[0]}+${u[1]}\\times${v[1]}=${u[0] * v[0]}+${u[1] * v[1]}=${dot}$.`,
            `Norme au carré : $v\\cdot v=${v[0]}^2+${v[1]}^2=${norm2}$.`,
            `Coefficient de projection : $\\frac{u\\cdot v}{v\\cdot v}=\\frac{${dot}}{${norm2}}=${frac(dot, norm2)}$.`,
            `On multiplie chaque coordonnée de $v$ par ce coefficient : $\\operatorname{proj}_v(u)=${answer}$.`]);
      }
    }]
  },
  {
    name: 'Niveau 2 — Vérifier l’orthogonalité du résidu', rounds: 5,
    exercises: [{
      type: 'Interpréter une projection orthogonale',
      generate() {
        const u = [rnd(-5, 5), rnd(-5, 5)];
        let v;
        do { v = [rnd(-4, 4), rnd(-4, 4)]; } while (v[0] === 0 && v[1] === 0);
        const dot = u[0] * v[0] + u[1] * v[1], norm2 = v[0] ** 2 + v[1] ** 2;
        const residualNumerators = [u[0] * norm2 - dot * v[0], u[1] * norm2 - dot * v[1]];
        const dotNumerator = v[0] * residualNumerators[0] + v[1] * residualNumerators[1];
        const answer = 'Le projeté est parallèle à v et le résidu est orthogonal à v.';
        return mc(`On projette $u=${vector(u)}$ sur $v=${vector(v)}$. Quelle propriété est toujours vérifiée ?`, answer,
          ['Le projeté est orthogonal à v et le résidu est parallèle à v.', 'Le résidu est toujours nul.', 'Le projeté est toujours égal à u.'],
          [`Le coefficient de projection vaut $\\frac{${dot}}{${norm2}}$. Le projeté est donc ce nombre multiplié par $v$ : il est parallèle à $v$.`,
            `Le résidu s’écrit $u-\\operatorname{proj}_v(u)$. Ses coordonnées sont $\\left(\\frac{${residualNumerators[0]}}{${norm2}},\\frac{${residualNumerators[1]}}{${norm2}}\\right)$.`,
            `Produit scalaire du résidu par $v$ : $\\frac{${v[0]}\\times${residualNumerators[0]}+${v[1]}\\times${residualNumerators[1]}}{${norm2}}=\\frac{${dotNumerator}}{${norm2}}=0$. Le résidu est orthogonal à $v$.`]);
      }
    }]
  },
  {
    name: 'Niveau 3 — Construire la matrice de projection sur une droite', rounds: 5,
    exercises: [{
      type: 'Calculer une matrice de projection',
      generate() {
        let v;
        do { v = [rnd(-4, 4), rnd(-4, 4)]; } while ((v[0] === 0 && v[1] === 0) || v[0] ** 2 + v[1] ** 2 === 1);
        const norm2 = v[0] ** 2 + v[1] ** 2;
        const P = [[frac(v[0] ** 2, norm2), frac(v[0] * v[1], norm2)], [frac(v[0] * v[1], norm2), frac(v[1] ** 2, norm2)]];
        const wrong = [[frac(v[0], norm2), frac(v[1], norm2)], [frac(v[1], norm2), frac(v[0], norm2)]];
        const answer = mat(P);
        return mc(`Quelle est la matrice de projection orthogonale sur la droite dirigée par $v=${vector(v)}$ ?`, answer,
          [mat([[frac(v[0] ** 2, norm2), frac(-v[0] * v[1], norm2)], [frac(-v[0] * v[1], norm2), frac(v[1] ** 2, norm2)]]), mat(wrong), mat([[1, 0], [0, 1]])],
          [`On utilise $P=\\frac{vv^{\\mathsf T}}{v^{\\mathsf T}v}$.`,
            `$v^{\\mathsf T}v=${v[0]}^2+${v[1]}^2=${norm2}$.`,
            `Le produit extérieur est $vv^{\\mathsf T}=${mat([[v[0] ** 2, v[0] * v[1]], [v[0] * v[1], v[1] ** 2]])}$.`,
            `On divise chaque coefficient par ${norm2} : $P=${answer}$.`]);
      }
    }]
  },
  {
    name: 'Niveau 4 — Projeter sur un plan de $\\mathbb{R}^3$', rounds: 5,
    exercises: [{
      type: 'Calculer la matrice de projection sur un plan',
      generate() {
        let n;
        do { n = [rnd(-3, 3), rnd(-3, 3), rnd(-3, 3)]; } while (n.every(x => x === 0) || n.every(x => Math.abs(x) === 1));
        const norm2 = n.reduce((sum, x) => sum + x * x, 0);
        const P = n.map((row, i) => n.map((col, j) => frac((i === j ? norm2 : 0) - row * col, norm2)));
        const answer = mat(P);
        const wrongPlus = n.map((row, i) => n.map((col, j) => frac((i === j ? norm2 : 0) + row * col, norm2)));
        return mc(`Le plan $n\\cdot x=0$ a pour vecteur normal $n=${vector(n)}$. Quelle est sa matrice de projection orthogonale ?`, answer,
          [mat(wrongPlus), mat([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), mat(n.map((row, i) => n.map((col, j) => frac(row * col, norm2))))],
          [`On utilise $P=I-\\frac{nn^{\\mathsf T}}{n^{\\mathsf T}n}$.`,
            `$n^{\\mathsf T}n=${n[0]}^2+${n[1]}^2+${n[2]}^2=${norm2}$.`,
            `Le produit $nn^{\\mathsf T}$ vaut $${mat(n.map(row => n.map(col => row * col)))}$.`,
            ...P.flatMap((row, i) => row.map((value, j) => `Coefficient (${i + 1}, ${j + 1}) : $${i === j ? '1' : '0'}-\\frac{${n[i]}\\times${n[j]}}{${norm2}}=${value}$.`)),
            `Donc $P=${answer}$.`]);
      }
    }]
  },
  {
    name: 'Niveau 5 — Calculer la distance à une droite', rounds: 5,
    exercises: [{
      type: 'Calculer une distance perpendiculaire',
      generate() {
        let u, determinant;
        const v = [1, 3], norm2 = 10;
        do {
          u = Math.random() < 0.2 ? [5, 2] : [rnd(-5, 5), rnd(-5, 5)];
          determinant = v[0] * u[1] - v[1] * u[0];
        } while (determinant === 0);
        const dot = u[0] + 3 * u[1], q = Math.abs(determinant);
        const projection = [frac(dot, norm2), frac(3 * dot, norm2)];
        const residualNumerators = [10 * u[0] - dot, 10 * u[1] - 3 * dot];
        const residualSquaredNumerator = residualNumerators[0] ** 2 + residualNumerators[1] ** 2;
        const answer = `$\\frac{${q}\\sqrt{10}}{10}$`;
        return mc(`Pour $u=${vector(u)}$ et $v=${vector(v)}$, quelle est la distance de $u$ à la droite engendrée par $v$ ?`, answer,
          [`$${q}$`, `$\\frac{${q}}{10}$`, `$\\frac{${q}\\sqrt{10}}{5}$`],
          [`Produit scalaire : $u\\cdot v=${u[0]}\\times1+${u[1]}\\times3=${u[0]}+${3 * u[1]}=${dot}$.`,
            `Norme au carré : $v\\cdot v=1^2+3^2=10$. Le coefficient de projection est $\\frac{${dot}}{10}$.`,
            `Projection : $\\operatorname{proj}_v(u)=\\frac{${dot}}{10}(1,3)=(${projection[0]},${projection[1]})$.`,
            `Résidu : $u-\\operatorname{proj}_v(u)=\\left(\\frac{${residualNumerators[0]}}{10},\\frac{${residualNumerators[1]}}{10}\\right)$.`,
            `Vérification : $${residualNumerators[0]}\\times1+${residualNumerators[1]}\\times3=0$, donc le résidu est perpendiculaire à $v$.`,
            `Sa norme vaut $\\sqrt{\\frac{${residualNumerators[0]}^2+${residualNumerators[1]}^2}{100}}=\\sqrt{\\frac{${residualSquaredNumerator}}{100}}=\\sqrt{\\frac{${q ** 2}\\times10}{100}}=\\frac{${q}\\sqrt{10}}{10}$.`]);
      }
    }]
  }
];

EM.lesson({ slides, series: levels, progressiveSeries: true });
