const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({

    Article: {
    type: String,
    required: true,
  },
  Designation: {
    type: String,
    required: true,
  },
  Lot: {
    type: Number,
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

});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
