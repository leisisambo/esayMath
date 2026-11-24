# EasyMath — context.md

> Document de référence pour les agents codeurs et développeurs qui travaillent sur ce projet. Lis-le en entier avant de modifier du code.

## 1. Vision

EasyMath est une **application web single page (HTML + JavaScript pur)** qui permet à des apprenants de **découvrir les mathématiques de façon interactive**.

Le principe pédagogique : un cours contient des **leçons**, et chaque leçon enchaîne :

1. une **partie explicative** présentée en slides progressifs ;
2. une **série d'exercices** sur la leçon.

Exemple : pour la leçon « Les fractions », on explique d'abord ce qu'est une fraction, puis on donne des exercices.

Principes de design : **minimal, professionnel, interactif**. Boutons et modals arrondis, transitions douces, thèmes clair et sombre.

## 2. Stack technique

| Élément | Choix |
|---|---|
| Langages | HTML, JavaScript (vanilla) |
| Style | Tailwind CSS via CDN |
| Persistance | **IndexedDB** (aucun backend) |
| Isolation d'une leçon | **iframe** (affichage) + **Web Worker** (logique/interactions) |
| Export | Excel (résultats d'apprentissage) |

Contraintes : pas de serveur, pas de framework lourd, tout doit fonctionner dans le navigateur.

## 3. Interface

### 3.1 Panneau gauche (menu)

De haut en bas :

1. Bouton **« Ajouter un cours »**.
2. **Barre de recherche** pour retrouver cours et leçons.
3. **Liste des cours** : chaque cours est un dossier dépliable (collapse) avec une flèche qui pointe vers la droite quand il est fermé. Le nom du cours s'affiche, et à l'intérieur on trouve ses leçons.
4. À droite de chaque cours : un **bouton icône « + »** pour ajouter une leçon.

### 3.2 Modal « Ajouter une leçon »

Ouvert par le bouton « + » d'un cours. Il contient :

- un champ **Nom de la leçon** ;
- juste en dessous, un **textarea** où l'utilisateur colle le **script JavaScript de la leçon**.

À la validation, le **script manager** récupère le script et le **sauvegarde dans IndexedDB**.

### 3.3 Zone de contenu (droite)

Un **système d'onglets**. Cliquer sur une leçon :

1. crée automatiquement un **Web Worker** pour cette leçon ;
2. ouvre un **onglet** contenant un **iframe** qui affiche la leçon.

**Règle : une leçon = un iframe + un Web Worker.**

## 4. Architecture

```
┌──────────────────────────── Main process (page principale) ────────────────────────────┐
│  UI (menu, onglets, modals)   Script manager   Composants globaux                      │
│                                                (progression/compteur, markdown+maths)  │
│                                  │                                                     │
│                               IndexedDB                                                │
└──────────────┬──────────────────────────────────────────────────────┬──────────────────┘
               │ postMessage                                          │ postMessage
        ┌──────▼───────┐                                       ┌──────▼───────┐
        │  Web Worker  │  ◄──── interactions / calculs ───►    │    iframe    │
        │  (leçon)     │                                       │  (affichage) │
        └──────────────┘                                       └──────────────┘
```

### Rôles

- **Main process** : possède l'UI, IndexedDB et les composants globaux. C'est le point central de communication entre l'iframe et le worker.
- **Script manager** : lit le script collé dans le modal, l'enveloppe, et le stocke dans IndexedDB.
- **iframe** : **affiche** uniquement (slides, boutons, exercices).
- **Web Worker** : **gère** les interactions de la leçon (progression, calculs, génération d'exercices, enregistrement des données d'interaction).

### Script d'une leçon

- Stocké tel quel dans IndexedDB puis **encapsulé dans une IIFE** qui reçoit en paramètres le **nom du cours** et le **nom de la leçon**.
- Il doit rester autonome : tout ce dont il a besoin vient de ses paramètres et des composants globaux exposés par le main process.

### Composants globaux (gérés par le main process)

- **Barre de progression / compteur** : sert notamment de timeout pour un exercice.
- **Interpréteur Markdown + symboles mathématiques** : les leçons l'utilisent pour rendre leur texte et leurs formules.

Les leçons **ne réimplémentent pas** ces composants : elles les appellent.

## 5. Parcours pédagogique d'une leçon

### 5.1 Partie explicative (slides progressifs)

- Les leçons s'affichent **progressivement**, slide par slide.
- Le premier slide pose la définition (exemple : « C'est quoi une fraction ? ») **en grand et en gras**.
- Un bouton **« Suivant »** passe au slide suivant (exemples, explications complémentaires, etc.).

### 5.2 Fin de leçon : deux boutons

- **« J'ai compris »** : on enregistre dans IndexedDB que cette leçon est comprise. Aux ouvertures suivantes, **la partie explicative est sautée** et on passe directement aux exercices.
- **« Je n'ai pas compris »** : la leçon **reprend depuis le premier slide**, en boucle, jusqu'à ce que l'utilisateur clique sur « J'ai compris ». Ensuite seulement, on passe aux exercices.

### 5.3 Exercices

- **Générés dynamiquement** par des fonctions du script de la leçon : ils ne sont **pas stockés** en base.
- Format : **choix multiples avec une seule bonne réponse**.
- Après réponse : **solution détaillée pas à pas**.
- Chaque exercice est chronométré (voir composant de progression/compteur).

## 6. Données (IndexedDB)

Magasins à prévoir (noms indicatifs, à adapter) :

| Store | Contenu |
|---|---|
| `courses` | Cours (id, nom) |
| `lessons` | Leçons (id, cours, nom, **script JS**) |
| `interactions` | Une ligne par leçon et par utilisateur : nom de la leçon, état « compris », **temps mis (en minutes) avant de cliquer sur « J'ai compris »** |
| `exercises` | Résultats d'exercices : leçon, **type d'exercice**, temps passé, données de l'exercice, réponse donnée, juste/faux |

Notes :

- Le Web Worker d'une leçon peut **enregistrer les informations d'interaction** de l'utilisateur (c'est ce qui alimente `interactions` et `exercises`).
- Les exercices eux-mêmes ne sont pas stockés ; seuls leurs **résultats** le sont.
- Les données doivent être **exportables en Excel**, afin d'analyser le rythme d'apprentissage.

## 7. Conventions et règles pour les agents codeurs

1. **Respecter la séparation** : l'iframe affiche, le worker gère, le main process orchestre et persiste.
2. **Ne pas casser l'isolation** : une leçon ne touche ni au DOM du menu ni à IndexedDB directement ; tout passe par des messages (`postMessage`) vers le main process.
3. **Un worker et un iframe par leçon ouverte** ; les terminer à la fermeture de l'onglet.
4. **Ne jamais stocker les exercices** : les générer à la volée.
5. **Garder le design minimal** : pas de décorations superflues, composants arrondis, transitions courtes, support du thème clair/sombre.
6. **JavaScript vanilla + Tailwind CDN** : n'ajouter une dépendance que si elle est indispensable (par exemple une bibliothèque d'export Excel) et la charger via CDN.
7. **Sécurité** : le script collé est du code arbitraire fourni par l'utilisateur ; l'exécuter uniquement dans l'iframe/worker (jamais directement dans la page principale).
8. **Code lisible** : fonctions courtes, noms explicites, commentaires utiles en français.

## 8. Plan de travail

- **Cette phase** : construire l'**application HTML complète** (menu, recherche, modal, script manager, onglets iframe + worker, IndexedDB, composants globaux, export Excel).
- **Phases suivantes** : les **leçons** (logique mathématique, algèbre linéaire, matrices, etc.) seront produites dans d'autres sessions **sous forme de scripts JS** à coller dans le modal. Les **cours sont créés au préalable** dans l'application.

## 9. Définition de « terminé »

- On peut créer un cours, y ajouter une leçon en collant un script, et la retrouver via la recherche.
- Cliquer sur la leçon ouvre un onglet (iframe) piloté par son Web Worker.
- Le cycle « slides → J'ai compris / Je n'ai pas compris → exercices » fonctionne, et « J'ai compris » est mémorisé entre deux sessions.
- Les interactions et les résultats d'exercices sont enregistrés et exportables en Excel.
- L'interface est cohérente en thème clair et sombre.