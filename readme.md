# 🚀 Portfolio - Architecture Conteneurisée

Ce dépôt héberge le code source et la configuration infrastructure de mon portfolio professionnel. Le projet a été refondu pour passer d'une architecture statique à une application **PHP 8.2 native**, sécurisée et optimisée pour le déploiement continu (DevOps).

L'objectif est de démontrer une maîtrise de la chaîne complète : du développement backend à l'hébergement sur cluster **Kubernetes** (K3s), en passant par l'optimisation **SEO** et l'automatisation **CI/CD**.

## 🏗️ Architecture Technique

Le projet repose sur une stack moderne et légère :

* **Backend :** PHP 8.2 (Image officielle Docker `php:8.2-apache`).
* **Frontend :** HTML5 / TailwindCSS (compilé en JIT pour la production).
* **Serveur Web :** Apache configuré avec `mod_rewrite` (Réécriture d'URL, gestion personnalisée des erreurs 404).
* **Sécurité :** Architecture avec dossier `public/` isolé (les données JSON et les includes PHP sont inaccessibles via le navigateur).
* **Déploiement :** Image Docker hébergée sur GHCR, déployée sur Cluster K3s avec mise à jour automatique (Watcher pattern).

## 📂 Structure du Projet

L'arborescence suit les standards MVC/Framework pour sécuriser les fichiers sensibles :

```
portfolio-bts-sio
│   .dockerignore
│   .gitattributes
│   .gitignore
│   apache-config.conf
│   docker-compose.yaml
│   Dockerfile
│   package-lock.json
│   package.json
│   readme.md
│   tailwind.config.js
│
├───data
│       certifications.json
│       competences.json
│       experiences.json
│       formations.json
│       projets.json
│       veille.json
│
├───includes
│       footer.php
│       header.php
│
└───public
    │   404.php
    │   en-cours.php
    │   index.php
    │   robots.txt
    │   sitemap.xml
    │
    └───assets
        ├───css
        │       input.css
        │       output.css
        │       style.css
        │
        ├───documents
        │       referentiel_epreuve-E5.pdf
        │
        ├───img
        │   │   photo-louis-medo.png
        │   │   projet-k3s-loutik.png
        │   │   projet-traefik.png
        │   │   projet-wiki-loutik.png
        │   │   veille-techno-banniere-it_connect.png
        │   │   veille-techno-banniere-le_monde_informatique.png
        │   │
        │   ├───certifications
        │   │       banniere-aws-cloud-practitionner.svg
        │   │       banniere-ebios-risk-manager.png
        │   │       banniere-pix.png
        │   │       banniere-secnum-academie.png
        │   │
        │   └───favicon
        │           android-chrome-192x192.png
        │           android-chrome-512x512.png
        │           apple-touch-icon.png
        │           favicon-16x16.png
        │           favicon-32x32.png
        │           favicon.ico
        │           site.webmanifest
        │
        └───js
                script.js
```

* `public/` : **Racine Web**. Seul ce dossier est exposé par Apache. Contient `index.php`, les assets (CSS/IMG) et le `robots.txt`.
* `includes/` : Fragments de code PHP réutilisables (Header, Footer). Non accessible directement.
* `data/` : Sources de données au format JSON (Projets, Veille, Compétences).
* `apache-config.conf` : Configuration du VirtualHost (DocumentRoot, Alias, RewriteRules).
* `.github/workflows/` : Pipeline d'intégration et de livraison continue.

## 🛠️ Workflow de Développement

**Prérequis**

* Docker & Docker Compose
* Node.js (uniquement pour la compilation TailwindCSS en local)
* Git

1. **Installation des dépendances (CSS)**
Nous utilisons TailwindCSS en mode CLI pour éviter l'usage de CDN en production.

```bash
npm install
```

2. **Lancer l'environnement de développement**

Pour travailler sur le design avec re-compilation automatique du CSS :

```bash
npm run dev
```

3. **Gestion des Versions (Versioning)**

Le projet utilise **Git Tags** pour versionner l'application. Cette version est injectée dynamiquement dans le conteneur et affichée dans le footer du site.

```bash
# Créer une nouvelle version
git tag v1.0.0
git push origin v1.0.0
```

## 🐳 Build & Conteneurisation

L'image Docker est construite pour être **stateless** et **immuable**.

### Construction locale (Test)

Pour simuler un build de production en injectant la version Git actuelle :

```bash
# 1. Construction de l'image avec argument de build
docker build --build-arg APP_VERSION=$(git describe --tags --always) -t mon-portfolio:local .

# 2. Lancement du conteneur (Port 8080)
docker run -d -p 8080:80 --name test-portfolio mon-portfolio:local
```

Accès : `http://localhost:8080`

## ⚙️ Pipeline CI/CD & Déploiement

L'automatisation est gérée par **GitHub Actions**.

1. **Trigger :** Push sur la branche `main` ou création d'un Tag.
2. **Build :** Construction de l'image Docker optimisée.
3. **Publish :** Envoi de l'image sur le registre **GHCR** (GitHub Container Registry).
4. **Deploy (GitOps) :**
* Sur le cluster K3s, un agent **Keel** surveille le registre.
* Dès qu'une nouvelle image est détectée (basée sur le hash SHA ou le tag), Keel met à jour le déploiement sans intervention humaine (Zero-Touch Deployment).

## 👤 Auteur
**Louis MEDO** - Étudiant BTS SIO (SISR)
*Passionné par l'administration système et le DevOps.*