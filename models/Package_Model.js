const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({


  nomPackage:{
    type:String,
  },

  prixPackage:{
    type:String,
  },

  maxInventaires:{
    type:String,
  },

  maxUsers:{
    type:String,
  },

  maxArticles:{
    type:String,
  },
  description:{
    type:String,

  },

  dateInsertion_DB:{
    type:String,
  }
 
});

const Package_Collection = mongoose.model('Package_Collection', PackageSchema);

module.exports = Package_Collection;
