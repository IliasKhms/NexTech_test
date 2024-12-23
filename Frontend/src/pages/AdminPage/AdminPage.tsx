import React, { useEffect, useState } from 'react';
import api from '../../services/api.ts'; // Instance Axios configurée
import { socket } from '../../services/socket.ts'; // Instance Socket.io configurée
import './AdminPage.css';

interface Commande {
    id: number;
    menu: string;
    supplement: string;
    modification: string;
    statut: string;
    createdAt: string;
}

const AdminPage: React.FC = () => {
    const [commandes, setCommandes] = useState<Commande[]>([]); // État pour stocker les commandes
    const [newCommande, setNewCommande] = useState({ menu:'',supplement:'', modification:'',statut: 'En attente' }); // État pour stocker les données du formulaire
    

    // Charger les commandes au montage
    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                
                const response = await api.get('/commandes');
                setCommandes(response.data);
                console.log('Commandes récupérées :', response.data);
                
            } catch (err: any) {
                console.error('Erreur lors de la récupération des commandes :', err);
               
            }
        };

        fetchCommandes();
    }, []);

    // Gestion des événements Socket.io
    useEffect(() => {
        // Ajouter une commande
        socket.on('commandeCreer', (newCommande: Commande) => {
            setCommandes((prev) => [...prev, newCommande]);
        });


        // Nettoyer les écouteurs au démontage
        return () => {
            socket.off('commandeCreer');
           
        };
    }, []);

    //Gérer le formulaire de creation de commande
    
    const handleChoice = (e) => {
        const { name, value } = e.target;
        setNewCommande({
            ...newCommande,
            [name]: value,   // Met à jour la propriété correspondante (menu, supplement, ou modification)
        });
    };
    const handleCreateCommande = async (e:React.FormEvent) => {
        e.preventDefault();
        console.log("Données envoyées :", newCommande);
        try{
            const response = await api.post('/commande', newCommande);
            console.log('Commande créée :', response.data);
            setNewCommande({  menu:'',
                              supplement:'', 
                              modification:'',
                              statut: 'En attente'
                            }); //Réinitialiser le formulaire


        }catch(err:any){
            console.error('Erreur lors de la création de la commande :', err);
        }


    };
    //Gérer le bouton notifier
    const handleNotify = async (id: number) => {
        try {
            // Appel API pour mettre à jour le statut dans la base de données
            await api.put(`/commande/${id}/statut`, { statut: 'En préparation' });
    
            // Mise à jour de l'état local pour refléter le changement
            setCommandes((prevCommandes) =>
                prevCommandes.map((commande) =>
                    commande.id === id ? { ...commande, statut: 'En préparation' } : commande
                )
            );
    
            console.log(`Commande ${id} mise à jour en "En préparation".`);
        } catch (err: any) {
            console.error(`Erreur lors de la mise à jour de la commande ${id} :`, err);
        }
    };
    
    // Gerer le bouton modifier

    // Gérer le bouton terminer
    const handleEnd = async (id: number) => {
        try {
            // Appel API pour mettre à jour le statut dans la base de données
            await api.put(`/commande/${id}/statut`, { statut: 'Prête' });
    
            // Mise à jour de l'état local pour refléter le changement
            setCommandes((prevCommandes) =>
                prevCommandes.map((commande) =>
                    commande.id === id ? { ...commande, statut: 'Prête' } : commande
                )
            );
    
            console.log(`Commande ${id} mise à jour en "Prête".`);
        } catch (err: any) {
            console.error(`Erreur lors de la mise à jour de la commande ${id} :`, err);
        }
    };
    // Gérer le bouton fin
    const handleFinish = async (id: number) =>   {
        try {
            // Appel API pour mettre à jour le statut dans la base de données
            await api.put(`/commande/${id}/statut`, { statut: 'Finie' });
    
            // Mise à jour de l'état local pour refléter le changement
            setCommandes((prevCommandes) =>
                prevCommandes.map((commande) =>
                    commande.id === id ? { ...commande, statut: 'Finie' } : commande
                )
            );
    
            console.log(`Commande ${id} mise à jour en "Finie".`);
        } catch (err: any) {
            console.error(`Erreur lors de la mise à jour de la commande ${id} :`, err);
        }
    };

    return (
        <div className="admin-container">
            <h1>Page Admin</h1>

            <h2>Créer une Commande</h2>
            <form onSubmit={handleCreateCommande} className="commande-form">
                <label>Menu</label>
                <select name="menu" value={newCommande.menu} onChange={handleChoice} required>
                    <option value="" disabled>
                        Choisissez un menu
                    </option>
                    <option value="Menu Burger">Menu Burger</option>
                    <option value="Menu Kebab">Menu Kebab</option>
                    <option value="Menu Tacos">Menu Tacos</option>
                    <option value="Menu Pizza">Menu Pizza</option>
                    <option value="Menu Salade">Menu Salade</option>
                </select>

                <label>Supplément</label>
                <select name="supplement" value={newCommande.supplement} onChange={handleChoice} required>
                    <option value="" disabled>
                        Choisissez un supplément
                    </option>
                    <option value="Aucun">Aucun</option>
                    <option value="Fromage">Fromage</option>
                    <option value="Salade">Salade</option>
                    <option value="Frites">Frites</option>
                    <option value="Boisson">Boisson</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Sauce">Sauce</option>
                </select>

                <label>Modification</label>
                <select name="modification" value={newCommande.modification} onChange={handleChoice} required>
                    <option value="" disabled>
                        Choisissez une modification
                    </option>
                    <option value="Complet">Complet</option>
                    <option value="Sans sauce">Sans sauce</option>
                    <option value="Sans cornichon">Sans cornichon</option>
                    <option value="Sans tomate">Sans tomate</option>
                    <option value="Sans fromage">Sans fromage</option>
                    <option value="Sans oignon">Sans oignon</option>
                    <option value="Sans salade">Sans salade</option>
                </select>

                <button type="submit">Créer commande</button>
            </form>

            <div className="grid-container">
                <div className="grid-item">
                    <h2>Commandes en Attente</h2>
                    {commandes
                        .filter((commande) => commande.statut === 'En attente')
                        .map((commande) => (
                            <div key={commande.id} className="commande-card">
                                <p><strong>Numéro : {commande.id}</strong></p>
                                <p>Date: {commande.createdAt}</p>
                                <p>Menu : {commande.menu}</p>
                                <p>Supplément : {commande.supplement}</p>
                                <p>Modification : {commande.modification}</p>
                                <button onClick={() => handleNotify(commande.id)}>Notifier</button>
                            </div>
                        ))}
                </div>
                <div className="grid-item">
                    <h2>Commandes en Cours</h2>
                    {commandes
                        .filter((commande) => commande.statut === 'En préparation')
                        .map((commande) => (
                            <div key={commande.id} className="commande-card">
                                <p><strong>Numéro : {commande.id}</strong></p>
                                <p>Menu : {commande.menu}</p>
                                <p>Supplément : {commande.supplement}</p>
                                <p>Modification : {commande.modification}</p>
                                <button onClick={() => handleEnd(commande.id)}>Prête</button>
                            </div>
                        ))}
                </div>
                <div className="grid-item">
                    <h2>Commandes Prêtes</h2>
                    {commandes
                        .filter((commande) => commande.statut === 'Prête')
                        .map((commande) => (
                            <div key={commande.id} className="commande-card">
                                <p><strong>Numéro : {commande.id}</strong></p>
                                <p>Menu : {commande.menu}</p>
                                <p>Supplément : {commande.supplement}</p>
                                <p>Modification : {commande.modification}</p>
                                <button onClick={() => handleFinish(commande.id)}>Fin</button>
                            </div>
                        ))}
                </div>
                <div className="grid-item">
                    <h2>Commandes Finies</h2>
                    {commandes
                        .filter((commande) => commande.statut === 'Finie')
                        .map((commande) => (
                            <div key={commande.id} className="commande-card">
                                <p><strong>Numéro : {commande.id}</strong></p>
                                <p>Menu : {commande.menu}</p>
                                <p>Supplément : {commande.supplement}</p>
                                <p>Modification : {commande.modification}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
        
};

export default AdminPage;
