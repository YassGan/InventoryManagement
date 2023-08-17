const mongoose = require("mongoose");

const Inventaires_Immobiliers_Schema = new mongoose.Schema({
    DateInsertion_DB: {
      type: String,
    },
  
    nomInventaire: {
      type: String,
    },
  
    idSoc:{
      type:String,
    },
    statut:{
      type:String,

    },
    codification: {
      type: String,
    },
    lienArticleInventaire: {
      type: String
   },

})

const Inventaires_Immobiliers_Collection = mongoose.model("Inventaires_Immobiliers_Collection",
Inventaires_Immobiliers_Schema
);
module.exports = Inventaires_Immobiliers_Collection;
