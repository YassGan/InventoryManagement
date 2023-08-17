const mongoose = require('mongoose');

const SocieteSchema = new mongoose.Schema({


  nomSociete:{
    type:String,
  },
  idPackage:{
    type:String,
  },
  nomPackage:{
    type:String,
  },
  dateInsertion_DB:{
    type:String,
  }
 
});

const Societe_Collection = mongoose.model('Societe_Collection', SocieteSchema);

module.exports = Societe_Collection;
