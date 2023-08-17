var express = require('express');
var router = express.Router();
const Societe = require('../models/Societe_Model.js');



// Post request to create a new societe
router.post('/addSociete', async (req, res) => {
    try {
      const {
        nomSociete,
        idPackage,
        nomPackage,
        dateInsertion_DB
      } = req.body;
  
      const societe = new Societe({
        nomSociete,
        idPackage,
        nomPackage,
        dateInsertion_DB
       
      });
  
      await societe.save();

  
      console.log('New societe added:', societe);
  
      res.status(201).json({ message: 'New societe added successfully' });
    } catch (error) {
      console.error('Error adding societe:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });





    // GET all societes
router.get('/AllSocietes', async (req, res) => {
  try {
    const societes = await Societe.find();
    res.status(200).json(societes);
  } catch (error) {
    console.error('Error retrieving societes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




// API to find a societe
router.get('/getSociete/:ID', async (req, res) => {
  try {
    const ID = req.params.ID;

    const societe = await Societe.findOne({_id: ID });

    if (!societe) {
      return res.status(404).json({ error: 'societe not found' });
    }

    res.status(200).json(societe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



  module.exports = router;


