const express = require('express');
const app = express();
const swaggerUIPath = require("swagger-ui-express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const PORT = process.env.PORT || 3000;


const swaggerjsonFilePath = require("./swagger.json");
const mongoose = require('mongoose');
const Recette = require('./models/recette'); 


// Middleware pour parser le JSON
app.use(express.json());


// Connexion à MongoDB
mongoose.connect('mongodb+srv://personnetheo:Lionceaux999@cluster0.rgpyp.mongodb.net/mydatabase?retryWrites=true&w=majority')
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.log('❌ Erreur de connexion MongoDB:', err));

  // Route pour récupérer tous les utilisateurs
app.use("/api-docs", swaggerUIPath.serve, swaggerUIPath.setup(swaggerjsonFilePath));
app.get('/getRecette', async (req, res) => {
    try {
      const recettes = await Recette.find(); // Récupérer toutes les recettes
      res.json(recettes); 
    } catch (error) {
      res.status(500).json({ error: error.message }); // En cas d'erreur, envoyer un message d'erreur
    }
  });

// app.post("/postRecette", async (req, res) => {
//     try{

//     } ca
// })
// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});

// Connexion à MongoDB Atlas
const uri = "mongodb+srv://personnetheo:Lionceaux999@cluster0.rgpyp.mongodb.net/?retryWrites=true&w=majority";


// Créer un client MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Fonction de connexion MongoDB
async function run() {
  try {
    // Connexion au serveur MongoDB
    await client.connect();
    // Envoie un ping pour vérifier la connexion
    await client.db("admin").command({ ping: 1 });
    console.log("Pingé votre déploiement. Vous êtes connecté à MongoDB !");
  } catch (error) {
    console.error("Erreur de connexion MongoDB :", error);
  } finally {
  }
}

// Lancer la connexion MongoDB
run().catch(console.dir);

