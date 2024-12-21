//Ici on met en place le CRUD des commandes : les plus important sont l'Update,Creat et Read
/*Il existe 3 type d'update : 
- updateStatus et updatePayment : permet de changer le statut et le paiement de la commande, ce qui va nous permettre de gerer l'affichage des commandes sur l'écran TV en front
- updateCommande : permet de changer les informations de la commande
*/

import { Request, Response } from 'express';
import { Commande } from '../models/commande';

//Créer une commande

export const createCommande = async (req:Request, res:Response) => {
    try {

        //je crée une commande avec les informations reçues dans le body de la requête
        const commande = await Commande.create(req.body);

        //j'envoie un message à tous les clients connectés pour les informer qu'une commande a été
        const io = req.app.get('socketio');
        if (!io) {
            throw new Error('Socket.io non configuré sur l\'application');
        }
        io.emit('commandeCreer', commande);

        //je renvoie la commande créée au client   
        res.status(201).json(commande);

        return;

       
        
    } catch (error: any) {
        res.status(500).json({ error : error.message });
    }
};

//Modifier le contenu d'une commande

export const updateCommandeContent = async (req:Request, res:Response) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (commande) {
            await commande.update(req.body);
            res.status(200).json(commande);

            const io = req.app.get('socketio');
            io.emit('commandeUpdate', commande);
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

//Modifier le statut d'une commande

export const updateCommandeStatut = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { statut } = req.body;

        const commande = await Commande.findByPk(id);
        if (!commande) {
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }

        commande.statut = statut;
        await commande.save();

        res.status(200).json(commande);

        const io = req.app.get('socketio');
        io.emit('statutUpdate', commande);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};



//Modifier le paiement d'une commande

export const updateCommandePaiement = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { paiement } = req.body;

        const commande = await Commande.findByPk(id);
        if (!commande) {
            res.status(404).json({ message: 'Commande non trouvée' });
            return;
        }

        commande.paiement = paiement;
        await commande.save();

        res.status(200).json(commande);
        const io = req.app.get('socketio');
        io.emit('paiementUpdate', commande);
        
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};



//Afficher toutes les commandes

export const getAllCommandes = async (req:Request, res:Response) => {
    try {
        const commandes = await Commande.findAll();
        res.status(200).json(commandes);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};





