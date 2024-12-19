//Ici on met en place le CRUD des commandes : les plus important sont l'Update,Creat et Read
/*Il existe 3 type d'update : 
- updateStatus et updatePayment : permet de changer le statut et le paiement de la commande, ce qui va nous permettre de gerer l'affichage des commandes sur l'écran TV en front
- updateCommande : permet de changer les informations de la commande
*/

import { Request, Response } from 'express';
const Commande = require('../models/commande');

//Créer une commande

export const createCommande = async (req:Request, res:Response) => {
    try {
        const commande = await Commande.create(req.body);
        res.status(201).json(commande);
    } catch (error: any) {
        res.status(500).json({ error : error.message });
    }
};

//Modifier une commande

export const updateCommande = async (req:Request, res:Response) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (commande) {
            await commande.update(req.body);
            res.status(200).json(commande);
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

//Afficher toutes les commandes

export const getAllCommandes = async (req:Request, res:Response) => {
    try {
        const commandes = await Commande.findAll();
        res.status(200).json(commandes);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};





