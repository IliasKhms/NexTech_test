# Gestion des Commandes en Temps Réel

Ce projet est une application de gestion des commandes en temps réel, avec une interface **Admin** pour gérer les commandes et une interface **TV** pour afficher leur état en direct.

## Fonctionnalités

- **Page Admin :**
  - Création de commandes via un formulaire.
  - Mise à jour du statut des commandes.
  - Visualisation des commandes en attente, en préparation, prêtes ou terminées.

- **Page TV :**
  - Affichage des commandes en temps réel.
  - Organisation des commandes par statut.

- **Backend :**
  - Gestion des API REST pour créer, lire et mettre à jour les commandes.
  - Gestion des événements en temps réel avec **Socket.io**.
  - Synchronisation avec une base de données **MariaDB**.

---

## Installation

### Prérequis

- **Node.js** (>= 16.x) : [Télécharger Node.js](https://nodejs.org/)
- **MariaDB** : [Télécharger MariaDB](https://mariadb.org/download/)

### Étapes d'installation

#### 1. Cloner le dépôt

```bash
git clone https://github.com/IliasKhms/NexTech_test.git
```

#### 2.Installer les dépendances

1. **Backend** :
   ```bash
   cd Backend
   npm install
   ```
2. **Frontend** :
    ```bash
   cd Frontend
   yarn install
   ```
#### 3.Configurer la base de données
-Créez une base de données appelée nextechdb dans phpMyAdmin.

#### 4. Lancer les serveurs
```bash
   cd Backend
   npx ts-node src/app.ts
   ```
```bash
   cd Frontend
   yarn start
   ```
#### 5. Attention : 

- Front : port : 3000
- Back : port : 5000

