const mongoose = require('mongoose');

const InventoryWithObjectSchema = new mongoose.Schema({
  DateInsertion_DB: {
    type: String,
    required: true,
  },
  NomInventaire: {
    type: String,
    required: true,
  },
  TabArticles: [
    {
      Article: {
        type: String,
        required: true,
      },
      Designation: {
        type: String,
        required: true,
      },
      Lot: {
        type: String,
        required: true,
      },
      DateFabrication: {
        type: String,
        required: true,
      },
      Date_Premption: {
        type: String,
        required: true,
      },
      Emplacements: {
        type: String,
        required: true,
      },
      Nom_Emplacement:{ 
        type: String,
        required: true,
    },
    Quantite1:{ 
        type: Number,
        required: true,
    },
    Quantite2:{ 
        type: Number,
        required: true,
    },
    Quantite3:{ 
        type: Number,
        required: true,
    },
    IdInventaireAttaché:{ 
        type: String,
        required: false,
    },
    DateInsertion_DB:{ 
        type: Date,
        required: false,
    }
    }
  ],CreatedBy:{
    type: String,
    required: false,
  }

 
});

const Inventoryobject = mongoose.model('Inventory_with_object_', InventoryWithObjectSchema);

module.exports = Inventoryobject;
