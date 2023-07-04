const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  DateInsertion_DB: {
    type: String,
    required: true,
  },
  NomInventaire: {
    type: String,
    required: true,
  },
  Id_Attachement_DB:{
    type:String,
    required:true
  }
 
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
