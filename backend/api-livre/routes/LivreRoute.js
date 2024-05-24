
import express from 'express';
import Livre from '../Models/LivreModel.js';

const router = express.Router();

// Retourner les informations d’un livre donné
router.get('/livres/:id', async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.id);
    if (!livre) {
      return res.status(404).json({ message: "Livre n'existe pas" });
    }
    res.status(200).json(livre);
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
});

// Ajouter un nouveau livre
router.post('/livres', async (req, res) => {
  const { Code, Titre, Description, Auteur } = req.body;
  try {
    const newLivre = new Livre({ Code, Titre, Description, Auteur });
    await newLivre.save();
    res.status(200).json(newLivre);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

// Modifier un Livre
router.put('/livre/:id', async (req, res) => {
  const { Code, Titre, Description, Auteur } = req.body;
  try {
    const livre = await Livre.findById(req.params.id);
    if (!livre) {
      return res.status(404).json({ message: "Livre n'existe pas" });
    }
    livre.Code = Code;
    livre.Titre = Titre;
    livre.Description = Description;
    livre.Auteur = Auteur;
    await livre.save();
    res.status(200).json(livre);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

// Supprimer un livre
router.delete('/livres/:id', async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.id);
    if (!livre) {
      return res.status(404).json({ message: "Livre n'existe pas" });
    }
    await livre.remove();
    res.status(200).json({ message: "Livre supprimé avec succès" });
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

export default router;
