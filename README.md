# 🏢 BeTA Engineering — Site Web Corporate & Plateforme d'Ingénierie Panafricaine

> **"Du réseau à l'automatisme, nous connectons votre performance."**  
> Siège : Centre Urbain Nord, Tunis, Tunisie • Zone d'intervention : Tunisie & tout le continent africain.

---

## 🎯 Présentation du Projet

Plateforme web complète, moderne et responsive développée pour **BeTA Engineering** (anciennement Société Didier), spécialisée dans 5 grands pôles techniques :
1. **Réseaux informatiques & Télécoms** (Câblage structuré cuivre/fibre optique, vidéosurveillance CCTV, Wi-Fi pro, baies de brassage, firewalls, supervision 24/7).
2. **Électricité bâtiment & Tertiaire** (Tableaux électriques, colonnes montantes, éclairage LED, mise à la terre, conformité NF C 15-100).
3. **Électricité industrielle & Tableauterie** (Conception et **fabrication d'armoires électriques sur mesure** à Tunis, TGBT jusqu'à 4000A, variateurs de vitesse).
4. **Automatisme & SCADA** (Automates PLC Siemens / Schneider, IHM tactiles, instrumentation, robotique, rétrofit de lignes).
5. **Services informatiques & Cybersécurité** (Développement web & applicatif, pentest & audits sécurité, cloud hybride).

---

## 🎨 Identité Visuelle & Charte Graphique

- **ICE WHITE** : `#F4FAFA` (Fonds épurés, grands espaces blancs)
- **DEEP TEAL** : `#0B4F5C` (Couleur principale : navigation, titres, boutons majeurs, footer)
- **SOFT PEACH** : `#FFCBA4` (Couleur d'accentuation : CTA percutants, badges, survols)
- **Typographie** : *Plus Jakarta Sans* pour les titres & *Inter* pour le corps de texte.
- **Support Multilingue Réactif** : Français (FR), Anglais (EN) et Arabe (AR avec support RTL natif).

---

## 🚀 Fonctionnalités Clés

- **Frontend Public Haut de Gamme** :
  - Navbar sticky avec mega-menus déroulants détaillant les sous-prestations des 5 pôles.
  - Hero impactant avec doubles CTA et badges de réassurance (atelier à Tunis, normes NF C 15-100).
  - Bandeau de statistiques animées (+15 ans, +380 projets, +160 clients, 14 pays couverts).
  - Carte interactive SVG de l'Afrique illustrant le rayonnement à partir du hub de Tunis.
  - Pages dédiées pour chacun des 5 services (méthodologie en 4 étapes, FAQ liée, devis rapide).
  - Galerie de réalisations filtrable par catégorie avec fiches détaillées.
  - Page À Propos (histoire, mission, valeurs, équipe dirigeante, certifications).
  - Page Contact avec coordonnées complètes, formulaire validé par Zod, bouton WhatsApp direct et Google Maps intégrée (Tunis).
  - Formulaire de demande de devis en **5 étapes** avec upload de plans et pièces jointes (jusqu'à 10 Mo).
  - Bouton flottant WhatsApp, bouton de retour en haut, bannière de consentement cookies RGPD.
- **Espace d'Administration Sécurisé (`/admin`)** :
  - Authentification NextAuth avec mots de passe hachés (bcrypt) et protection via middleware.
  - Tableau de bord statistique (devis reçus, messages non lus, projets actifs).
  - Gestion des devis (changement de statut, qualification, notes internes, export CSV complet, téléchargement des pièces jointes).
  - Gestion des messages de contact (marquer lu/non lu, réponse email directe).
  - CRUD Projets avec upload d'images optimisées automatiquement en WebP via **Sharp**.
  - Paramètres du site (coordonnées, slogans, compteurs clés, remplacement du logo).
- **SEO & Performance** :
  - Balises OpenGraph et Twitter Cards avec image 1200x630 générée.
  - Données structurées JSON-LD (`Organization` & `LocalBusiness`).
  - Génération automatique du `sitemap.xml` et `robots.txt`.
  - Protection anti-spam par pot de miel (*honeypot*) sans perturber l'expérience utilisateur.

---

## 💻 Stack Technique

- **Framework** : Next.js 14+ (App Router)
- **Langage** : TypeScript
- **Styles & Animations** : Tailwind CSS, Lucide React, Framer Motion
- **Base de Données & ORM** : Prisma ORM (SQLite en local / PostgreSQL en production Docker/Cloud)
- **Authentification** : NextAuth.js (Auth.js) avec bcryptjs
- **Formulaires & Validations** : Zod, React Hook Form
- **Traitement d'Images** : Sharp (redimensionnement et conversion WebP automatique)
- **Emails** : Nodemailer (avec templates HTML personnalisés aux couleurs BeTA)

---

## 🛠️ Installation & Démarrage en Développement Local

### 1. Prérequis
- Node.js version 18 ou supérieure
- npm

### 2. Installation
```bash
# Cloner le dépôt et se placer dans le dossier
cd societe

# Installer les dépendances
npm install
```

### 3. Base de données & Seed
Le projet est préconfiguré avec une base SQLite `dev.db` prête à l'emploi. Pour synchroniser et re-générer les données de démonstration :
```bash
# Générer le client Prisma
npx prisma generate

# Pousser le schéma
npx prisma db push

# Exécuter le seed avec les données réalistes
node prisma/seed.js
```

### 4. Démarrer le serveur de développement
```bash
npm run dev
```
Rendez-vous sur [http://localhost:3000](http://localhost:3000).

---

## 🔐 Identifiants d'Accès à l'Administration

- **URL de connexion** : [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email** : `admin@beta-engineering.com`
- **Mot de passe** : `Admin@2026!BeTA`

*(Vous pouvez modifier le mot de passe ou créer de nouveaux utilisateurs depuis la base de données ou l'admin).*

---

## 🚢 Déploiement en Production

### Option A : Déploiement avec Docker & docker-compose (Recommandé sur VPS Ubuntu)

1. Connectez-vous à votre serveur VPS :
```bash
ssh root@votre-ip-serveur
```
2. Installez Docker & Docker Compose :
```bash
apt-get update && apt-get install -y docker.io docker-compose
```
3. Clonez le projet sur le serveur, configurez votre `.env` à partir de `.env.example`, puis lancez :
```bash
docker-compose up -d --build
```
4. Exécutez les migrations et le seed dans le conteneur :
```bash
docker-compose exec app npx prisma db push
docker-compose exec app node prisma/seed.js
```
5. Configurez Nginx en reverse proxy vers `http://localhost:3000` et activez le certificat SSL gratuit Let's Encrypt :
```bash
certbot --nginx -d votre-domaine.com
```

### Option B : Déploiement Cloud (Vercel + Supabase / Neon PostgreSQL)

1. Créez un projet PostgreSQL gratuit sur **Neon** ([neon.tech](https://neon.tech)) ou **Supabase** ([supabase.com](https://supabase.com)).
2. Modifiez le `provider = "postgresql"` dans `prisma/schema.prisma` (ou utilisez la variable `DATABASE_URL`).
3. Importez votre dépôt GitHub sur **Vercel**.
4. Renseignez les variables d'environnement dans le tableau de bord Vercel :
   - `DATABASE_URL` (chaîne de connexion PostgreSQL de Neon/Supabase)
   - `NEXTAUTH_SECRET` (clé aléatoire 32 caractères)
   - `NEXTAUTH_URL` (URL finale en production, ex: `https://votre-domaine.com`)
   - `NEXT_PUBLIC_APP_URL` (`https://votre-domaine.com`)
   - `ADMIN_EMAIL` (`contact@beta-engineering.com`)
5. Cliquez sur **Deploy**.

---

## 📁 Structure du Projet

```
societe/
├── prisma/
│   ├── schema.prisma       # Schéma de base de données (13 modèles)
│   ├── seed.js             # Données réalistes (Admin, 5 services, projets, partenaires...)
│   └── dev.db              # Base SQLite locale
├── public/
│   ├── brand/              # Logos vectoriels SVG (logo.svg, logo-light.svg, icon.svg, partenaires)
│   ├── images/             # Visuels WebP haute résolution des services et projets
│   ├── uploads/            # Stockage local des uploads images et devis
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── og-image.jpg        # Image Open Graph 1200x630
├── src/
│   ├── app/                # Next.js 14 App Router
│   │   ├── (public)        # Pages Accueil, Services, Projets, À Propos, Devis, Contact...
│   │   ├── admin/          # Espace d'administration protégé (/admin, /admin/quotes, etc.)
│   │   ├── api/            # Routes API (quote, contact, upload, admin CRUD, export CSV)
│   │   ├── layout.tsx      # Layout racine avec JSON-LD et Providers
│   │   ├── globals.css     # Styles et scrollbar sur mesure
│   │   ├── sitemap.ts      # Sitemap XML dynamique
│   │   └── robots.ts       # Robots.txt
│   ├── components/         # Composants UI (Navbar, Footer, AfricaMap, StatCounters, Card...)
│   ├── context/            # Context multilingue (LanguageContext.tsx)
│   └── lib/                # Utilitaires Prisma, Auth.js, i18n, Email
├── Dockerfile              # Image Docker multi-stage optimisée
├── docker-compose.yml      # Orchestration Next.js + PostgreSQL + Volumes
└── README.md
```

---

## 📞 Support & Contact

- **BeTA Engineering**
- Immeuble Le Grand Boulevard, Centre Urbain Nord, 1082 Tunis, Tunisie
- Tél : +216 71 888 999 • WhatsApp : +216 98 123 456
- Email : `contact@beta-engineering.com`
