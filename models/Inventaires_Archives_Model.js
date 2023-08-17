const mongoose = require("mongoose");

const Inventaires_Archives_Schema = new mongoose.Schema({
  DateInsertion_DB: {
    type: String,
  },

  nomInventaire: {
    type: String,
  },

  statut: {
    type: String,
  },
  idSoc:{
    type:String,
  },

  TabArticles: [
    {
      Article: {
        type: String,
      },
      Designation: {
        type: String,
      },
      Lot: {
        type: String,
      },
      DateFabrication: {
        type: String,
      },
      Date_Premption: {
        type: String,
      },
      Emplacements: {
        type: String,
      },

      Quantite1: {
        type: String,
      },
      Createur1: {
        type: String,
      },
      Quantite2: {
        type: String,
      },
      Createur2: {
        type: String,
      },
      Quantite3: {
        type: String,
      },
      Createur3: {
        type: String,
      },
      statut: {
        type: String,
      },
      idSoc: {
        type: String,
      },
      dateInsertion_DB: {
        type: String,
      },
    },
  ],
});

const Inventaires_Archives_Collection = mongoose.model("Inventaires_Archives_Collection",
  Inventaires_Archives_Schema
);
module.exports = Inventaires_Archives_Collection;
