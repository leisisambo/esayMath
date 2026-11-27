/* EasyMath — Leçon : le déterminant et ses applications */
const slides = [
  String.raw`# Le déterminant en dimension 2

À une matrice carrée $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$, on associe le nombre

$$\det(A)=ad-bc.$$

Exemple : si $A=\begin{pmatrix}3&2\\1&4\end{pmatrix}$, alors $\det(A)=3\times4-2\times1=10$. Comme ce déterminant est non nul, $A$ est inversible.`,
  String.raw`# Le déterminant en dimension 3 : règle de Sarrus

Pour $B=\begin{pmatrix}a&b&c\\d&e&f\\g&h&i\end{pmatrix}$, la règle de Sarrus donne

$$\det(B)=aei+bfg+cdh-ceg-bdi-afh.$$

On additionne les trois produits dans le sens descendant, puis on soustrait les trois produits dans le sens montant.

Exemple : pour $B=\begin{pmatrix}1&2&3\\0&4&5\\1&0&6\end{pmatrix}$,

$$\det(B)=(24+10+0)-(12+0+0)=22.$$

La règle de Sarrus s’applique uniquement aux matrices $3\times3$.`,
  String.raw`# Inversibilité et dépendance linéaire

Une matrice carrée est inversible si et seulement si son déterminant est non nul.

En dimension 2, un déterminant nul signifie que les deux colonnes sont colinéaires. En dimension 3, les trois colonnes sont alors coplanaires. Dans les deux cas, les colonnes sont dépendantes et la transformation perd au moins une direction.`,
  String.raw`# Aire, volume et signe

En dimension 2, la valeur absolue du déterminant est le facteur par lequel la transformation multiplie les aires. En dimension 3, elle multiplie les volumes.

- Si le déterminant est positif, l’orientation est conservée.
- Si le déterminant est négatif, l’orientation est inversée.
- Si le déterminant est nul, la transformation aplatit l’espace dans au moins une direction.

Le signe donne l’orientation ; la valeur absolue donne le facteur d’aire ou de volume.`,
  String.raw`# Applications aux transformations d’images

Pour une transformation linéaire ou affine, le déterminant de sa partie linéaire indique son facteur d’aire : si $|\det(A)|>1$, les aires sont agrandies ; si $0<|\det(A)|<1$, elles sont réduites. Un déterminant nul indique une perte de dimension et l’absence d’inverse.

Pour une homographie, la matrice homogène non singulière garantit que la transformation est inversible. Le facteur local d’aire dépend toutefois du déterminant de son jacobien, qui peut varier selon le point de l’image.`,
  String.raw`# Méthode de calcul

Pour une matrice $2\times2$, repérer $a,b,c,d$, calculer $ad$ et $bc$, puis faire $ad-bc$. Pour une matrice $3\times3$, écrire séparément les six produits de Sarrus, additionner les trois premiers, puis soustraire la somme des trois autres.

Enfin, utiliser le résultat : nul signifie non-inversible ; le signe indique l’orientation ; la valeur absolue donne le facteur d’aire ou de volume.`
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
const det3 = A => {
  const [[a, b, c], [d, e, f], [g, h, i]] = A;
  return a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;
};

const levels = [
  {
    name: 'Niveau 1 — Calculer un déterminant $2\\times2$', rounds: 5,
    exercises: [{
      type: 'Calculer un déterminant en dimension 2',
      generate() {
        const A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-8, 8)));
        const [a, b] = A[0], [c, d] = A[1];
        const ad = a * d, bc = b * c, det = ad - bc;
        return mc(`Calculer $\\det(A)$ si $A=${mat(A)}$.`, String(det),
          [String(ad + bc), String(a * d), String(b * c - a * d)],
          [`On applique $\\det(A)=ad-bc$.`, `Produit diagonal principal : $${a}\\times${d}=${ad}$.`, `Produit de l’autre diagonale : $${b}\\times${c}=${bc}$.`, `Différence : $${ad}-${bc}=${det}$. Donc $\\det(A)=${det}$.`]);
      }
    }]
  },
  {
    name: 'Niveau 2 — Relier déterminant et inversibilité', rounds: 5,
    exercises: [{
      type: 'Tester l’inversibilité avec le déterminant',
      generate() {
        const invertible = Math.random() < 0.5;
        let A;
        if (invertible) {
          do {
            A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd(-6, 6)));
          } while (det2(A) === 0);
        } else {
          const a = rnd(-5, 5) || 1, b = rnd(-5, 5), k = pick([-3, -2, 2, 3]);
          A = [[a, b], [k * a, k * b]];
        }
        const det = det2(A), answer = invertible ? 'Oui' : 'Non';
        return mc(`La matrice $A=${mat(A)}$ est-elle inversible ?`, answer,
          [invertible ? 'Non' : 'Oui', 'Oui, car elle est carrée', 'Non, car elle contient un zéro'],
          [`On calcule $\\det(A)=${A[0][0]}\\times${A[1][1]}-${A[0][1]}\\times${A[1][0]}=${det}$.`,
            det === 0 ? 'Le déterminant est nul : la matrice n’est pas inversible.' : 'Le déterminant est non nul : la matrice est inversible.']);
      }
    }]
  },
  {
    name: 'Niveau 3 — Appliquer la règle de Sarrus', rounds: 5,
    exercises: [{
      type: 'Calculer un déterminant en dimension 3',
      generate() {
        const A = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => rnd(-4, 4)));
        const [[a, b, c], [d, e, f], [g, h, i]] = A;
        const down = [a * e * i, b * f * g, c * d * h];
        const up = [c * e * g, b * d * i, a * f * h];
        const positive = down.reduce((sum, x) => sum + x, 0);
        const negative = up.reduce((sum, x) => sum + x, 0);
        const det = positive - negative;
        return mc(`Calculer $\\det(A)$ par la règle de Sarrus si $A=${mat(A)}$.`, String(det),
          [String(positive + negative), String(negative - positive), String(down[0] + down[1] - up[0])],
          [`Produits descendants :`, `${a} × ${e} × ${i} = ${down[0]}.`, `${b} × ${f} × ${g} = ${down[1]}.`, `${c} × ${d} × ${h} = ${down[2]}.`,
            `Somme descendante : ${down[0]} + ${down[1]} + ${down[2]} = ${positive}.`,
            `Produits montants : ${c} × ${e} × ${g} = ${up[0]} ; ${b} × ${d} × ${i} = ${up[1]} ; ${a} × ${f} × ${h} = ${up[2]}.`,
            `Somme montante : ${up[0]} + ${up[1]} + ${up[2]} = ${negative}.`,
            `Déterminant : ${positive} − ${negative} = ${det}.`]);
      }
    }]
  },
  {
    name: 'Niveau 4 — Interpréter le signe et le facteur d’aire', rounds: 5,
    exercises: [{
      type: 'Interpréter un déterminant géométriquement',
      generate() {
        const x = pick([-4, -3, -2, -1, 1, 2, 3, 4]);
        const y = pick([-4, -3, -2, -1, 1, 2, 3, 4]);
        const det = x * y, factor = Math.abs(det);
        const orientation = det < 0 ? 'inversée' : 'conservée';
        const answer = `L’aire est multipliée par ${factor} et l’orientation est ${orientation}.`;
        const otherOrientation = det < 0 ? 'conservée' : 'inversée';
        return mc(`Une transformation du plan a pour matrice $A=${mat([[x, 0], [0, y]])}$. Quel est l’effet sur une aire orientée ?`, answer,
          [`L’aire est multipliée par ${det} et l’orientation est ${orientation}.`, `L’aire est multipliée par ${factor} et l’orientation est ${otherOrientation}.`, 'L’aire est inchangée quelle que soit la matrice.'],
          [`Le déterminant vaut $${x}\\times${y}=${det}$.`, `Le facteur d’aire est sa valeur absolue : $|${det}|=${factor}$.`, `Comme le déterminant est ${det < 0 ? 'négatif' : 'positif'}, l’orientation est ${orientation}.`]);
      }
    }]
  },
  {
    name: 'Niveau 5 — Relier dépendance, volume et transformation', rounds: 5,
    exercises: [
      {
        type: 'Interpréter le déterminant en dimension 3',
        generate() {
          const diagonal = [pick([-3, -2, -1, 1, 2, 3]), pick([-3, -2, -1, 1, 2, 3]), pick([-3, -2, -1, 1, 2, 3])];
          const A = [[diagonal[0], 0, 0], [0, diagonal[1], 0], [0, 0, diagonal[2]]];
          const det = diagonal.reduce((product, value) => product * value, 1);
          const factor = Math.abs(det), orientation = det < 0 ? 'inversée' : 'conservée';
          const answer = `Le volume est multiplié par ${factor} et l’orientation est ${orientation}.`;
          return mc(`La transformation de matrice $A=${mat(A)}$ agit sur l’espace. Quelle interprétation donne son déterminant ?`, answer,
            [`Le volume est multiplié par ${det} et l’orientation est ${orientation}.`, `Le volume est multiplié par ${factor} et l’orientation est ${det < 0 ? 'conservée' : 'inversée'}.`, 'Le volume est toujours conservé.'],
            [`Le déterminant d’une matrice diagonale est le produit de ses termes diagonaux : ${diagonal[0]} × ${diagonal[1]} × ${diagonal[2]} = ${det}.`,
              `Le facteur de volume est $|${det}|=${factor}$.`, `Le déterminant ${det < 0 ? 'négatif' : 'positif'} indique que l’orientation est ${orientation}.`]);
        }
      },
      {
        type: 'Reconnaître des vecteurs dépendants avec le déterminant',
        generate() {
          const a = rnd(-5, 5) || 1, b = rnd(-5, 5), k = pick([-3, -2, 2, 3]);
          const A = [[a, k * a], [b, k * b]];
          return mc(`Les colonnes de $A=${mat(A)}$ sont-elles linéairement indépendantes ?`, 'Non',
            ['Oui', 'Seulement si le déterminant est négatif', 'On ne peut pas le savoir'],
            [`Le déterminant vaut $${a}\\times${k * b}-${k * a}\\times${b}=${a * k * b - k * a * b}=0$.`,
              `La seconde colonne est ${k} fois la première : les colonnes sont dépendantes.`]);
        }
      }
    ]
  }
];

EM.lesson({ slides, series: levels, progressiveSeries: true });
