const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');


const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

 


app.use(express.static(path.join(__dirname , 'front-Invent/dist')))



const authentRegis = require('./routes/authentRegis.js');
app.use('/api/authentRegis', authentRegis);


const Inventaires = require('./routes/Inventaires.js');
app.use('/api/Inventaires', Inventaires);

const CSVwork = require('./routes/CSVwork.js');
app.use('/api/CSVwork', CSVwork);



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+ '/front-Invent/dist/index.html'));
});





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
app.listen(8001, () => {
  console.log("Le serveur écoute sur le port 8001");
});
// !!Déclencheur du serveur backend
































//!! code that was created and it was changed or it reveals that it's no longer necessary
    // post request to add a new article to the database
      app.post('/CreateNewArticle', async (req, res) => {
        const {
          Article,
          Designation,
          Lot,
          DateFabrication,
          Date_Premption,
          Emplacements,
          Nom_Emplacement,
          Quantite1,
          Quantite2,
          Quantite3,
          IdInventaireAttaché,
          DateInsertion_DB
        } = req.body;
        try {
          const article = new ArticleEnt({
            Article,
            Designation,
            Lot,
            DateFabrication,
            Date_Premption,
            Emplacements,
            Nom_Emplacement,
            Quantite1,
            Quantite2,
            Quantite3,
            IdInventaireAttaché,
            DateInsertion_DB
          });
          await article.save();
          console.log('Data inserted successfully:', article);

          res.status(200).json({ message: 'Data inserted successfully' });
        } catch (error) {
          console.error('Error inserting data:', error);
          res.status(500).json({ error: 'Server error' });
        }
      });

    // post request to create a new inventory element (with the sql logic )
      app.post('/addInventory', async (req, res) => {
        const { DateInsertion_DB, NomInventaire,Id_Attachement_DB } = req.body;
        try {
          const Inventory = new InventoryEnt({ DateInsertion_DB, NomInventaire,Id_Attachement_DB });
          await Inventory.save();
          console.log('Inventory element  inserted successfully:', Inventory);

          res.status(200).json({ message: 'Inventory element  inserted successfully' });
        } catch (error) {
          console.error('Error inserting data:', error);
          res.status(500).json({ error: 'Server error' });
        }
      });
  // !!post request to create a new inventory element (with the sql logic )





