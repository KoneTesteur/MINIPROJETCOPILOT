# Code Review

Ce document liste les consignes et la checklist de revue de code pour ce projet Cypress.

## Objectif

Assurer la qualité, la maintenabilité et la fiabilité des tests E2E.

## Avant d'ouvrir la PR

- Exécuter les tests locaux avec `npx cypress open` / `npx cypress run` et corriger les échecs.
- S'assurer que `npm ci` passe et que le linter (si présent) n'a pas d'erreurs.
- Garder les PRs petites et ciblées (idéalement < 400 lignes).

## Checklist pour le reviewer

- **Fonctionnalité:** Le changement correspond-il à l'objectif décrit dans la PR ?
- **Tests:** Les nouveaux cas E2E/fixtures/pages sont nécessaires et couvrent le comportement.
- **Stabilité:** Les tests sont deterministes (pas de sleeps arbitraires, pas de dépendance au timing).
- **Selectors:** Les sélecteurs sont robustes (utiliser data-* attributes si possible, éviter les sélecteurs UI fragiles).
- **Page objects:** Les helpers/pages sont réutilisables et placés sous `cypress/pages`.
- **Fixtures:** Les données de test sont dans `cypress/fixtures` et anonymisées si nécessaire.
- **Assertions:** Les assertions vérifient l'intention, pas seulement l'existence d'un élément.
- **Artefacts:** Les screenshots/videos utiles sont générés en local pour les échecs.
- **CI:** La PR passe la CI (workflow `/.github/workflows/cypress.yml`).
- **Performance:** Pas d'ajout massif de tests lents sans justification.
- **Docs:** Mettre à jour le `README.md` si le comportement public change.

## En cas d'échec CI

- Vérifier les artefacts attachés à l'exécution (screenshots/videos) pour debug.
- Relancer la job si l'échec semble dû à une instabilité réseau ou environnement.

## Critères d'acceptation

- Aucun test E2E ne doit être cassé par la PR.
- Les modifications de tests doivent inclure une explication sur la cause (flakiness, refactor, changement d'API).

## Bonnes pratiques

- Ajouter des tests unitaires/integ lorsqu'applicable avant d'ajouter des tests E2E.
- Favoriser les identifiants `data-cy` pour sélectionner les éléments.
- Ne pas committer des secrets dans `cypress/fixtures`.

---
Si vous voulez, j'ajoute un template de PR ou un fichier `CODEOWNERS` pour exiger des relecteurs spécifiques.

## Vérifications automatisées

Des vérifications automatiques ont été ajoutées pour remplacer le template de test `cypress/e2e/codeReview.cy.js` :

- `scripts/check-data-test.js` : recherche l'utilisation d'attributs `data-test` ou `data-cy` dans `cypress/`.
- `scripts/check-fixtures-secrets.js` : scanne `cypress/fixtures` pour des patterns de secrets évidents.

Commandes NPM disponibles :

```
npm run check:data-test
npm run check:secrets
npm run check:all
```

Ces checks sont exécutés dans le workflow CI via le job `code-quality`.
