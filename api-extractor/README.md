# API Extractor

From the root of the project, run `npm run extract`.
This will generate a file called `extracted-api.json`.

Copy the contents of `extracted-api.json` and assign it to the variable `quasarApi` in the file `src/services/theme/api.ts`.

In `api-extractor.js`, components can be added to the array `const COMPONENTS = ['QBtn', 'QInput', 'QCheckbox', 'QColor'];`.
e.g. to also extract `QBadge`, add `'QBadge'` to the array: `const COMPONENTS = ['QBtn', 'QInput', 'QCheckbox', 'QColor', 'QBadge'];`.
