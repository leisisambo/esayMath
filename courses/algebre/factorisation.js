/* Lecon EasyMath : factorisation, niveau debutant.
 * A coller dans le champ Script d'une lecon EasyMath.
 */
EM.lesson({
  slides: [
    `# La factorisation

Factoriser, c'est transformer une **somme** ou une **différence** en un **produit**.

Par exemple, développer $3(x+4)$ donne $3x+12$. Factoriser fait le chemin inverse : $3x+12=3(x+4)$.

On peut vérifier une factorisation en développant le résultat.`,

    `# Mettre un facteur commun en évidence

Un facteur commun apparaît dans chacun des termes. On le place devant une parenthèse.

**Règle :** $ab+ac=a(b+c)$.

Exemple : $8x+20=4\times 2x+4\times 5=4(2x+5)$.

Dans la parenthèse, on écrit le résultat de la division de chaque terme par le facteur commun.`,

    `# Trouver le facteur commun

Cherche :

1. Le plus grand nombre qui divise tous les coefficients.
2. Les lettres présentes dans tous les termes.
3. Pour chaque lettre, sa plus petite puissance.

Exemple : $12x^2+18x^3$. Le facteur numérique commun maximal est $6$ et la plus petite puissance commune est $x^2$. Donc le facteur commun est $6x^2$ :

$$12x^2+18x^3=6x^2(2+3x).$$`,

    `# Factoriser avec un signe moins

On peut aussi mettre un facteur négatif en évidence.

$$-6x+12=-6(x-2).$$

Vérification : $-6(x-2)=-6x+12$.

Mettre le signe moins devant peut rendre les signes dans la parenthèse plus simples.`,

    `# Différence de deux carrés

Quand deux carrés sont séparés par un signe moins, on utilise :

$$a^2-b^2=(a-b)(a+b).$$

Exemple : $x^2-25=x^2-5^2=(x-5)(x+5)$.

Il faut bien un **moins** entre les carrés. $x^2+25$ n'est pas une différence de deux carrés.`,

    `# Les carrés parfaits

Deux autres identités remarquables :

$$a^2+2ab+b^2=(a+b)^2$$

$$a^2-2ab+b^2=(a-b)^2$$

Exemple : $x^2+6x+9$. On reconnaît $x^2$, $2\times x\times 3$ et $3^2$, donc $x^2+6x+9=(x+3)^2$.

Pour $x^2-10x+25$, on obtient $(x-5)^2$.`,

    `# Quelle méthode choisir ?

Observe l'expression dans cet ordre :

1. Cherche un facteur commun.
2. Dans ce qui reste, cherche une identité remarquable.

Exemple : $6x^2-24=6(x^2-4)=6(x-2)(x+2)$.

On peut vérifier le résultat en développant les facteurs.`,

    `# À retenir

- $ab+ac=a(b+c)$ : facteur commun.
- $a^2-b^2=(a-b)(a+b)$ : différence de deux carrés.
- $a^2+2ab+b^2=(a+b)^2$ : carré d'une somme.
- $a^2-2ab+b^2=(a-b)^2$ : carré d'une différence.
- Cherche d'abord un facteur commun, puis regarde si le résultat peut encore se factoriser.`
  ],
  rounds: 8,
  exercises: [{
    type: 'Factorisation',
    generate() {
      const n = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
      const questions = [
        () => { const a = n(2, 9), b = n(2, 9); return {
          question: `Factorise $${a}x+${a * b}$.`,
          choices: [`$${a}(x+${b})$`, `$${a}(x+${a * b})$`, `$x(${a}+${b})$`], correctIndex: 0,
          steps: [
            `On cherche un facteur commun aux deux termes : $${a}x$ et $${a * b}$. C'est $${a}$.`,
            `On divise le premier terme par le facteur commun : $${a}x\\div ${a}=x$.`,
            `On divise le second terme : $${a * b}\\div ${a}=${b}$.`,
            `On place ${a} devant la parenthèse et on écrit les deux résultats dedans : $${a}x+${a * b}=${a}(x+${b})$.`,
            `Vérification par développement : $${a}(x+${b})=${a}\\times x+${a}\\times ${b}=${a}x+${a * b}$.`
          ]
        }; },
        () => { const a = n(2, 6), b = n(2, 6); return {
          question: `Factorise $${a}x^2+${a * b}x$.`,
          choices: [`$${a}x(x+${b})$`, `$${a}(x^2+${b})$`, `$x^2(${a}+${b})$`], correctIndex: 0,
          steps: [
            `Les deux termes contiennent le facteur commun $${a}x$.`,
            `Premier terme : $${a}x^2\\div ${a}x=x$. En effet, $${a}\\div ${a}=1$ et $x^2\\div x=x$.`,
            `Deuxième terme : $${a * b}x\\div ${a}x=${b}$. En effet, $${a * b}\\div ${a}=${b}$ et $x\\div x=1$.`,
            `On rassemble le facteur commun et les résultats des divisions : $${a}x^2+${a * b}x=${a}x(x+${b})$.`,
            `Vérification : $${a}x(x+${b})=${a}x^2+${a * b}x$.`
          ]
        }; },
        () => { const a = n(2, 5), b = n(2, 5); return {
          question: `Factorise $${a}x^2-${a * b * b}$.`,
          choices: [`$${a}(x-${b})(x+${b})$`, `$${a}(x-${b})^2$`, `$${a}(x^2-${b})$`], correctIndex: 0,
          steps: [
            `On commence par chercher un facteur commun : les deux termes sont divisibles par $${a}$.`,
            `Division du premier terme : $${a}x^2\\div ${a}=x^2$. Division du second : $-${a * b * b}\\div ${a}=-${b * b}$.`,
            `On met ${a} en facteur : $${a}x^2-${a * b * b}=${a}(x^2-${b * b})$.`,
            `Dans la parenthèse, ${b * b}=${b}^2 : on reconnaît la différence de deux carrés $x^2-${b}^2$.`,
            `Avec $u^2-v^2=(u-v)(u+v)$, en prenant $u=x$ et $v=${b}$ : $x^2-${b}^2=(x-${b})(x+${b})$.`,
            `Résultat : $${a}x^2-${a * b * b}=${a}(x-${b})(x+${b})$.`
          ]
        }; },
        () => { const b = n(2, 8); return {
          question: `Factorise $x^2+${2 * b}x+${b * b}$.`,
          choices: [`$(x+${b})^2$`, `$(x-${b})^2$`, `$(x+${2 * b})^2$`], correctIndex: 0,
          steps: [
            `On compare avec $u^2+2uv+v^2$. Ici, $u=x$ et $v=${b}$.`,
            `Premier terme : $u^2=x^2$. Dernier terme : $v^2=${b}^2=${b * b}$.`,
            `Terme du milieu : $2uv=2\\times x\\times ${b}=${2 * b}x$. C'est bien le terme du milieu de l'expression.`,
            `Les trois termes correspondent donc à $u^2+2uv+v^2=(u+v)^2$.`,
            `On remplace $u$ par $x$ et $v$ par ${b} : $x^2+${2 * b}x+${b * b}=(x+${b})^2$.`
          ]
        }; },
        () => { const b = n(2, 8); return {
          question: `Factorise $x^2-${2 * b}x+${b * b}$.`,
          choices: [`$(x-${b})^2$`, `$(x+${b})^2$`, `$(x-${2 * b})^2$`], correctIndex: 0,
          steps: [
            `On compare avec $u^2-2uv+v^2$. Ici, $u=x$ et $v=${b}$.`,
            `Premier terme : $u^2=x^2$. Dernier terme : $v^2=${b}^2=${b * b}$.`,
            `Terme du milieu : $-2uv=-2\\times x\\times ${b}=-${2 * b}x$.`,
            `On reconnaît $u^2-2uv+v^2=(u-v)^2$.`,
            `Donc $x^2-${2 * b}x+${b * b}=(x-${b})^2$.`
          ]
        }; },
        () => { const b = n(2, 9); return {
          question: `Factorise $x^2-${b * b}$.`,
          choices: [`$(x-${b})(x+${b})$`, `$(x-${b})^2$`, `$(x+${b})^2$`], correctIndex: 0,
          steps: [
            `On vérifie que les deux termes sont des carrés : $x^2=x^2$ et $${b * b}=${b}^2$.`,
            `L'expression est une différence : $x^2-${b}^2$. On utilise $u^2-v^2=(u-v)(u+v)$.`,
            `Avec $u=x$ et $v=${b}$, on obtient $x^2-${b * b}=(x-${b})(x+${b})$.`
          ]
        }; },
        () => { const a = n(2, 5), b = n(2, 5); return {
          question: `Factorise d'abord par le facteur commun : $${a}x^2-${a * b * b}$.`,
          choices: [`$${a}(x-${b})(x+${b})$`, `$${a}(x-${b})^2$`, `$${a}(x^2-${b})$`], correctIndex: 0,
          steps: [
            `Étape 1 — facteur commun : $${a}x^2\\div ${a}=x^2$ et $-${a * b * b}\\div ${a}=-${b * b}$. Donc $${a}x^2-${a * b * b}=${a}(x^2-${b * b})$.`,
            `Étape 2 — reconnaître une différence de carrés : $x^2-${b * b}=x^2-${b}^2$.`,
            `Étape 3 — appliquer $u^2-v^2=(u-v)(u+v)$ avec $u=x$ et $v=${b}$ : $x^2-${b}^2=(x-${b})(x+${b})$.`,
            `Résultat final : $${a}x^2-${a * b * b}=${a}(x-${b})(x+${b})$.`
          ]
        }; },
        () => { const a = n(2, 8), b = n(2, 8); return {
          question: `Factorise $-${a}x+${a * b}$.`,
          choices: [`$-${a}(x-${b})$`, `$-${a}(x+${b})$`, `$${a}(-x-${b})$`], correctIndex: 0,
          steps: [
            `On choisit le facteur commun négatif $-${a}$ pour obtenir un x positif dans la parenthèse.`,
            `Division du premier terme : $(-${a}x)\\div(-${a})=x$.`,
            `Division du second terme : $${a * b}\\div(-${a})=-${b}$. Le signe devient négatif car on divise un nombre positif par un nombre négatif.`,
            `On écrit les deux quotients dans la parenthèse : $-${a}x+${a * b}=-${a}(x-${b})$.`,
            `Vérification : $-${a}(x-${b})=-${a}x+${a * b}$.`
          ]
        }; }
      ];
      return questions[n(0, questions.length - 1)]();
    }
  }]
});
