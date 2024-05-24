import express from "express"
import EmpruntModel from "../models/Emprunt.js"
import ClientModel from "../../api-client/models/Client.js";
import LivreModel from "../../api-livre/models/LivreModel.js"

const routes = express.Router();

routes.post('/add', (req, res) => {
    const { code_livre, nom } = req.body;
    LivreModel.findOne({ Code: code_livre })
        .then((livre) => {
            ClientModel.find({ nom: nom })
                .then((clients) => {
                    EmpruntModel.create({ nom: nom, code_livre: code_livre })
                        .then((emprunt) => {
                            res.status(200).json(emprunt);
                        })
                        .catch((err) => {
                            res.status(500).send("Erreur lors de la création");
                        });
                })
                .catch((err) => {
                    res.status(404).send("Client non trouvé" + err);
                })
        })
        .catch((err) => {
            res.status(404).send("Livre non trouvé" + err);
        });
});

routes.get("/", (req, res) => {
    EmpruntModel.find()
        .then((emprunts) => {
            res.status(200).json(emprunts);
        })
        .catch((err) => {
            res.status(404).send("Emprunt non trouvé");
        });
});

routes.get("/:id_client", (req, res) => {
    const id = req.params.id_client;
    EmpruntModel.find({ id_client: id })
        .then((emprunts) => {
            res.status(200).json(emprunts);
        })
        .catch((err) => {
            res.status(404).send("Emprunt non trouvé");
        });
});

export default routes;