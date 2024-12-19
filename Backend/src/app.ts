import express, { Application } from 'express';
import http from 'http';
import {Server as SocketIOServer} from 'socket.io';
import cors from 'cors';
import { Sequelize} from 'sequelize';
import {initCommandModel}from './models/commande';
//Application express
const app: Application = express();

//Configuration des middlewares
app.use(cors()); //Permet au front de communiquer avec le back
app.use(express.json()); //Permet de parser les requêtes en JSON

//creation du serveur http integrant socket.io

const server = http.createServer(app);
const socketIO = new SocketIOServer(server, {
    cors: {
        origin: "http://localhost:3000", // Adresse du frontend
        methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes autorisées
    },
});

//Ecoute des événements socket.io

socketIO.on('connection', (socket) => {
    console.log('Un client est connecté !');

    socket.on('disconnect', () => {
        console.log('Un client est déconnecté !');
    });

    socket.on("cmdValide", (data) => {
        console.log("Commande validée :", data);
        socketIO.emit("cmdValide", data);
    });

    socket.on("cmdModifiee", (data) => {
        console.log("Commande modifiée :", data);
        socket.broadcast.emit("cmdModifiee", data);
    })
});

//gestion déconnexion

socketIO.on('disconnect', () => {
    console.log('Un client est déconnecté !');
});

app.get('/api', (req, res) => {
    res.send('API fonctionnelle !');
});

//Connexion à la base de données

const sequelize= new Sequelize(
    'nextechdb', // Nom de la base de données que l'on veut créer
    'root', // identifiant de l'utilisateur
    '', // mot de passe de l'utilisateur
    {
      host: 'localhost',
      dialect: 'mariadb',
      dialectOptions: {
        timezone: 'Etc/GMT-2',
      },
      logging: false
    }
);

initCommandModel(sequelize); // Initialise le modèle Commande

sequelize
    .authenticate()
    .then(() => {
        console.log('Connexion à la base de données réussie !');

        // Synchroniser les modèles avec la base de données
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log('Les tables ont été créées ou mises à jour avec succès !');
        
        // Lancer le serveur 
        const PORT = 5000;
        server.listen(PORT, () => {
            console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erreur lors de la création des tables :', error);
    });
