
const express = require('express');
const router = express.Router();
const Inventaires_Immobiliers = require('../models/Inventaires_Immobliers_Model'); 




// POST request to create a new inventory
router.post('/addInventaire_Immobilier', async (req, res) => {
    try {
      const {
        DateInsertion_DB,
        nomInventaire,
        lienArticleInventaire,
        statut,
        codification,
        idSoc,
      } = req.body;
  
      const newInventoryImmobilier = new Inventaires_Immobiliers({
        DateInsertion_DB,
        nomInventaire,
        statut,
        codification,
        lienArticleInventaire,
        idSoc,
      });
  
      const savedInventoryImmobilier = await newInventoryImmobilier.save();
  
      res.status(201).json(savedInventoryImmobilier);
    } catch (error) {
      console.error('Error creating savedInventoryImmobilier:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });




// GET request to retrieve non-archived immobiliers inventories based on idSoc
router.get('/getAllInventaires_Immobiliers_archives/:idSociete', async (req, res) => {
  try {
    const { idSociete } = req.params;

    // Find all inventories with the specified idSoc and statut as "nonArchivé"
    const inventairesImmobiliers = await Inventaires_Immobiliers.find({
      idSoc: idSociete,
      statut: 'inventaireArchivé',
    });

    res.status(200).json(inventairesImmobiliers);
  } catch (error) {
    console.error('Error retrieving inventairesImmobiliers:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET request to retrieve non-archived immobiliers inventories based on idSoc
router.get('/getAllInventaires_Immobiliers_non_verifie/:idSociete', async (req, res) => {
  try {
    const { idSociete } = req.params;

    // Find all inventories with the specified idSoc and statut as "nonArchivé"
    const inventairesImmobiliers = await Inventaires_Immobiliers.find({
      idSoc: idSociete,
      statut: 'nonArchivé',
    });

    res.status(200).json(inventairesImmobiliers);
  } catch (error) {
    console.error('Error retrieving inventairesImmobiliers:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




  
// GET request to get specefic inventory 
router.get('/getSpeceficInventoryImmobilier/:idlienArticleInvent', async (req, res) => {
  try {
    const { idlienArticleInvent } = req.params;

    const inventairesImmobiliers = await Inventaires_Immobiliers.find({
      lienArticleInventaire: idlienArticleInvent,
    });

    res.status(200).json(inventairesImmobiliers);
  } catch (error) {
    console.error('Error retrieving inventairesImmobiliers:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// PUT request to update the 'statut' variable of an inventory immobilier by lienArticleInventaire
router.put('/updateInventoryImmobilierStatut/:lienArticleInventaire', async (req, res) => {
  try {
    const { lienArticleInventaire } = req.params;

    // Find the inventory by lienArticleInventaire and update the 'statut' variable
    const updatedInventory = await Inventaires_Immobiliers.findOneAndUpdate(
      { lienArticleInventaire },
      { $set: { statut: 'inventaireArchivé' } },
      { new: true }
    );

    if (!updatedInventory) {
      return res.status(404).json({ error: 'Inventaires_Immobiliers not found' });
    }

    res.status(200).json(updatedInventory);
  } catch (error) {
    console.error('Error updating Inventaires_Immobiliers:', error);
    res.status(500).json({ error: 'Server error' });
  }
});





module.exports = router;
