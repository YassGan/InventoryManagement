


var express = require('express');
var router = express.Router();




// csv Work
const csv = require('csv-parser');
const fs = require('fs');
  // post request to import a CSV file 
  router.post('/importCSV', async (req, res) => {
      try {
        const file = req.body.file; 

        const results = [];
        fs.createReadStream(file)
          .pipe(csv({ separator: ';' }))
          .on('data', (data) => {
            const { id, Article, Designation, Lot, DateFabrication, Date_Premption, Emplacements, Nom_Emplacement } = data;
            results.push({
              id,
              Article,
              Designation,
              Lot,
              DateFabrication,
              Date_Premption,
              Emplacements,
              Nom_Emplacement
            });
          })
          .on('end', () => {
            console.log('Lecture du fichier CSV terminée');
            res.json(results); // Envoyer les données dans la réponse JSON
          })
          .on('error', (error) => {
            console.error('Erreur lors de la lecture du fichier CSV:', error);
            res.status(500).json({ error: 'Erreur du serveur', errorMessage: error.message });
          });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur du serveur' });
      }
    });


  // !!post request to import a CSV file 
// !!csv work


module.exports = router;