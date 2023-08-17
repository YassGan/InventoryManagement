const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');


const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


const NewCSV_Work = require('./routes/NewCSV_Work.js');
app.use('/api/NewCSV_Work', NewCSV_Work);


const ArticlesAPI = require('./routes/ArticlesAPI.js');
app.use('/api/ArticlesAPI', ArticlesAPI);

const UtilisateursAPI = require('./routes/UtilisateursAPI.js');
app.use('/api/UtilisateursAPI', UtilisateursAPI);

const Inventaires_ArchivesAPI = require('./routes/Inventaires_ArchivesAPI.js');
app.use('/api/Inventaires_ArchivesAPI', Inventaires_ArchivesAPI);

const Inventaires_non_verifiesAPI = require('./routes/Inventaires_non_verifiesAPI.js');
app.use('/api/Inventaires_non_verifiesAPI', Inventaires_non_verifiesAPI);

const SocietesAPI = require('./routes/SocietesAPI.js');
app.use('/api/SocietesAPI', SocietesAPI);

const PackageAPI = require('./routes/PackageAPI.js');
app.use('/api/PackageAPI', PackageAPI);

const SocieteAdminAPI = require('./routes/SocieteAdminAPI.js');
app.use('/api/SocieteAdminAPI', SocieteAdminAPI);

const Societe_et_AdminAPI = require('./routes/Societe_et_AdminAPI.js');
app.use('/api/Societe_et_AdminAPI', Societe_et_AdminAPI);

const ArticlesImmobiliersAPI = require('./routes/ArticlesImmobiliersAPI.js');
app.use('/api/ArticlesImmobiliersAPI', ArticlesImmobiliersAPI);


const InventairesImmobiliersAPI = require('./routes/InventairesImmobiliersAPI.js');
app.use('/api/InventairesImmobiliersAPI', InventairesImmobiliersAPI);




// Connexion à MongoDB 
  const mongoose = require('mongoose');
  mongoose
    .connect("mongodb+srv://yassineganayt:yassineganayt@cluster0.elldbwh.mongodb.net/InventaireDB?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB Connecté ');
    })
    .catch((error) => {
      console.error('Erreur de connexion à MongoDB en local :', error);
    });
// !!Connexion à MongoDB 




// Déclencheur du serveur backend
const PORT=8000
app.listen(PORT, () => {
  console.log("Le serveur écoute sur le port "+PORT);
});
// !!Déclencheur du serveur backend

