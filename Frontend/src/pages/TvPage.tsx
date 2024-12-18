import React, { useEffect } from 'react';
import { socket } from '../services/socket.ts'; // Importer l'instance Socket.io

const TVPage: React.FC = () => {
    useEffect(() => {
        // Émettre l'identifiant de la page au serveur
        socket.emit('page', 'tv');

        // Confirmer la connexion
        socket.on('connection', () => {
            console.log('Connecté au serveur depuis la page TV avec ID :', socket.id);
        });

        // Nettoyer lors du démontage
        return () => {
            socket.off('connection');
        };
    }, []);

    return (
        <div>
            <h1>Page TV</h1>
        </div>
    );
};

export default TVPage;
