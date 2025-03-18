const express = require('express');
const app = express();
const swaggerUIPath = require("swagger-ui-express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const PORT = process.env.PORT || 3000;


const swaggerjsonFilePath = require("./swagger.json");
const mongoose = require('mongoose');
// const Recette = require('./models/recette');
app.use(express.json());



mongoose.connect('mongodb+srv://personnetheo:Lionceaux999@cluster0.rgpyp.mongodb.net/projetexpress?retryWrites=true&w=majority')
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.log('❌ Erreur de connexion MongoDB:', err));

const recetteSchema = new mongoose.Schema({

  Titre: { type: String, required: true },
  Recette: { type: String, required: true }

});
console.log(recetteSchema);
const Recette = mongoose.model('recette', recetteSchema, 'recette');

const livreSchema = new mongoose.Schema({
  
  Titre: { type: String, required: true },
  Description: { type: String, required: true }
  
});
const Livre = mongoose.model('livre', livreSchema, 'livre');
console.log(recetteSchema);

app.use("/api-docs", swaggerUIPath.serve, swaggerUIPath.setup(swaggerjsonFilePath));
app.get('/getRecette', async (req, res) => {
    try {
      const recettes = await Recette.find();
      console.log(recettes);
      res.json(recettes);
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  });


app.post('/postRecette', async (req, res) => {
  try {
    const nouvelleRecette = new Recette({
      Titre: req.body.Titre,
      Recette: req.body.Recette
    });
    await nouvelleRecette.save();
    res.status(201).json({ message: "Recette ajoutée avec succès", recette: nouvelleRecette });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put('/putRecette/:id', async (req, res) => {
  try {
    const recetteModifiee = await Recette.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recetteModifiee) return res.status(404).json({ message: "Recette non trouvée" });
    res.json({ message: "Recette mise à jour", recette: recetteModifiee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/deleteRecette/:id', async (req, res) => {
  try {
    const recetteSupprimee = await Recette.findByIdAndDelete(req.params.id);
    if (!recetteSupprimee) return res.status(404).json({ message: "Recette non trouvée" });
    res.json({ message: "Recette supprimée", recette: recetteSupprimee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/getLivre', async (req, res) => {
  try {
    const livres = await Livre.find();
    console.log(livres);
    res.json(livres);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});


app.post('/postLivre', async (req, res) => {
try {
  const nouvelleLivre = new Livre({
    Titre: req.body.Titre,
    Description: req.body.Description
  });
  await nouvelleLivre.save();
  res.status(201).json({ message: "Livre ajouté avec succès", livre: nouvelleLivre });
  
} catch (error) {
  res.status(500).json({ error: error.message });
}
});


app.put('/putLivre/:id', async (req, res) => {
try {
  const livreModifiee = await Livre.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!livreModifiee) return res.status(404).json({ message: "Recette non trouvée" });
  res.json({ message: "Recette mise à jour", livre: livreModifiee });
} catch (error) {
  res.status(500).json({ error: error.message });
}
});


app.delete('/deleteLivre/:id', async (req, res) => {
try {
  const livreSupprimee = await Livre.findByIdAndDelete(req.params.id);
  if (!livreSupprimee) return res.status(404).json({ message: "Livre non trouvée" });
  res.json({ message: "Recette supprimée", livre: livreSupprimee });
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});

// Connexion à MongoDB Atlas
const uri = "mongodb+srv://personnetheo:Lionceaux999@cluster0.rgpyp.mongodb.net/projetexpress?retryWrites=true&w=majority";

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

