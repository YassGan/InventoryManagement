const mongoose = require('mongoose');

const UtilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true
  },
  passwordText:{
    type:String,
    required:true
  },

  societeId:{
    type:String,
  }
  ,
  dateInsertionId:{
    type:String,
  }
 
});

const Utilisateur_Collection = mongoose.model('Utilisateur_Collection', UtilisateurSchema);

module.exports = Utilisateur_Collection;
