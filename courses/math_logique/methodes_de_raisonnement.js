/*
 * Lecon EasyMath : Methodes de raisonnement
 * A coller dans le champ Script d'une lecon EasyMath.
 */
EM.lesson({
  slides: [
    `# Les méthodes de raisonnement

Une démonstration est une suite d'arguments qui établit une affirmation à partir de faits connus. Le choix de la méthode dépend de la forme de l'affirmation et des informations disponibles.

Dans cette leçon, on étudie le raisonnement direct, la contraposée, l'absurde, la disjonction de cas, le contre-exemple et la récurrence.`,

    `# Le raisonnement direct

Pour démontrer **si P, alors Q**, on suppose P vraie et on en déduit Q en utilisant des définitions et des résultats connus.

**Exemple :** si n est pair, alors n² est pair.

Comme n est pair, il existe un entier k tel que n = 2k. Alors n² = 4k² = 2(2k²), donc n² est pair.`,

    `# La contraposée

L'affirmation **P implique Q** est équivalente à sa contraposée **non Q implique non P**. On peut donc démontrer la seconde à la place de la première.

**Exemple :** pour montrer que « si n² est impair, alors n est impair », on peut montrer que « si n est pair, alors n² est pair ».

La contraposée est souvent utile quand la négation de la conclusion donne une hypothèse plus facile à exploiter.`,

    `# Le raisonnement par l'absurde

Pour établir une affirmation P, on suppose provisoirement que P est fausse. Si cette supposition conduit à une contradiction, alors P est vraie.

**Exemple :** il n'existe pas de plus grand entier. En supposant qu'un entier n soit le plus grand, n + 1 serait un entier encore plus grand : contradiction.

Il faut clairement énoncer la supposition contraire et la contradiction obtenue.`,

    `# Le raisonnement par disjonction de cas

Quand plusieurs situations couvrent toutes les possibilités, on traite chacune séparément.

**Exemple :** tout entier n est pair ou impair. Pour prouver une propriété sur tous les entiers, on peut donc étudier le cas pair, puis le cas impair.

Vérifie que les cas sont bien exhaustifs : aucun cas ne doit manquer.`,

    `# Le contre-exemple

Pour réfuter une affirmation universelle (« pour tout x, P(x) »), un seul exemple où P est fausse suffit. C'est un **contre-exemple**.

**Exemple :** « tout nombre premier est impair » est faux : 2 est premier et pair.

Quelques exemples qui confirment une affirmation ne démontrent pas qu'elle est vraie pour tous les objets.`,

    `# Le raisonnement par récurrence

Pour prouver qu'une propriété P(n) est vraie pour tout entier n à partir d'un rang n₀ :

1. **Initialisation :** vérifier P(n₀).
2. **Hérédité :** supposer P(n) vraie et démontrer P(n + 1).
3. **Conclusion :** P(n) est vraie pour tout n ≥ n₀.

Oublier l'initialisation ou l'hérédité rend la preuve incomplète.`,

    `# Choisir une méthode

- Pour **P ⇒ Q**, commence par le raisonnement direct ; essaie la contraposée si ¬Q est plus simple.
- Pour établir qu'une affirmation est impossible, cherche une contradiction.
- Si les objets se répartissent en quelques catégories, sépare les cas.
- Pour réfuter « pour tout », cherche un contre-exemple.
- Pour une propriété dépendant d'un entier, pense à la récurrence.

Une démonstration doit justifier chaque étape et utiliser une méthode adaptée.`
  ],
  rounds: 8,
  exercises: [{
    type: 'Méthodes de raisonnement',
    generate() {
      const questions = [
        {
          question: 'Pour démontrer directement « si n est divisible par 4, alors n est pair », quelle est la première étape ?',
          choices: ['Écrire n = 4k pour un entier k', 'Supposer que n est impair', 'Chercher un contre-exemple'],
          correctIndex: 0,
          steps: ['La définition de « divisible par 4 » donne n = 4k.', 'Alors n = 2(2k), donc n est pair.']
        },
        {
          question: 'Quelle est la contraposée de « si P, alors Q » ?',
          choices: ['Si non Q, alors non P', 'Si Q, alors P', 'Si non P, alors non Q'],
          correctIndex: 0,
          steps: ['La contraposée inverse l’ordre et nie les deux propositions : non Q implique non P.']
        },
        {
          question: 'Pour prouver par contraposée « si n² est impair, alors n est impair », quelle proposition démontre-t-on ?',
          choices: ['Si n est pair, alors n² est pair', 'Si n est impair, alors n² est impair', 'Si n² est pair, alors n est impair'],
          correctIndex: 0,
          steps: ['La contraposée est : si n n’est pas impair (donc est pair), alors n² n’est pas impair (donc est pair).']
        },
        {
          question: 'Pour prouver par l’absurde qu’un objet n’existe pas, que faut-il faire ?',
          choices: ['Supposer qu’il existe et en déduire une contradiction', 'Vérifier plusieurs exemples', 'Prouver sa contraposée'],
          correctIndex: 0,
          steps: ['On suppose le contraire de ce que l’on veut établir, puis on montre que cette supposition est impossible.']
        },
        {
          question: 'Pour réfuter « tous les nombres premiers sont impairs », quel contre-exemple convient ?',
          choices: ['2', '3', '5'],
          correctIndex: 0,
          steps: ['2 est premier et n’est pas impair. Un seul contre-exemple suffit à réfuter une affirmation universelle.']
        },
        {
          question: 'Un élève prouve P(n₀), puis montre que P(n) implique P(n + 1). Quelle méthode utilise-t-il ?',
          choices: ['Le raisonnement par récurrence', 'La disjonction de cas', 'Le raisonnement par l’absurde'],
          correctIndex: 0,
          steps: ['La récurrence comporte une initialisation et une étape d’hérédité.']
        },
        {
          question: 'Pour démontrer une propriété de tous les entiers, on étudie séparément les entiers pairs et impairs. Quelle méthode est utilisée ?',
          choices: ['La disjonction de cas', 'La contraposée', 'Le raisonnement direct uniquement'],
          correctIndex: 0,
          steps: ['Tout entier est pair ou impair : ces deux cas couvrent toutes les possibilités.']
        },
        {
          question: 'Laquelle de ces affirmations est correcte ?',
          choices: ['Quelques exemples vérifiés ne prouvent pas une affirmation pour tous les nombres', 'Un contre-exemple suffit à prouver une affirmation universelle', 'Une récurrence ne nécessite pas d’initialisation'],
          correctIndex: 0,
          steps: ['Des exemples particuliers ne couvrent pas tous les cas. Pour réfuter une affirmation universelle, on utilise un contre-exemple.']
        },
        {
          question: 'Quelles sont les deux étapes essentielles d’une preuve par récurrence ?',
          choices: ['Initialisation et hérédité', 'Hypothèse et contre-exemple', 'Direct et contraposée'],
          correctIndex: 0,
          steps: ['On vérifie d’abord le premier rang, puis on prouve que la propriété se transmet de n à n + 1.']
        }
      ];
      return questions[Math.floor(Math.random() * questions.length)];
    }
  }]
});
