const mongoose = require('mongoose');


const recetteSchema = new mongoose.Schema({
  _id: { type: String, required: true},
  Titre: { type: String, required: true },
  Recette: { type: String, required: true }
});


const Recette = mongoose.model('Recette', recetteSchema, 'projetexpress'); 

module.exports = Recette;