const mongoose = require("mongoose");

const Article_Comptage_Schema = new mongoose.Schema({
  reference: {
    type: String,
  },
  designation: {
    type: String,
  },
  lot: {
    type: String,
  },
  dateFabrication: {
    type: String,
  },
  datePeremption: {
    type: String,
  },
  Emplacement: {
    type: String,
  },

  quantite1: {
    type: String,
  },
  createur1: {
    type: String,
  },
  quantite2: {
    type: String,
  },
  createur2: {
    type: String,
  },
  quantite3: {
    type: String,
  },
  createur3: {
    type: String,
  },
  statut: {
    type: String,
  },
  idSoc: {
    type: String,
  },
  lienArticleInventaire: {
     type: String
  },
  dateInsertion_DB: {
    type: String,
  },
});

const Article_Comptage_Collection = mongoose.model(
  "Article_Comptage_Collection",
  Article_Comptage_Schema
);
module.exports = Article_Comptage_Collection;
