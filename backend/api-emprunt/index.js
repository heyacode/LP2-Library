import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import Emprunt from "./routes/emprunt.js"

dotenv.config()

const port = 3003
const url = "mongodb://localhost:27017/dbemprunt"
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/emprunt/', Emprunt);

mongoose.connect(url).then(() => {
    console.log('Connecté à Mongo')
}).catch((err) => {
    console.log('Non connecté à Mongo')
})

app.listen(port, (err) => {
    if (err)
        console.log('Incapable de lancer le serveur sur ' + port)
    else
        console.log('Server lancé sur ' + port)
})



