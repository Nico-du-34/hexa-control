# Hexa-Control

Hexa-Control est une application desktop Windows (Tauri + React + TypeScript + Rust) pour l'administration distante de serveurs Linux.

## Livré actuellement

- Squelette projet Tauri/Vite prêt à lancer.
- UI admin panel (sombre) avec sidebar + routing multi-modules.
- Écrans MVP: Dashboard, Serveurs, SSH, Screen, FiveM, UFW, Base de données, Logs.
- Store central Zustand avec données mock.
- Commandes Rust Tauri mockées pour SSH.

## Fonctions MVP mockées

- **Serveurs**: ajout + suppression avec confirmation.
- **Dashboard**: cartes monitoring + auto-refresh (5s).
- **SSH**: test de connexion, exécution commande, bibliothèque + historique.
- **Screen**: création/suppression de sessions.
- **FiveM**: update artifacts avec confirmation et log.
- **UFW**: ajout/suppression de règles avec confirmation.
- **DB**: exécution SQL mockée avec alerte destructive.
- **Logs**: journal d'audit local affiché dans l'UI.

## Démarrage

```bash
npm install
npm run dev
```

## Lancer en desktop

```bash
npm run tauri dev
```

## Prochaines priorités

- SSH réel (host key pinning, key auth, passphrase).
- Chiffrement des secrets (Windows Credential Manager / DPAPI).
- Persistance SQLite locale (serveurs, commandes, audit).
- Exécution réelle UFW/screen/FiveM/DB avec garde-fous renforcés.
