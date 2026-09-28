# DALIL — دليل (PixelSite 2.0, Phase 2)
Stack: HTML / CSS / vanilla JS (ES modules) / Firebase (Auth, Firestore, Hosting).
1. Put your Firebase config in `js/firebase-config.js` (without it the app runs in local demo mode).
2. Add photos to `assets/img/` named: petra, wadirum, aqaba, jerash, ajloun, north, deadsea (.jpg).
3. `firebase login && firebase init` (reuse firebase.json) → `firebase deploy` — enable Email/Password in Auth and create Firestore.
Screens: Home EN/AR, Discover, Place, Trip Builder (4 steps), Trip result, Experience, Checkout, Dashboard, Passport (hash routing).
