
var express = require('express');
var router = express.Router();
const Table = require('../models/Table_Model.js');







router.post("/addEntry", async (req, res) => {
    try {
      const {
        email,
        currentPassword,
        passwordConfirmation,
        newPassword,
        dateInsertion_DB,
      } = req.body;
  
      const newEntry = new Table({
        email,
        currentPassword,
        passwordConfirmation,
        newPassword,
        dateInsertion_DB,
      });
  
      const savedEntry = await newEntry.save();
      res.status(201).json(savedEntry);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while saving the entry." });
    }
  });


  module.exports = router;