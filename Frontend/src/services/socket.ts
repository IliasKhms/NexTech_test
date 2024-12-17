// Ce service permet de créer une instance Socket.io pour communiquer avec le serveur
//Permet de ne pas répéter l'import de l'instance Socket.io dans chaque composant qui en a besoin

import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

// Créer une instance Socket.io
export const socket: Socket = io(SOCKET_URL);
