/* Lecon EasyMath : systemes de deux equations a deux inconnues.
 * A coller dans le champ Script d'une lecon EasyMath.
 */
EM.lesson({
  slides: [
    `# Les systèmes à deux inconnues

Une équation comme $2x+y=10$ contient deux inconnues. Elle possède généralement plusieurs solutions : par exemple $(x,y)=(1,8)$ et $(2,6)$ vérifient toutes les deux l'égalité.

Pour déterminer un couple unique, on utilise souvent une deuxième équation. Un **système** demande de trouver un couple $(x,y)$ qui vérifie les deux équations en même temps.`,

    `# La substitution

Considérons $\\begin{cases}x+y=10\\\\2x-y=5\\end{cases}$.

1. On isole $y$ dans la première équation : $y=10-x$.
2. On remplace $y$ par $10-x$ dans la deuxième : $2x-(10-x)=5$.
3. On développe avec attention au signe : $2x-10+x=5$, donc $3x=15$ et $x=5$.
4. On remplace $x$ dans $y=10-x$ : $y=10-5=5$.

La solution est $(x,y)=(5,5)$.`,

    `# L'élimination

Pour éliminer une inconnue, on additionne ou soustrait les équations afin que ses coefficients s'annulent.

Exemple : $\\begin{cases}2x+3y=13\\\\2x-y=5\\end{cases}$.

On soustrait la deuxième équation de la première :

$$ (2x+3y)-(2x-y)=13-5 $$

Les $2x$ s'annulent et $3y-(-y)=4y$, donc $4y=8$ et $y=2$.

On remplace dans $2x-y=5$ : $2x-2=5$, donc $2x=7$ et $x=\\frac72$.`,

    `# Rendre les coefficients opposés

Si aucun coefficient ne s'annule directement, on peut multiplier **tous les termes d'une équation** par un même nombre non nul.

Exemple : $\\begin{cases}2x+3y=12\\\\5x+2y=16\\end{cases}$.

On multiplie la première équation par 2 : $4x+6y=24$. On multiplie la deuxième par 3 : $15x+6y=48$.

En soustrayant la première nouvelle équation de la deuxième, les $6y$ s'annulent : $11x=24$, donc $x=\\frac{24}{11}$.

On remplace ensuite $x$ dans une équation de départ pour calculer $y$.`,

    `# Vérifier le couple

Une solution est un couple $(x,y)$. Il faut vérifier **les deux équations**.

Pour $\\begin{cases}x+y=8\\\\x-y=2\\end{cases}$ et le couple $(5,3)$ :

- Première équation : $5+3=8$.
- Deuxième équation : $5-3=2$.

Le couple convient aux deux équations, c'est donc la solution du système.`,

    `# Trois résultats possibles

Un système peut avoir :

- **Une solution unique**, par exemple $x+y=8$ et $x-y=2$.
- **Aucune solution**, si les équations sont incompatibles : $x+y=5$ et $x+y=9$ imposeraient deux sommes différentes.
- **Une infinité de solutions**, si une équation est un multiple de l'autre : $3x+6y=12$ et $x+2y=4$ expriment la même condition.

Après réduction, une égalité fausse comme $0=4$ indique aucune solution. Une identité comme $0=0$ indique une infinité de solutions.`,

    `# Méthode à suivre

1. Choisis la substitution si une inconnue est déjà facile à isoler.
2. Sinon, cherche à éliminer une inconnue par addition ou soustraction.
3. Si nécessaire, multiplie une ou plusieurs équations pour obtenir des coefficients opposés.
4. Calcule la deuxième inconnue par remplacement.
5. Vérifie le couple dans les deux équations de départ.

Attention aux signes lors du développement et multiplie bien tous les termes d'une équation.`
  ],
  rounds: 8,
  exercises: [{
    type: 'Systèmes à deux inconnues',
    generate() {
      const exercises = [
        {
          question: 'Résous par **élimination en additionnant les équations** : $\\begin{cases}x+y=17\\\\x-y=5\\end{cases}$.',
          choices: ['$(x,y)=(11,6)$', '$(x,y)=(6,11)$', '$(x,y)=(12,5)$'], correctIndex: 0,
          steps: [
            '**Méthode à utiliser : élimination par addition.** Les coefficients de $y$ sont opposés : $+1$ et $-1$.',
            'On additionne les deux équations membre à membre : $(x+y)+(x-y)=17+5$.',
            '$y$ et $-y$ s’annulent : $2x=22$. On divise par 2 : $x=11$.',
            'On remplace $x$ dans $x+y=17$ : $11+y=17$. On soustrait 11 : $y=6$.',
            'Vérification : $11+6=17$ et $11-6=5$. Donc $(x,y)=(11,6)$. '
          ]
        },
        {
          question: 'Résous par **substitution** : $\\begin{cases}2x+y=11\\\\x-2y=-1\\end{cases}$.',
          choices: ['$(x,y)=(\\frac{21}{5},\\frac{13}{5})$', '$(x,y)=(5,1)$', '$(x,y)=(\\frac{13}{5},\\frac{21}{5})$'], correctIndex: 0,
          steps: [
            '**Méthode à utiliser : substitution.** On peut isoler facilement $y$ dans la première équation.',
            'On isole $y$ dans la première équation : $2x+y=11$, donc $y=11-2x$.',
            'On remplace dans la deuxième : $x-2(11-2x)=-1$.',
            'On développe : $x-22+4x=-1$, donc $5x-22=-1$. On ajoute 22 : $5x=21$.',
            'On divise par 5 : $x=\\frac{21}{5}$. Puis $y=11-2\\times\\frac{21}{5}=\\frac{55}{5}-\\frac{42}{5}=\\frac{13}{5}$.',
            'Vérification : $2\\times\\frac{21}{5}+\\frac{13}{5}=11$ et $\\frac{21}{5}-2\\times\\frac{13}{5}=-1$.'
          ]
        },
        {
          question: 'Résous par **élimination en soustrayant la deuxième équation de la première** : $\\begin{cases}3x+2y=16\\\\3x-y=7\\end{cases}$.',
          choices: ['$(x,y)=(\\frac{10}{3},3)$', '$(x,y)=(3,\\frac{10}{3})$', '$(x,y)=(4,2)$'], correctIndex: 0,
          steps: [
            '**Méthode à utiliser : élimination par soustraction.** Les coefficients de $x$ sont identiques : $3$ et $3$.',
            'On soustrait la deuxième équation à la première : $(3x+2y)-(3x-y)=16-7$.',
            'On distribue le signe moins : $3x+2y-3x+y=9$, donc $3y=9$. Ainsi $y=3$.',
            'On remplace dans $3x-y=7$ : $3x-3=7$. On ajoute 3 : $3x=10$.',
            'On divise par 3 : $x=\\frac{10}{3}$.',
            'Vérification : $3\\times\\frac{10}{3}+2\\times3=16$ et $3\\times\\frac{10}{3}-3=7$.'
          ]
        },
        {
          question: 'Résous par **élimination en additionnant les équations** : $\\begin{cases}4x+3y=18\\\\2x-3y=0\\end{cases}$.',
          choices: ['$(x,y)=(3,2)$', '$(x,y)=(2,3)$', '$(x,y)=(3,-2)$'], correctIndex: 0,
          steps: [
            '**Méthode à utiliser : élimination par addition.** Les coefficients de $y$ sont déjà opposés : $+3$ et $-3$.',
            'Les coefficients de $y$ sont opposés : $3$ et $-3$. On additionne les équations.',
            '$(4x+3y)+(2x-3y)=18+0$, donc $6x=18$. On divise par 6 : $x=3$.',
            'On remplace dans $2x-3y=0$ : $2\\times3-3y=0$, donc $6-3y=0$.',
            'On soustrait 6 : $-3y=-6$. On divise par $-3$ : $y=2$.',
            'Vérification : $4\\times3+3\\times2=18$ et $2\\times3-3\\times2=0$.'
          ]
        },
        {
          question: 'Résous par **élimination après multiplication des équations** : $\\begin{cases}2x+5y=16\\\\3x-2y=5\\end{cases}$.',
          choices: ['$(x,y)=(3,2)$', '$(x,y)=(2,3)$', '$(x,y)=(\\frac{24}{11},\\frac{28}{11})$'], correctIndex: 0,
          steps: [
            '**Méthode à utiliser : élimination après multiplication.** Les coefficients de $y$ ne sont pas encore opposés ; on les transforme en $+10$ et $-10$.',
            'On veut éliminer $y$. On multiplie la première équation par 2 : $4x+10y=32$.',
            'On multiplie la deuxième équation par 5 : $15x-10y=25$. On a multiplié chaque terme, y compris le membre droit.',
            'On additionne : $19x=57$, donc $x=3$.',
            'On remplace dans $3x-2y=5$ : $9-2y=5$. On soustrait 9 : $-2y=-4$, donc $y=2$.',
            'Vérification : $2\\times3+5\\times2=16$ et $3\\times3-2\\times2=5$.'
          ]
        },
        {
          question: 'Résous par **élimination après multiplication des équations** : $\\begin{cases}5x-3y=7\\\\2x+4y=10\\end{cases}$.',
          choices: ['$(x,y)=(\\frac{29}{13},\\frac{18}{13})$', '$(x,y)=(1,2)$', '$(x,y)=(\\frac{18}{13},\\frac{29}{13})$'], correctIndex: 0,
          steps: [
            '**Méthode à utiliser : élimination après multiplication.** On fabrique les coefficients opposés $-12y$ et $+12y$.',
            'On élimine $y$. On multiplie la première équation par 4 : $20x-12y=28$.',
            'On multiplie la deuxième par 3 : $6x+12y=30$. On additionne les deux nouvelles équations : $26x=58$.',
            'On divise par 26 : $x=\\frac{58}{26}=\\frac{29}{13}$.',
            'On remplace $x$ dans $2x+4y=10$ : $2\\times\\frac{29}{13}+4y=10$.',
            'On soustrait $\\frac{58}{13}$ : $4y=\\frac{130}{13}-\\frac{58}{13}=\\frac{72}{13}$. On divise par 4 : $y=\\frac{18}{13}$.',
            'La solution est $(x,y)=(\\frac{29}{13},\\frac{18}{13})$. '
          ]
        },
        {
          question: 'Par **soustraction membre à membre**, détermine le nombre de solutions du système $\\begin{cases}x+y=5\\\\x+y=9\\end{cases}$.',
          choices: ['Aucune solution', 'Une solution unique', 'Une infinité de solutions'], correctIndex: 0,
          steps: [
            '**Méthode à utiliser : comparaison par soustraction.** Les membres de gauche sont identiques ; soustraire les équations élimine $x$ et $y$.',
            'On soustrait la deuxième équation à la première : $(x+y)-(x+y)=5-9$.',
            'Les inconnues s’annulent et il reste $0=-4$.',
            'Cette égalité est fausse. Aucun couple ne peut vérifier les deux équations : il n’y a **aucune solution**.'
          ]
        },
        {
          question: 'Par **comparaison après multiplication d’une équation**, détermine le nombre de solutions du système $\\begin{cases}3x+6y=12\\\\x+2y=4\\end{cases}$.',
          choices: ['Une infinité de solutions', 'Aucune solution', 'Une solution unique'], correctIndex: 0,
          steps: [
            '**Méthode à utiliser : comparaison des équations.** On vérifie si une équation est un multiple de l’autre.',
            'On multiplie la deuxième équation par 3 : $3(x+2y)=3\\times4$, donc $3x+6y=12$.',
            'On retrouve exactement la première équation : les deux lignes expriment la même condition.',
            'Il n’y a pas de couple unique. Tous les couples vérifiant $x+2y=4$ conviennent : il y a une **infinité de solutions**.'
          ]
        }
      ];
      if (!this.exercisePool) this.exercisePool = exercises.map((_, i) => i);
      if (!this.exercisePool.length) this.exercisePool = exercises.map((_, i) => i);
      for (let i = this.exercisePool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.exercisePool[i], this.exercisePool[j]] = [this.exercisePool[j], this.exercisePool[i]];
      }
      return exercises[this.exercisePool.pop()];
    }
  }]
});
