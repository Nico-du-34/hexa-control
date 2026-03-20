# Hexa-Control — Étape 1 (Fondations)

## 1) Architecture logicielle complète

### Choix d’architecture
Hexa-Control adopte une **architecture desktop hybride en couches** :

- **UI layer** : application desktop Windows (WebView + front React).
- **Application layer** : orchestration des cas d’usage (actions utilisateur, validation, workflow, confirmations).
- **Domain layer** : modèles métier (serveur, clé SSH, session screen, règle UFW, job FiveM, audit).
- **Infrastructure layer** : implémentations techniques (SSH, stockage chiffré, accès DB locale, logs, monitoring).

### Pattern interne
- **Feature-first + Clean Architecture light**.
- Front segmenté par modules métier (`servers`, `ssh`, `monitoring`, etc.).
- Back local segmenté en services (`ssh_service`, `ufw_service`, `fivem_service`, `db_service`).
- **Event bus interne** pour les notifications système (toast, états de jobs, erreurs).

### Topologie runtime
- **Processus unique desktop** (Tauri) + backend Rust embarqué.
- Pool de connexions SSH par serveur.
- Tâches asynchrones (tokio) pour monitoring périodique et jobs longs (update artifacts, backup).
- Journal d’audit append-only en local.

---

## 2) Stack recommandée

## Recommandation principale: **Tauri v2 + React + TypeScript + Rust**

### Pourquoi ce choix
- **Native Windows moderne** avec faible empreinte mémoire (plus léger qu’Electron).
- **Sécurité forte** grâce au modèle d’autorisations Tauri + backend Rust.
- **Rust excellent pour SSH/crypto/concurrence** et actions infra sensibles.
- **React + TypeScript** pour productivité UI et maintenabilité.
- Très bonne base pour évoluer vers Linux/macOS plus tard, sans perdre l’objectif Windows.

### Stack détaillée
- **Desktop shell**: Tauri v2
- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui + Lucide icons
- **State management**: Zustand (local UI state) + TanStack Query (données asynchrones)
- **Routing**: React Router
- **Backend desktop**: Rust (Tokio async)
- **SSH**: `russh` (ou `ssh2` si besoins spécifiques de compatibilité)
- **DB locale**: SQLite (`sqlx`)
- **Secrets**: keyring OS + chiffrement supplémentaire (AES-GCM via clé dérivée)
- **Logs**: `tracing`, `tracing-subscriber` (+ table SQLite audit)

### Alternative validée (si équipe 100% .NET)
- **WinUI 3 + .NET 8** possible, mais moins flexible pour une UI web-like moderne et plus coûteux pour cross-plateforme future.

---

## 3) Organisation des dossiers

```text
hexa-control/
  src-tauri/
    src/
      main.rs
      app/
        mod.rs
        commands.rs
      domain/
        models/
        value_objects/
      application/
        use_cases/
        dto/
      infrastructure/
        ssh/
        monitoring/
        fivem/
        firewall/
        database/
        storage/
        audit/
      security/
        crypto.rs
        permissions.rs
      jobs/
      errors/
    migrations/
    tauri.conf.json
    Cargo.toml

  src/
    app/
      router.tsx
      providers/
      layout/
    features/
      dashboard/
      servers/
      ssh/
      users-keys/
      screen/
      fivem/
      firewall/
      databases/
      logs/
      settings/
    entities/
    shared/
      components/
      hooks/
      lib/
      types/
      styles/
  public/
  docs/
    architecture/
    security/
    roadmap/
  scripts/
  package.json
  README.md
```

---

## 4) Modules principaux

1. **Server Registry**
   - CRUD serveurs, groupes, tags, rôle, statut, latence.

2. **SSH Core**
   - Connexion clé privée/passphrase, test, exécution commandes, terminal intégré, historique.

3. **Users & authorized_keys**
   - Liste utilisateurs Linux, lecture/édition clés, vérification/correction permissions `.ssh`.

4. **Screen Manager**
   - Lister/créer/attacher/détacher/tuer sessions, envoi commandes.

5. **FiveM Manager**
   - Détection instance, version artifacts, MAJ avec backup, gestion `server.cfg`, logs dédiés.

6. **Monitoring Engine**
   - CPU/RAM/disque/réseau/load/uptime/temp + statut services + agrégation multi-serveurs.

7. **UFW Manager**
   - Statut, règles, profils rapides, confirmations renforcées.

8. **Database Tools**
   - Connexions MySQL/MariaDB (+ extension PostgreSQL), requêtes, import/export, backup.

9. **Audit & Logs**
   - Journal des actions sensibles, erreurs détaillées, historique par serveur, futur export.

10. **Notification & Guardrails**
   - Toast, confirmations, dry-run quand possible, prévention actions destructrices.

---

## 5) Schéma de données local (SQLite)

### Tables cœur
- `servers`
  - `id`, `name`, `host`, `ssh_port`, `username`, `auth_type`, `private_key_ref`, `role`, `notes`, `created_at`, `updated_at`
- `server_groups`
  - `id`, `name`, `color`
- `server_group_members`
  - `group_id`, `server_id`
- `server_tags`
  - `id`, `label`
- `server_tag_members`
  - `tag_id`, `server_id`

### SSH et historique
- `command_templates`
  - `id`, `name`, `category`, `command`, `is_sensitive`
- `command_history`
  - `id`, `server_id`, `user_input`, `exit_code`, `started_at`, `ended_at`, `is_sensitive`, `output_ref`

### Monitoring
- `metrics_snapshots`
  - `id`, `server_id`, `cpu_pct`, `ram_pct`, `disk_pct`, `load_1m`, `uptime_sec`, `net_rx`, `net_tx`, `temperature_c`, `captured_at`

### Jobs et opérations
- `jobs`
  - `id`, `server_id`, `type`, `status`, `payload_json`, `started_at`, `ended_at`, `error_message`
- `fivem_operations`
  - `id`, `server_id`, `artifact_from`, `artifact_to`, `backup_path`, `status`, `created_at`

### DB connections
- `db_connections`
  - `id`, `server_id`, `engine`, `host`, `port`, `username`, `secret_ref`, `database_name`, `ssl_mode`

### Audit
- `audit_logs`
  - `id`, `timestamp`, `actor`, `server_id`, `action`, `target`, `severity`, `result`, `details_json`, `requires_confirmation`

### Secrets
- **Jamais de secret en clair en SQLite**.
- `private_key_ref` / `secret_ref` pointent vers:
  - Keychain Windows (Credential Manager / DPAPI) + enveloppe chiffrée.

---

## 6) Dépendances recommandées

### Frontend
- `react`, `typescript`, `vite`
- `react-router-dom`
- `@tanstack/react-query`
- `zustand`
- `zod` (validation schémas)
- `react-hook-form`
- `tailwindcss`, `class-variance-authority`, `shadcn/ui`
- `xterm.js` (terminal SSH intégré)
- `recharts` (graphiques monitoring)

### Backend Rust
- `tauri`, `tauri-plugin-log`, `tauri-plugin-store`
- `tokio`
- `serde`, `serde_json`
- `sqlx` (SQLite)
- `russh` / `ssh2`
- `ring` ou `aes-gcm`, `argon2`
- `keyring` (accès coffre OS)
- `tracing`, `thiserror`, `anyhow`

---

## 7) Points de sécurité critiques

1. **Gestion secrets**
   - Clés privées, passphrases, mots de passe DB stockés via coffre OS + chiffrement applicatif.

2. **Host key verification SSH (anti-MITM)**
   - Empreintes hôte enregistrées et validation stricte au premier contact + rotation contrôlée.

3. **Principe du moindre privilège**
   - Pas d’exécution root implicite; commande `sudo` explicite et journalisée.

4. **Confirmations obligatoires**
   - UFW disable, suppression clé SSH, kill session, requête SQL destructive, restart service critique.

5. **Audit inviolable local**
   - Journal append-only logique, horodatage UTC, statut succès/échec, serveur concerné, opérateur local.

6. **Sanitization / allowlist des actions**
   - Templates de commandes validés; avertissement sur commandes libres.

7. **Protection UI/API interne**
   - Tauri commands limitées, validation stricte des payloads (zod/serde), pas d’`eval`.

8. **Timeouts + circuit breaker**
   - Empêche blocages réseau et effets cascades multi-serveurs.

9. **Backups pré-opérations critiques**
   - FiveM artifacts et fichiers conf avant update.

10. **Séparation permissions locales**
   - Profil utilisateur local + futur RBAC possible pour équipes.

---

## 8) Roadmap MVP puis V2

## MVP (livrable rapide mais solide)

### Phase A — Fondations
- Skeleton Tauri + React + routing + thème sombre.
- Modèle `Server` + CRUD local.
- Service SSH mock + test connexion mock.
- Audit local minimal.

### Phase B — Exploitation serveur
- Exécution commandes SSH réelles.
- Terminal intégré.
- Monitoring basique (CPU/RAM/disque/load/uptime).
- Dashboard multi-serveurs.

### Phase C — Opérations admin
- Gestion `authorized_keys` (lecture/ajout/suppression + fix permissions).
- Gestion `screen` (list/create/kill/send cmd).
- UFW lecture + ajout/suppression règle + confirmations.

### Phase D — Fiabilité
- Logs détaillés, gestion erreurs robuste.
- Sauvegarde config locale + export audit.
- Hardening sécurité (host keys, chiffrement secrets finalisé).

## V2 (montée en puissance)
- Full module FiveM (update artifacts avec backup/rollback, gestion ressources avancée).
- Module DB enrichi (éditeur SQL, import/export assisté, PostgreSQL).
- Alerting avancé (seuils, alertes persistantes, webhook/Discord).
- Actions groupées multi-serveurs (runbook).
- RBAC local/équipe et signatures d’actions sensibles.
- Auto-update applicative signée.

---

## Décision finale
Pour Hexa-Control, la combinaison **Tauri + React + TypeScript + Rust** est la plus adaptée à vos contraintes: native Windows, performance, sécurité SSH, UI moderne, et forte évolutivité pour une console d’administration infra multi-serveurs.
