import { Router } from "express";
import express from "express";
import { getAllCommandes,
         createCommande,
         updateCommandeContent,
         updateCommandeStatut,
         updateCommandePaiement } from "../controllers/commandeController";



const router = express.Router();

router.get('/commandes', getAllCommandes);

router.post('/commande', createCommande);

router.put('/commande/:id/content', updateCommandeContent);

router.put('/commande/:id/statut', updateCommandeStatut);

router.put('/commande/:id/paiement', updateCommandePaiement);

export default router;


