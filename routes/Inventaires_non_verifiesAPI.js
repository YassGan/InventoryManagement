const express = require('express');
const router = express.Router();
const Inventaires_non_verifie = require('../models/Inventaires_non_verifies_Model'); 


// POST request to create a new inventory
router.post('/addInventaire_non_verifie', async (req, res) => {
    try {
      const {
        DateInsertion_DB,
        nomInventaire,
        lienArticleInventaire,
        statut,
        idSoc,
      } = req.body;
  
      const newInventory = new Inventaires_non_verifie({
        DateInsertion_DB,
        nomInventaire,
        statut,

        lienArticleInventaire,
        idSoc,
      });
  
      const savedInventory = await newInventory.save();
  
      res.status(201).json(savedInventory);
    } catch (error) {
      console.error('Error creating inventory:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });








  






  
// GET request to retrieve non-archived inventories based on idSoc
router.get('/getAllInventaires_archives/:idSociete', async (req, res) => {
  try {
    const { idSociete } = req.params;

    // Find all inventories with the specified idSoc and statut as "nonArchivé"
    const inventaires = await Inventaires_non_verifie.find({
      idSoc: idSociete,
      statut: 'inventaireArchivé',
    });

    res.status(200).json(inventaires);
  } catch (error) {
    console.error('Error retrieving inventories:', error);
    res.status(500).json({ error: 'Server error' });
  }
});






  
  
// GET request to retrieve non-archived inventories based on idSoc
router.get('/getAllInventaires_non_verifie/:idSociete', async (req, res) => {
  try {
    const { idSociete } = req.params;

    // Find all inventories with the specified idSoc and statut as "nonArchivé"
    const inventaires = await Inventaires_non_verifie.find({
      idSoc: idSociete,
      statut: 'nonArchivé',
    });

    res.status(200).json(inventaires);
  } catch (error) {
    console.error('Error retrieving inventories:', error);
    res.status(500).json({ error: 'Server error' });
  }
});









  
// GET request to get specefic inventory 
router.get('/getSpeceficInventory/:idlienArticleInvent', async (req, res) => {
  try {
    const { idlienArticleInvent } = req.params;

    const inventaires = await Inventaires_non_verifie.find({
      lienArticleInventaire: idlienArticleInvent,
    });

    res.status(200).json(inventaires);
  } catch (error) {
    console.error('Error retrieving inventories:', error);
    res.status(500).json({ error: 'Server error' });
  }
});















// PUT request to update the 'statut' variable of an inventory by lienArticleInventaire
router.put('/updateInventoryStatut/:lienArticleInventaire', async (req, res) => {
  try {
    const { lienArticleInventaire } = req.params;

    // Find the inventory by lienArticleInventaire and update the 'statut' variable
    const updatedInventory = await Inventaires_non_verifie.findOneAndUpdate(
      { lienArticleInventaire },
      { $set: { statut: 'inventaireArchivé' } },
      { new: true }
    );

    if (!updatedInventory) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    res.status(200).json(updatedInventory);
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ error: 'Server error' });
  }
});








module.exports = router;
