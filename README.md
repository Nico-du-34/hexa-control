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

## Workflow GitHub pour télécharger le `.exe`

Le workflow est dans `.github/workflows/windows-exe.yml`.

### Cas 1 — Build manuel

1. Va dans **Actions** → **Build Windows EXE**.
2. Clique **Run workflow**.
3. Une fois terminé, télécharge l'artifact **hexa-control-windows-exe**.
4. Tu y trouveras l'installateur `.exe` (NSIS) généré par Tauri.

### Cas 2 — Release automatique sur tag

1. Crée et pousse un tag versionné:
   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```
2. Le workflow build l'app Windows puis publie automatiquement les fichiers `.exe`/`.msi` dans la **GitHub Release** du tag.
