const express = require('express');
const router = express.Router();
const Inventaire = require('../models/Inventaires_Archives_Model'); 

// POST request to create a new inventory
router.post('/addInventaireArchive', async (req, res) => {
  try {
    const {
      DateInsertion_DB,
      nomInventaire,
      statut,
      idSoc,
      TabArticles
    } = req.body;

    const newInventory = new Inventaire({
      DateInsertion_DB,
      nomInventaire,
      statutInventaire,
      idSoc,
      TabArticles
    });

    const savedInventory = await newInventory.save();

    res.status(201).json(savedInventory);
  } catch (error) {
    console.error('Error creating inventory:', error);
    res.status(500).json({ error: 'Server error' });
  }
});







// get request that gets the specefic inventories that were created by the logged in user from the databse 
router.get('/getInventaires/:email', async (req, res) => {
    try {
    const emailLoggedIn = req.params.email; 

    console.log("The email logged in "+emailLoggedIn)
    const InventaireRecherché = await Inventaire.find({ CreatedBy:emailLoggedIn  });
    res.json(InventaireRecherché);
    console.log('Inventory data retrieved from the database');
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
    console.log('Error while retrieving inventories:', error);
    }
});
// !! get request that gets the specefic inventories that were created by the user from the databse 



// get request that gets the clicked inventaire
router.get('/getInventaireById/:InvId', async (req, res) => {
  try {

    const inventoryId = req.params.InvId;
    const clickedInventaire = await Inventaire.findOne({ _id: inventoryId });
    res.json(clickedInventaire);
    console.log('Inventory data retrieved from the database');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
    console.log('Error while retrieving inventory:', error);
  }
});
// !!get request that gets the clicked inventaire







module.exports = router;
