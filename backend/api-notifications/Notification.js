import nodemailer from 'nodemailer';
import amqp from 'amqplib';
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

app.use(express.json());
app.use(cors());
dotenv.config();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const app = express()
var connection, channel;

const listemails = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/clients");
    const clientsList = await res.data.clients;
    //recuperer les emails des clients
    const emails = [];
    for (let i = 0; i < clientsList.length; i++) {
      emails.push(clientsList[i].email);
      }
    }
//declaration des queues

const queueLivre = "Livre-Ajoutee";
const queueLivreSupprime = "Livre-Supprime";
const queueEmprunt = "Emprunt-Ajoutee";
const queueEmpruntRetourne = "Emprunt-Retourne";
const queueClient = "Client-Ajoute";
const queueClientModifie= "Client-Modifiee";
const queueClientSupprime = "Client-Supprimee";

//La creation d'un canal de transport de mail

const transporter = nodemailer.createTransport({
  host: process.env.my_host,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MY_USERNAME,
    pass: process.env.MY_PASSWORD,
  },
});

//La connection RabbitMQ

const connectRabbitMQ = async () => {
  const url = process.env.url_rabbit
  connection = await amqp.connect(url)
  channel = await connection.createChannel()
  channel.assertQueue(queueLivre)
  channel.assertQueue(queueLivreSupprime)
  channel.assertQueue(queueEmprunt)
  channel.assertQueue(queueEmpruntRetourne)
  channel.assertQueue(queueClient)
  channel.assertQueue(queueClientModifie)
  channel.assertQueue(queueClientSupprime)
  //consume 
  channel.consume(queueLivre, async (message) => {
    try {
      let Livre = JSON.parse(message.content.toString());
      let titre = Livre.Titre;
      const emails = await listemails();
      const limail = emails.map((m) => {
        var mailOptions = {
          from: process.env.MY_USERNAME,
          to: m,
          subject: "Un nouveau Livre Ajoutee: " + titre,
          text : text + message.content.toString()
        };
  
        return transporter.sendMail(mailOptions);
      });
  
      await Promise.all(limail);
    } catch (error) {
      console.log(error);

    }

  })
  channel.consume(queueLivreSupprime, async (message) => {
    try {
      let Livre = JSON.parse(message.content.toString());
      let titre = Livre.Titre;
      const emails = await listemails();
      const limail = emails.map((m) => {
        var mailOptions = {
          from: process.env.MY_USERNAME,
          to: m,
          subject: "Livre Supprimee: " + titre,
          text : text + message.content.toString()
        };
  
        return transporter.sendMail(mailOptions);
      });
  
      await Promise.all(limail);
    } catch (error) {
      console.log(error);
    }
  })

  channel.consume(queueEmprunt,async (message) => {
    let Emprunt = JSON.parse(message.content.toString());
    let client = Emprunt.id_client;
    let livre = Emprunt.code_livre;
    let dateretour = Emprunt.dateRetour || "Non retourne";

    //Recuperer les donnees de livre et client
    const [Livres,Clients] = await Promise.all([
      axios.get(`http://127.0.0.1:3000/api/${client}`),
      axios.get(`http://127.0.0.1:3002/api/${livre}`),
    ]);

    const livreData = Livres.data.livres;
    const clientData = Clients.data.clients;
    const emails = await listemails();
    const limail = emails.map((m) => {
        var mailOptions = {
          from: process.env.MY_USERNAME,
          to: m,
          subject: "Un nouveau Emprunt Ajoutee: " + titre,
          html: `
          <html>
            <body>
              <h3>Nouveau Emprunt ajoutee :</h3>
              <p>Titre: ${livreData.Titre}</p>
              <p>Description:</strong> ${livreData.Description}</p>
              <p>Author: ${livreData.Auteur}</p>
              <p>Client:${clientData.nom}</p>
            </body>
          </html>`,
        };
        return transporter.sendMail(mailOptions);
      });
        await Promise.all(limail);

  })

  channel.consume(queueEmpruntRetourne,async (message) => {
    let Emprunt = JSON.parse(message.content.toString());
    let client = Emprunt.id_client;
    let livre = Emprunt.code_livre;
    let dateretour = Emprunt.dateRetour || "Non retourne";
    let dateEmprunt = Emprunt.dateEmprunt;
    let listeclient = await axios.get("http://127.0.0.1:3000/api/" + client);
    let liclient = listeclient.data;
    let listeLivre = await axios.get("http://127.0.0.1:3002/api/" + livre);
    let lilivre = listeLivre.data;
    const emails = await listemails();
    const limail = emails.map((m) => {
        var mailOptions = {
          from: process.env.MY_USERNAME,
          to: m,
          subject: "Un nouveau Emprunt Ajoutee: " + titre,
          html: `
            <html>
              <body>
                <h2">Emprunt retournee le  ${dateretour} :</h2>
                <p>Title: ${lilivre.Titre}</p>
                <p>Client:${liclient.nom} ${liclient.prenom}</p>
                <p>Date emprunt: ${dateEmprunt}</p>
              </body>
            </html>`,
  };
  return transporter.sendMail(mailOptions);
      });
        await Promise.all(limail);
      })
      //Client Ajoutee

      channel.consume(queueClient,async (message) => {
        try {
          let client = JSON.parse(message.content.toString());
          let nomclient = client.nom;
          let prenomclient = client.prenom;
          let emailclient = client.email;
          const emails = await listemails();
          const  limail= emails.map((m) => {
            var mailOptions = {
              from: process.env.MY_USERNAM,
              to: m,
              subject: "Un nouveau client ajoutee: " + nomclient,
              html: `
                <html>
                  <body>
                    <h2">Un nouveau client ajoutee :</h2>
                    <p>Nom: ${nomclient}</p>
                    <p>Prenom: ${prenomclient}</p>
                    <p>Email: ${emailclient}</p>
                  </body>
                </html>`,
            };
      
            return transporter.sendMail(mailOptions);
          });
          await Promise.all(limail);
        } catch (error) {
          console.error(error);
        }
      });

      //Client Modifiee

      channel.consume(queueClientModifie,async (message) => {
        try {
          let client = JSON.parse(message.content.toString());
          let nomclient = client.nom;
          let prenomclient = client.prenom;
          let emailclient = client.email;
          const emails = await listemails();
          const  limail= emails.map((m) => {
            var mailOptions = {
              from: process.env.MY_USERNAM,
              to: m,
              subject: "Un client modifiee: " + nomclient,
              html: `
                <html>
                  <body>
                    <h2">Un client modifiee :</h2>
                    <p>Nom: ${nomclient}</p>
                    <p>Prenom: ${prenomclient}</p>
                    <p>Email: ${emailclient}</p>
                  </body>
                </html>`,
              };
                return transporter.sendMail(mailOptions);
              });
              await Promise.all(limail);
            } catch (error) {
              console.error(error);
            }
          });
          //Client Supprimee

          channel.consume(queueClientSupprime,async (message) => {
            try {
              let client = JSON.parse(message.content.toString());
              let nomclient = client.nom;
              let prenomclient = client.prenom;
              let emailclient = client.email;
              const emails = await listemails();
              const  limail= emails.map((m) => {
                var mailOptions = {
                  from: process.env.MY_USERNAM,
                  to: m,
                  subject: "Un client supprimee: " + nomclient,
                  html: `
                    <html>
                      <body>
                        <h2">Un client supprimee :</h2>
                        <p>Nom: ${nomclient}</p>
                        <p>Prenom: ${prenomclient}</p>
                        <p>Email: ${emailclient}</p>
                      </body>
                    </html>`,
                  };

                  return transporter.sendMail(mailOptions);
                });
                await Promise.all(limail);
              } catch (error) {
                console.error(error);
              }
            });
 }
          
          

      


  
