const mongoose = require("mongoose");

const Article_Immobiliers_Comptage_Schema = new mongoose.Schema({
 
 dateAchat:{
    type: String,
 },
 periodeAmortissement:{
    type: String,
 },
 
 prixAchat:{
    type: String,
 },
 codeCompta:{
    type: String,
 },
 
reference: {
    type: String,
  },
  designation: {
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
  codification: {
    type: String,
  },
  lienArticleInventaire: {
     type: String
  },
  dateInsertion_DB: {
    type: String,
  },
});

const Article_Immobiliers_Comptage_Collection = mongoose.model(
  "Article_Immobiliers_Comptage_Collection",
  Article_Immobiliers_Comptage_Schema
);
module.exports = Article_Immobiliers_Comptage_Collection;
