const mongoose = require("mongoose");

const Inventaires_non_verifies_Schema = new mongoose.Schema({
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
    lienArticleInventaire: {
      type: String
   },

})

const Inventaires_non_verifies_Collection = mongoose.model("Inventaires_non_verifies_Collection",
Inventaires_non_verifies_Schema
);
module.exports = Inventaires_non_verifies_Collection;
