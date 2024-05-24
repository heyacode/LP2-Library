import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import Client from "./routes/client.js"

dotenv.config()

const port = 3001
const url = "mongodb://localhost:27017/dbclient"

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/client', Client);

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



