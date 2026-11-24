/* Lecon EasyMath : equations du premier degre a une inconnue.
 * A coller dans le champ Script d'une lecon EasyMath.
 */
EM.lesson({
  slides: [
    `# Les équations du premier degré

Une **équation** est une égalité qui contient une inconnue, souvent notée $x$. Résoudre l'équation consiste à trouver la valeur de $x$ qui rend l'égalité vraie.

Exemple : $x+3=7$. La valeur $x=4$ convient, car $4+3=7$.

Dans une équation du **premier degré**, l'inconnue n'est pas élevée au carré ou à une puissance supérieure : $x$ apparaît à la puissance 1.`,

    `# L'égalité fonctionne comme une balance

Pour conserver une égalité, on effectue la **même opération sur ses deux membres**.

Exemple : $x+3=7$.

On soustrait 3 à gauche et à droite :

$$x+3-3=7-3$$

Donc $x=4$.

Dire qu'un terme « passe de l'autre côté en changeant de signe » est un raccourci pour cette opération faite des deux côtés.`,

    `# Annuler une addition ou une soustraction

Pour isoler $x$, on annule l'opération qui lui est appliquée.

**Exemple :** $x+5=12$.

On soustrait 5 aux deux membres : $x+5-5=12-5$, donc $x=7$.

**Exemple :** $x-4=9$.

On ajoute 4 aux deux membres : $x-4+4=9+4$, donc $x=13$.

Vérifie : $7+5=12$ et $13-4=9$.`,

    `# Annuler une multiplication ou une division

**Exemple :** $3x=15$, c'est-à-dire $3\times x=15$.

On divise les deux membres par 3 : $\\frac{3x}{3}=\\frac{15}{3}$, donc $x=5$.

**Exemple :** $\\frac{x}{4}=6$.

On multiplie les deux membres par 4 : $\\frac{x}{4}\\times4=6\\times4$, donc $x=24$.

On ne divise jamais par zéro.`,

    `# Plusieurs opérations

Résolvons $3x+5=20$ en gardant l'égalité à chaque étape.

1. Soustraire 5 aux deux membres : $3x+5-5=20-5$, donc $3x=15$.
2. Diviser les deux membres par 3 : $\\frac{3x}{3}=\\frac{15}{3}$.
3. On obtient $x=5$.

On annule d'abord l'addition, puis la multiplication.`,

    `# L'inconnue des deux côtés

Résolvons $5x+2=2x+11$.

1. Soustraire $2x$ aux deux membres : $5x-2x+2=2x-2x+11$, donc $3x+2=11$.
2. Soustraire 2 aux deux membres : $3x+2-2=11-2$, donc $3x=9$.
3. Diviser les deux membres par 3 : $x=3$.

On regroupe les termes en $x$ d'un côté et les nombres de l'autre.`,

    `# Vérifier une solution

Pour vérifier une solution, remplace $x$ par la valeur trouvée **dans l'équation de départ**.

Pour $5x+2=2x+11$ et $x=3$ :

- À gauche : $5\\times3+2=17$.
- À droite : $2\\times3+11=17$.

Les deux membres sont égaux, donc $x=3$ est bien une solution.`,

    `# Les erreurs à éviter

- Pour $x+7=15$, soustrais 7 : $x=15-7$, pas $15+7$.
- Pour $4x=20$, divise par 4 : $x=20\\div4$, ne soustrais pas 4.
- Pour $x-6=-2$, ajoute 6 : $x=-2+6=4$.
- Quand tu fais une opération, applique-la aux **deux membres**.

Après avoir résolu, remplace $x$ dans l'équation de départ pour contrôler le résultat.`
  ],
  rounds: 16,
  exercises: [{
    type: 'Équation du premier degré',
    generate() {
      const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
      const makeChoices = (answer) => {
        const values = [answer, answer + rand(1, 4), answer - rand(1, 4), answer + rand(5, 8)];
        return [...new Set(values)].slice(0, 3).map(String);
      };
      const build = (question, answer, choices, steps) => ({
        question, choices, correctIndex: choices.indexOf(String(answer)), steps, timeout: 60
      });
      const questions = [
        () => {
          const a = rand(2, 12), x = rand(1, 15), b = a + x;
          const choices = makeChoices(x);
          return build(`Résous $x+${a}=${b}$.`, x, choices, [
            `On veut isoler $x$. On soustrait ${a} aux deux membres.`,
            `$x+${a}-${a}=${b}-${a}$. À gauche, $${a}-${a}=0$, donc il reste $x$.`,
            `À droite, $${b}-${a}=${x}$. Donc $x=${x}$.`,
            `Vérification : $${x}+${a}=${b}$, l'égalité est vraie.`
          ]);
        },
        () => {
          const a = rand(2, 12), x = rand(1, 15), b = x - a;
          const choices = makeChoices(x);
          return build(`Résous $x-${a}=${b}$.`, x, choices, [
            `On veut annuler $-${a}$. On ajoute ${a} aux deux membres.`,
            `$x-${a}+${a}=${b}+${a}$. À gauche, $-${a}+${a}=0$, il reste $x$.`,
            `À droite, $${b}+${a}=${x}$. Donc $x=${x}$.`,
            `Vérification : $${x}-${a}=${b}$.`
          ]);
        },
        () => {
          const a = rand(2, 9), x = rand(2, 12), b = a * x;
          const choices = makeChoices(x);
          return build(`Résous $${a}x=${b}$.`, x, choices, [
            `$${a}x$ signifie $${a}\\times x$. Pour isoler $x$, on divise les deux membres par ${a}.`,
            `$\\frac{${a}x}{${a}}=\\frac{${b}}{${a}}$. À gauche, $${a}\\div${a}=1$, donc il reste $x$.`,
            `À droite, $${b}\\div${a}=${x}$. Donc $x=${x}$.`,
            `Vérification : $${a}\\times${x}=${b}$.`
          ]);
        },
        () => {
          const a = rand(2, 9), x = rand(2, 12), b = x / a;
          const choices = makeChoices(x);
          return build(`Résous $\\frac{x}{${a}}=${b}$.`, x, choices, [
            `Pour annuler la division par ${a}, on multiplie les deux membres par ${a}.`,
            `$\\frac{x}{${a}}\\times${a}=${b}\\times${a}$. À gauche, les facteurs ${a} se simplifient.`,
            `À droite, $${b}\\times${a}=${x}$. Donc $x=${x}$.`,
            `Vérification : $${x}\\div${a}=${b}$.`
          ]);
        },
        () => {
          const a = rand(2, 8), x = rand(2, 12), b = rand(1, 12), c = a * x + b;
          const choices = makeChoices(x);
          return build(`Résous $${a}x+${b}=${c}$.`, x, choices, [
            `On commence par annuler $+${b}$. On soustrait ${b} aux deux membres.`,
            `$${a}x+${b}-${b}=${c}-${b}$, donc $${a}x=${c - b}$.`,
            `On divise maintenant les deux membres par ${a} : $\\frac{${a}x}{${a}}=\\frac{${c - b}}{${a}}$.`,
            `À gauche, il reste $x$. À droite, $${c - b}\\div${a}=${x}$. Donc $x=${x}$.`,
            `Vérification : $${a}\\times${x}+${b}=${c}$.`
          ]);
        },
        () => {
          const a = rand(3, 9), d = rand(1, a - 1), x = rand(1, 10), b = rand(1, 12);
          const c = (a - d) * x + b;
          const choices = makeChoices(x);
          return build(`Résous $${a}x+${b}=${d}x+${c}$.`, x, choices, [
            `L'inconnue apparaît des deux côtés. On soustrait $${d}x$ aux deux membres : $${a}x-${d}x+${b}=${c}$.`,
            `On réduit les termes en $x$ : $${a - d}x+${b}=${c}$.`,
            `On soustrait ${b} aux deux membres : $${a - d}x=${c}-${b}=${c - b}$.`,
            `On divise les deux membres par ${a - d} : $x=${c - b}\\div${a - d}=${x}$.`,
            `Vérification dans l'équation de départ : à gauche $${a}\\times${x}+${b}=${a * x + b}$ ; à droite $${d}\\times${x}+${c}=${d * x + c}$. Les deux résultats sont égaux.`
          ]);
        },
        () => {
          const a = rand(2, 10), x = rand(1, 10), b = rand(1, 10), c = a * x - b;
          const choices = makeChoices(x);
          return build(`Résous $${a}x-${b}=${c}$.`, x, choices, [
            `On annule $-${b}$ en ajoutant ${b} aux deux membres.`,
            `$${a}x-${b}+${b}=${c}+${b}$, donc $${a}x=${c + b}$.`,
            `On divise les deux membres par ${a} : $x=${c + b}\\div${a}=${x}$.`,
            `Vérification : $${a}\\times${x}-${b}=${c}$.`
          ]);
        }
      ];
      const advanced = [
        {
          question: 'Résous $3(2x-5)-4(x+2)=2x-17$.',
          choices: ['Aucune solution', '$x=3$', 'Une infinité de solutions'], correctIndex: 0,
          steps: [
            'On développe chaque parenthèse : $3(2x-5)=6x-15$ et $-4(x+2)=-4x-8$. Attention, le signe $-$ multiplie les deux termes de $(x+2)$.',
            'On réduit le membre gauche : $6x-15-4x-8=2x-23$. L’équation devient $2x-23=2x-17$.',
            'On soustrait $2x$ aux deux membres : $-23=-17$.',
            'Cette égalité est fausse. L’équation n’a donc **aucune solution**.'
          ]
        },
        {
          question: 'Résous $5(3x-2)-2(4x+7)=3(x-6)+9$.',
          choices: ['$x=\\frac{15}{4}$', '$x=4$', 'Aucune solution'], correctIndex: 0,
          steps: [
            'On développe : à gauche, $15x-10-8x-14$ ; à droite, $3x-18+9$.',
            'On réduit : $7x-24=3x-9$.',
            'On soustrait $3x$ aux deux membres : $4x-24=-9$. Puis on ajoute 24 : $4x=15$.',
            'On divise les deux membres par 4 : $x=\\frac{15}{4}$.',
            'Vérification : les deux membres valent $\\frac{9}{4}$. La solution est correcte.'
          ]
        },
        {
          question: 'Résous $7-3(2x-4)=5(x+1)-2$.',
          choices: ['$x=\\frac{16}{11}$', '$x=\\frac{11}{16}$', '$x=2$'], correctIndex: 0,
          steps: [
            'On développe : $-3(2x-4)=-6x+12$ et $5(x+1)=5x+5$.',
            'On réduit : $19-6x=5x+3$.',
            'On ajoute $6x$ aux deux membres : $19=11x+3$. Puis on soustrait 3 : $16=11x$.',
            'On divise par 11 : $x=\\frac{16}{11}$.',
            'Vérification : en remplaçant $x$ dans l’équation, chaque membre vaut $\\frac{113}{11}$. '
          ]
        },
        {
          question: 'Résous $4(2x-3)-3(3x+2)=2(1-x)+5$.',
          choices: ['$x=25$', '$x=-25$', 'Aucune solution'], correctIndex: 0,
          steps: [
            'On développe : à gauche, $8x-12-9x-6$ ; à droite, $2-2x+5$.',
            'On réduit : $-x-18=7-2x$.',
            'On ajoute $2x$ aux deux membres : $x-18=7$. Puis on ajoute 18 aux deux membres : $x=25$.',
            'Vérification dans l’équation de départ : à gauche $4(2\\times25-3)-3(3\\times25+2)=188-231=-43$.',
            'À droite, $2(1-25)+5=-48+5=-43$. Les deux membres sont égaux : $x=25$.'
          ]
        },
        {
          question: 'Résous $\\frac{3x-2}{4}+\\frac{x+1}{3}=5$.',
          choices: ['$x=\\frac{62}{13}$', '$x=\\frac{13}{62}$', '$x=5$'], correctIndex: 0,
          steps: [
            'Le plus petit dénominateur commun de 4 et 3 est 12. On multiplie **tous les termes des deux membres** par 12.',
            '$3(3x-2)+4(x+1)=60$. On a supprimé les dénominateurs : $9x-6+4x+4=60$.',
            'On réduit : $13x-2=60$. On ajoute 2 aux deux membres : $13x=62$.',
            'On divise par 13 : $x=\\frac{62}{13}$. '
          ]
        },
        {
          question: 'Résous $\\frac{2x+5}{3}-\\frac{x-1}{2}=\\frac{7}{6}$.',
          choices: ['$x=-6$', '$x=6$', 'Aucune solution'], correctIndex: 0,
          steps: [
            'Le dénominateur commun est 6. On multiplie chaque membre par 6.',
            '$2(2x+5)-3(x-1)=7$. Attention : $-3(x-1)=-3x+3$.',
            'On développe et réduit : $4x+10-3x+3=7$, donc $x+13=7$.',
            'On soustrait 13 aux deux membres : $x=7-13=-6$.',
            'Vérification : le membre gauche vaut $\\frac{-7}{3}+\\frac{7}{2}=\\frac{-14+21}{6}=\\frac{7}{6}$, comme le membre droit.'
          ]
        },
        {
          question: 'Résous $\\frac{3x-1}{5}+\\frac{2x+3}{4}=\\frac{7x-2}{10}$.',
          choices: ['$x=-\\frac{15}{8}$', '$x=\\frac{15}{8}$', '$x=\\frac{5}{2}$'], correctIndex: 0,
          steps: [
            'Le dénominateur commun de 5, 4 et 10 est 20. On multiplie les deux membres par 20.',
            '$4(3x-1)+5(2x+3)=2(7x-2)$.',
            'On développe : $12x-4+10x+15=14x-4$. On réduit : $22x+11=14x-4$.',
            'On soustrait $14x$ : $8x+11=-4$. On soustrait 11 aux deux membres : $8x=-15$.',
            'On divise par 8 : $x=-\\frac{15}{8}$. '
          ]
        },
        {
          question: 'Résous $\\frac{2(3x-1)}{5}-\\frac{x+4}{3}=\\frac{x-2}{2}$.',
          choices: ['$x=2$', '$x=-2$', '$x=\\frac{11}{2}$'], correctIndex: 0,
          steps: [
            'Le dénominateur commun de 5, 3 et 2 est 30. On multiplie les deux membres par 30.',
            '$12(3x-1)-10(x+4)=15(x-2)$.',
            'On développe : $36x-12-10x-40=15x-30$. On réduit : $26x-52=15x-30$.',
            'On soustrait $15x$ : $11x-52=-30$. On ajoute 52 : $11x=22$.',
            'On divise par 11 : $x=2$. '
          ]
        },
        {
          question: 'Résous $\\frac{3(2x-1)-2(x+4)}{5}=x-3$.',
          choices: ['$x=4$', '$x=-4$', 'Aucune solution'], correctIndex: 0,
          steps: [
            'On développe le numérateur : $3(2x-1)-2(x+4)=6x-3-2x-8=4x-11$.',
            'L’équation devient $\\frac{4x-11}{5}=x-3$. On multiplie les deux membres par 5.',
            '$4x-11=5x-15$. On soustrait $4x$ : $-11=x-15$.',
            'On ajoute 15 aux deux membres : $x=4$. '
          ]
        },
        {
          question: 'Résous $\\frac{2x-3}{4}-\\frac{3x+1}{6}=\\frac{x-5}{3}$.',
          choices: ['$x=\\frac{9}{4}$', '$x=-\\frac{9}{4}$', '$x=9$'], correctIndex: 0,
          steps: [
            'Le dénominateur commun de 4, 6 et 3 est 12. On multiplie les deux membres par 12.',
            '$3(2x-3)-2(3x+1)=4(x-5)$.',
            'On développe : $6x-9-6x-2=4x-20$. On réduit à gauche : $-11=4x-20$.',
            'On ajoute 20 : $9=4x$. On divise par 4 : $x=\\frac{9}{4}$. '
          ]
        },
        {
          question: 'Résous $3[2x-(4-x)]=5(x+2)-7$.',
          choices: ['$x=\\frac{15}{4}$', '$x=4$', 'Aucune solution'], correctIndex: 0,
          steps: [
            'Dans le crochet, $2x-(4-x)=2x-4+x=3x-4$. Le signe moins change les signes dans la parenthèse.',
            'On développe : $3(3x-4)=9x-12$ et $5(x+2)-7=5x+10-7=5x+3$.',
            'L’équation devient $9x-12=5x+3$. On soustrait $5x$ : $4x-12=3$.',
            'On ajoute 12 : $4x=15$. On divise par 4 : $x=\\frac{15}{4}$. '
          ]
        },
        {
          question: 'Résous $\\frac{2(3x-4)}{3}-\\frac{5(x+1)}{2}=1-\\frac{x-3}{6}$.',
          choices: ['$x=-20$', '$x=20$', 'Aucune solution'], correctIndex: 0,
          steps: [
            'Le dénominateur commun est 6. On multiplie tous les termes des deux membres par 6.',
            '$4(3x-4)-15(x+1)=6-(x-3)$.',
            'On développe : $12x-16-15x-15=6-x+3$. On réduit : $-3x-31=9-x$.',
            'On ajoute $3x$ : $-31=9+2x$. On soustrait 9 : $-40=2x$.',
            'On divise par 2 : $x=-20$. '
          ]
        },
        {
          question: 'Résous $5(2x-3)-3(4x+1)=2(x-7)+9$.',
          choices: ['$x=-\\frac{13}{4}$', '$x=\\frac{13}{4}$', 'Aucune solution'], correctIndex: 0,
          steps: [
            'On développe : à gauche $10x-15-12x-3$ ; à droite $2x-14+9$.',
            'On réduit : $-2x-18=2x-5$.',
            'On ajoute $2x$ : $-18=4x-5$. On ajoute 5 : $-13=4x$.',
            'On divise par 4 : $x=-\\frac{13}{4}$. '
          ]
        },
        {
          question: 'Pour $4(2x-3)-2(4x-6)=5$, laquelle est la conclusion correcte ?',
          choices: ['Aucune solution', 'Une solution : $x=0$', 'Une infinité de solutions'], correctIndex: 0,
          steps: [
            'On développe : $8x-12-8x+12=5$.',
            'On réduit le membre gauche : $0=5$.',
            'Cette égalité est toujours fausse, quel que soit x. L’équation n’a **aucune solution**.'
          ]
        },
        {
          question: 'Pour $3(2x-4)+5=6x-7$, laquelle est la conclusion correcte ?',
          choices: ['Une infinité de solutions', 'Aucune solution', 'Une solution : $x=0$'], correctIndex: 0,
          steps: [
            'On développe le membre gauche : $6x-12+5=6x-7$.',
            'On réduit : $6x-7=6x-7$.',
            'Les deux membres sont identiques. L’égalité est vraie pour toute valeur de x : il y a **une infinité de solutions**.'
          ]
        },
        {
          question: 'Résous $\\frac{3(2x-5)}{4}-\\frac{2(x+1)}{3}=\\frac{5x-7}{6}-\\frac{x+2}{8}$.',
          choices: ['$x=24$', '$x=-24$', '$x=8$'], correctIndex: 0,
          steps: [
            'Le dénominateur commun de 4, 3, 6 et 8 est 24. On multiplie chaque terme des deux membres par 24.',
            'On obtient $18(2x-5)-16(x+1)=4(5x-7)-3(x+2)$.',
            'On développe : à gauche $36x-90-16x-16=20x-106$ ; à droite $20x-28-3x-6=17x-34$.',
            'L’équation devient $20x-106=17x-34$. On soustrait $17x$ : $3x-106=-34$.',
            'On ajoute 106 : $3x=72$. On divise par 3 : $x=24$. '
          ]
        }
      ];
      questions.push(...advanced.map((exercise) => () => exercise));
      if (!questions.pool) {
        // Mélange une série sans répéter une question avant d'avoir parcouru le pool.
        questions.pool = questions.map((_, i) => i);
      }
      if (!questions.pool.length) questions.pool = questions.map((_, i) => i);
      for (let i = questions.pool.length - 1; i > 0; i--) {
        const j = rand(0, i);
        [questions.pool[i], questions.pool[j]] = [questions.pool[j], questions.pool[i]];
      }
      return questions[questions.pool.pop()]();
    }
  }]
});
