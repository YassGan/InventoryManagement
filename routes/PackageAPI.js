var express = require('express');
var router = express.Router();
const Package = require('../models/Package_Model.js');






// Post request to create a new package
router.post('/addPackage', async (req, res) => {
    try {
      const {
        nomPackage,
        prixPackage,
        maxInventaires,
        maxUsers,
        maxArticles,
        description,
        dateInsertion_DB
      } = req.body;
  
      const packageInv = new Package({
        nomPackage,
        prixPackage,
        maxInventaires,
        maxUsers,
        maxArticles,
        description,

        dateInsertion_DB
       
      });
  
      await packageInv.save();
  
      console.log('New package added:', packageInv);
  
      res.status(201).json({ message: 'New package added successfully' });
    } catch (error) {
      console.error('Error adding societe:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });




      // GET all packages
router.get('/AllPackages', async (req, res) => {
    try {
      const packages = await Package.find();
      res.status(200).json(packages);
    } catch (error) {
      console.error('Error retrieving packages:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });







  // API to find a package with a specefic id 
router.get('/getPackage/:ID', async (req, res) => {
  try {
    const ID = req.params.ID;

    const packageS = await Package.findOne({_id: ID });

    if (!packageS) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.status(200).json(packageS);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});














module.exports = router;

