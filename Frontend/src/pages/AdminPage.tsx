import React, { useEffect, useState } from 'react';
import api from '../services/api.ts'; // Instance Axios configurée
import { socket } from '../services/socket.ts'; // Instance Socket.io configurée

interface Commande {
    id: number;
    menu: string;
    supplement: string;
    modification: string;
    statut: string;
    paiement: boolean;
    createdAt: string;
}

const AdminPage: React.FC = () => {
    const [commandes, setCommandes] = useState<Commande[]>([]); // État pour stocker les commandes
    const [newCommande, setNewCommande] = useState({ menu:'',supplement:'', modification:'',statut: 'En préparation', paiement: false }); // État pour stocker les données du formulaire
    

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
                              statut: 'En préparation',
                               paiement: false 
                            }); //Réinitialiser le formulaire


        }catch(err:any){
            console.error('Erreur lors de la création de la commande :', err);
        }


    };
    //Gérer le bouton notifier
    const handleNotify = async (id: number) => {
    };
    //Gérer le bouton modifier
    const handleUpdateCommande = async (id: number) => {
    };
    //Gérer le bouton paiement
    const handleUpdatePayment = async (id: number) => {
    };
    //Gérer le bouton fin
    const handleUpdateStatut = async (id: number) => {
    };

    return (
        <div>
            <h1>Page Admin</h1>

            <h2>Créer une Commande</h2>
            <form onSubmit={handleCreateCommande}>
                <label>Menu</label>
                <select
                    name= "menu"
                    value={newCommande.menu}
                    onChange={handleChoice}>
                    <option value="" disabled >Choisissez un menu</option>
                    <option value="Menu Burger">Menu Burger</option>
                    <option value="Menu Kebab">Menu Kebab</option>
                    <option value="Menu Tacos">Menu Tacos</option>
                    <option value="Menu Pizza">Menu Pizza</option>
                    <option value="Menu Salade">Menu Salade</option>
                </select>
                <label>Supplément</label>
                <select
                    name='supplement'
                    value={newCommande.supplement}
                    onChange={handleChoice}>
                    <option value="" disabled>Choisissez un supplément</option>
                    <option value="Frites">Frites</option>
                    <option value="Boisson">Boisson</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Sauce">Sauce</option>
                    <option value="Fromage">Fromage</option>
                    <option value="Salade">Salade</option>
                </select>
                <label>Modification</label>
                <select
                    name='modification'
                    value={newCommande.modification}
                    onChange={handleChoice}>
                    <option value="" disabled>Choisissez une modification</option>
                    <option value="Complet">Complet</option>
                    <option value="Sans sauce">Sans sauce</option>
                    <option value="Sans tomate">Sans tomate</option>
                    <option value="Sans oignon">Sans oignon</option>
                    <option value="Sans cornichon">Sans cornichon</option>
                    <option value="Sans fromage">Sans fromage</option>
                    <option value="Sans salade">Sans salade</option>
                </select>
                <button type="submit">Créer commande</button>

            </form>

           
           
            <h2>Liste des Commandes</h2>
            {commandes.length === 0 ? (
                <p>Aucune commande disponible.</p>
            ) : (
                <ul>
                    {commandes.map((commande) => (
                        <li key={commande.id}>
                            <strong>Numéro de commande :</strong> {commande.id} <br />
                            <strong>Date :</strong> {commande.createdAt} <br />
                            <strong>Contenu :</strong> {commande.menu} <br />
                            <strong>Statut :</strong> {commande.statut} <br />
                        </li> 
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminPage;
