import React, { useEffect, useState } from 'react';
import { socket } from '../../services/socket.ts';
import api from '../../services/api.ts';
import './TvPage.css';

interface Commande {
    id: number;
    menu: string;
    supplement: string;
    modification: string;
    statut: string; // 'En attente', 'Prête', 'Finie'
    createdAt: string; 
}

const TvPage: React.FC = () => {
    const [wait, setWait] = useState<Commande[]>([]);
    const [ready, setReady] = useState<Commande[]>([]);
    const [finished, setFinished] = useState<Commande[]>([]);

    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                const response = await api.get('/commandes');
                const commandes = response.data;

                setWait(commandes.filter((cmd: Commande) => cmd.statut === 'En attente'));
                setReady(commandes.filter((cmd: Commande) => cmd.statut === 'Prête'));
                setFinished(commandes.filter((cmd: Commande) => cmd.statut === 'Finie'));
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes:', error);
            }
        };

        fetchCommandes();
    }, []);

    useEffect(() => {
        const updateColumns = (updatedCommande: Commande) => {
            // Supprimer la commande des colonnes actuelles
            setWait((prev) => prev.filter((cmd) => cmd.id !== updatedCommande.id));
            setReady((prev) => prev.filter((cmd) => cmd.id !== updatedCommande.id));
            setFinished((prev) => prev.filter((cmd) => cmd.id !== updatedCommande.id));

            // Ajouter la commande dans la bonne colonne
            if (updatedCommande.statut === 'En attente') {
                setWait((prev) => [...prev, updatedCommande]);
            } else if (updatedCommande.statut === 'Prête') {
                setReady((prev) => [...prev, updatedCommande]);
            } else if (updatedCommande.statut === 'Finie') {
                setFinished((prev) => [...prev, updatedCommande]);

                // Supprimer la commande terminée après 3 secondes
                setTimeout(() => {
                    setFinished((prev) => prev.filter((cmd) => cmd.id !== updatedCommande.id));
                }, 3000);
            }
        };

        socket.on('commandeCreer', (commande: Commande) => {
            if (commande.statut === 'En attente') {
                setWait((prev) => [...prev, commande]);
            }
        });

        socket.on('statutUpdate', (updatedCommande: Commande) => {
            updateColumns(updatedCommande);
        });

        return () => {
            socket.off('commandeCreer');
            socket.off('statutUpdate');
        };
    }, []);


    return (
        <div className="tv-page">
            <div className="column wait">
                <h2>Merci de venir encaisser</h2>
                {wait.map((commande) => (
                    <div key={commande.id} className="commande">
                        <p><strong>Numéro de commande : {commande.id}</strong></p>
                    </div>
                ))}
            </div>
            <div className="column ready">
                <h2>Prête</h2>
                {ready.map((commande) => (
                    <div key={commande.id} className="commande">
                        <p><strong>Numéro de commande : {commande.id}</strong></p>
                    </div>
                ))}
            </div>
            <div className="column finished">
                <h2>Finie</h2>
                {finished.map((commande) => (
                    <div key={commande.id} className="commande">
                        <p><strong>Numéro de commande : {commande.id}</strong></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TvPage;
