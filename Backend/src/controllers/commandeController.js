//Ici on met en place le CRUD des commandes : les plus important sont l'Update,Creat et Read
/*Il existe 3 type d'update : 
- updateStatus et updatePayment : permet de changer le statut et le paiement de la commande, ce qui va nous permettre de gerer l'affichage des commandes sur l'écran TV en front
- updateCommande : permet de changer les informations de la commande
*/
const Commande = require('../models/commande');

//Créer une commande

exports.createCommande = async (req, res) => {
    try {
        const commande = await Commande.create(req.body);
        res.status(201).json(commande);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Modifier une commande

exports.updateCommande = async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (commande) {
            await commande.update(req.body);
            res.status(200).json(commande);
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Afficher toutes les commandes

exports.getAllCommandes = async (req, res) => {
    try {
        const commandes = await Commande.findAll();
        res.status(200).json(commandes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





