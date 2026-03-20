# Hexa-Control

Hexa-Control est une application desktop Windows (Tauri + React + TypeScript + Rust) pour l'administration distante de serveurs Linux.

## Ce qui est livré (Étapes 2 + 3)

- **Squelette complet** du projet avec configuration build Tauri/Vite.
- **UI de base** avec thème sombre, sidebar, navigation multi-pages.
- **Modèles de données** métier pour serveurs, métriques, screen, FiveM, UFW, DB, logs.
- **Services SSH mockés** via commandes Rust Tauri.
- **Implémentations progressives initiales**:
  - Gestion multi-serveurs (liste + ajout local mock)
  - Dashboard monitoring mocké
  - Page SSH (test connexion + exécution commande)
  - Page screen
  - Page FiveM
  - Page UFW
  - Page Base de données
  - Journal d'activité

## Démarrage

```bash
npm install
npm run dev
```

## Lancer Tauri desktop

```bash
npm install
npm run tauri dev
```

## Notes sécurité (prochaine étape)

- Ajouter vérification des host keys SSH.
- Chiffrer les secrets via plugin secure storage / keyring OS.
- Imposer confirmations explicites avant actions destructrices.
- Ajouter audit structuré persistant SQLite.
