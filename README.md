# 📦 Système de Gestion des Stocks

Une application web moderne et complète pour la gestion des stocks d'une boutique, développée avec Next.js, Prisma, et MySQL.

## 🚀 Fonctionnalités

### 🔐 Authentification & Autorisation
- **Système de connexion sécurisé** avec JWT
- **Gestion des rôles** : Administrateur et Employé
- **Permissions différenciées** selon le rôle

### 📦 Gestion des Articles
- ✅ CRUD complet (Créer, Lire, Modifier, Supprimer)
- ✅ Informations détaillées : nom, catégorie, prix, stock, fournisseur
- ✅ Système d'alertes pour stock faible
- ✅ Recherche et filtres avancés

### 📊 Mouvements de Stock
- ✅ Enregistrement des entrées (approvisionnement)
- ✅ Enregistrement des sorties (ventes, pertes)
- ✅ Mise à jour automatique des stocks
- ✅ Historique complet des mouvements
- ✅ Validation des quantités

### 📈 Tableau de Bord
- ✅ Statistiques en temps réel
- ✅ Alertes de stock faible
- ✅ Vue d'ensemble des performances
- ✅ Graphiques et métriques

### 👥 Gestion des Utilisateurs (Admin)
- ✅ Création et gestion des comptes
- ✅ Attribution des rôles
- ✅ Contrôle d'accès granulaire

## 🛠️ Technologies Utilisées

### Frontend
- **Next.js 14** - Framework React avec SSR
- **Tailwind CSS** - Framework CSS utilitaire
- **Lucide React** - Icônes modernes
- **React Hooks** - Gestion d'état moderne

### Backend
- **Next.js API Routes** - API REST intégrée
- **Prisma ORM** - Mapping objet-relationnel
- **MySQL** - Base de données relationnelle
- **JWT** - Authentification sécurisée
- **bcryptjs** - Hachage des mots de passe

## 📋 Prérequis

- **Node.js** 18.x ou supérieur
- **MySQL** 8.0 ou supérieur
- **npm** ou **yarn**

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/stock-management.git
cd stock-management
```

### 2. Installer les dépendances
```bash
npm install
# ou
yarn install
```

### 3. Configuration de l'environnement
Créez un fichier `.env.local` à la racine du projet :

```env
# Base de données MySQL
DATABASE_URL="mysql://username:password@localhost:3306/stock_management"

# JWT Secret (générez une clé secrète forte)
JWT_SECRET="votre_cle_secrete_tres_longue_et_complexe_ici"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre_secret_nextauth"

# Environnement
NODE_ENV="development"
```

### 4. Configuration de la base de données
```bash
# Générer le client Prisma
npx prisma generate

# Créer et synchroniser la base de données
npx prisma db push

# (Optionnel) Ouvrir Prisma Studio pour visualiser les données
npx prisma studio
```

### 5. Données de test (optionnel)
Créez un fichier `prisma/seed.js` pour insérer des données de test :

```javascript
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Créer des utilisateurs par défaut
  const adminPassword = await bcrypt.hash('admin123', 10);
  const employePassword = await bcrypt.hash('employe123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@boutique.ci' },
    update: {},
    create: {
      nom: 'Jean Admin',
      email: 'admin@boutique.ci',
      password: adminPassword,
      role: 'ADMIN'
    }
  });

  await prisma.user.upsert({
    where: { email: 'marie@boutique.ci' },
    update: {},
    create: {
      nom: 'Marie Kouassi',
      email: 'marie@boutique.ci',
      password: employePassword,
      role: 'EMPLOYE'
    }
  });

  console.log('Données de test créées avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Puis exécutez :
```bash
node prisma/seed.js
```

### 6. Lancer l'application
```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur `http://localhost:3000`

## 👤 Comptes par Défaut

### Administrateur
- **Email** : `admin@boutique.ci`
- **Mot de passe** : `admin123`
- **Permissions** : Accès complet à toutes les fonctionnalités

### Employé
- **Email** : `marie@boutique.ci`
- **Mot de passe** : `employe123`
- **Permissions** : Gestion des articles et mouvements de stock

## 📚 Structure du Projet

```
├── pages/
│   ├── api/          # API Routes
│   ├── _app.js       # Configuration globale de l'app
│   └── index.js      # Page principale
├── components/       # Composants React réutilisables
├── lib/             # Utilitaires et configurations
├── prisma/          # Schéma et migrations de la base de données
├── styles/          # Fichiers CSS
└── public/          # Assets statiques
```

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm run start

# Linting
npm run lint

# Base de données
npm run db:push      # Synchroniser le schéma
npm run db:generate  # Générer le client Prisma
npm run db:studio    # Ouvrir Prisma Studio
```

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez automatiquement

### Autres Plateformes
- **Netlify** : Avec support des API Routes
- **Railway** : Avec base de données MySQL incluse
- **DigitalOcean App Platform**

## 📊 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion utilisateur
- `GET /api/auth/verify` - Vérification du token

### Articles
- `GET /api/articles` - Liste des articles
- `POST /api/articles` - Créer un article
- `PUT /api/articles/[id]` - Modifier un article
- `DELETE /api/articles/[id]` - Supprimer un article

### Mouvements
- `GET /api/mouvements` - Liste des mouvements
- `POST /api/mouvements` - Créer un mouvement

### Utilisateurs (Admin uniquement)
- `GET /api/users` - Liste des utilisateurs
- `POST /api/users` - Créer un utilisateur
- `PUT /api/users/[id]` - Modifier un utilisateur
- `DELETE /api/users/[id]` - Supprimer un utilisateur

## 🔒 Sécurité

- **Authentification JWT** avec expiration
- **Hachage des mots de passe** avec bcryptjs
- **Validation des données** côté serveur
- **Protection CORS** configurée
- **Contrôle d'accès basé sur les rôles**

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- 📧 Email : support@votre-domaine.com
- 🐛 Issues : [GitHub Issues](https://github.com/votre-username/stock-management/issues)
- 📖 Documentation : [Wiki](https://github.com/votre-username/stock-management/wiki)

---

Développé avec ❤️ pour optimiser la gestion des stocks de votre boutique.