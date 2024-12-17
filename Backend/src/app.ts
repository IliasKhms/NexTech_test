import express, { Application } from 'express';
import http from 'http';
import {Server as SocketIOServer} from 'socket.io';
import cors from 'cors';

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

//Lancement du serveur

const PORT = 5000; // Port du serveur
server.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
