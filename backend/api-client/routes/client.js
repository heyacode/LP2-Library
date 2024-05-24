import express from "express";
import ClientModel from "../models/Client.js";

const routes = express.Router();

routes.get("/", (req, res) => {
    ClientModel.find()
        .then((client) => {
            return res.status(200).json(client);
        })
        .catch((err) => {
            return res.status(404).send("Client non trouvé");
        });
});

routes.get("/:idclient", (req, res) => {
    var id = req.params.idclient;
    ClientModel.find({ _id: id })
        .then((client) => {
            return res.status(200).json(client);
        })
        .catch((err) => {
            return res.status(404).send("Client non trouvé");
        });
});

routes.post("/add", (req, res) => {
    const { nom, prenom, email } = req.body;
    const client = { nom: nom, prenom: prenom, email: email };
    ClientModel.create(client)
        .then((client) => {
            return res.status(200).json(client);
        })
        .catch((err) => {
            return res.status(500).send("Erreur lors de l'ajout");
        });
});


routes.put("/update/:idclient", (req, res) => {
    const id = req.params.idclient;
    const { nom, prenom, email } = req.body;
    ClientModel.updateOne({ _id: id }, { $set: { nom: nom, prenom: prenom, email: email } })
        .then((client) => {
            return res.status(200).send(client);
        })
        .catch((err) => {
            return res.status(404).send("Client non trouvé");
        });
});

routes.delete("/delete/:idclient", (req, res) => {
    const id = req.params.idclient;
    ClientModel.deleteOne({ _id: id })
        .then((client) => {
            return res.status(200).send(client);
        })
        .catch((err) => {
            return res.status(404).send("Client non trouvé");
        });
});

export default routes;
