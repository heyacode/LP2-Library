import express from "express";
import mongoose from "mongoose";
import LivreRoute from "./routes/LivreRoute.js";

//
const app = express();
const PORT = process.env.PORT || 3002;

// Utilisation de body-parser pour traiter les requêtes JSON et URL-encoded
app.use(express.json());

// Utilisation des routes définies
app.use("/api/v1/livre/", LivreRoute);

//Connexion avec la base de donnees

mongoose.connect("mongodb://localhost:27017/dblivre").then(() => {
    console.log('Connected to Mongodb')
}).catch((err) => {
    console.log('Not Connected to Mongodb')
})

  app.listen(PORT, (err) => {
    if(err)
        console.log('Server not started')
    else 
        console.log('Server started')
})