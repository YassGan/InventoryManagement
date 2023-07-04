


var express = require('express');
var router = express.Router();
const InventoryOb = require('../models/InventoryWithObject');





// post request to create a new inventory element (with the mongoDB collection logic )
router.post('/addInventoryObject', async (req, res) => {
        try {
        const { DateInsertion_DB, NomInventaire, TabArticles,CreatedBy } = req.body;
    
        const inventoryOb = new InventoryOb({
            DateInsertion_DB,
            NomInventaire,
            TabArticles,
            CreatedBy
        });
    
        await inventoryOb.save();
    
        console.log('New inventory element added:', inventoryOb);
    
        res.status(201).json({ message: 'New inventory element added successfully' });
        } catch (error) {
        console.error('Error adding inventory element:', error);
        res.status(500).json({ error: 'Server error' });
        }
    });
// !!post request to create a new inventory element (with the mongoDB collection logic )




// get request that gets the specefic inventories that were created by the user from the databse 
router.get('/getInventories', async (req, res) => {
        try {
        const emailLoggedIn = req.headers.email; // Access the email value from the request headers

        console.log("The email logged in "+emailLoggedIn)
        const inventoryObj = await InventoryOb.find({ CreatedBy:emailLoggedIn  });
        res.json(inventoryObj);
        console.log('Inventory data retrieved from the database');
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
        console.log('Error while retrieving inventories:', error);
        }
    });
// !! get request that gets the specefic inventories that were created by the user from the databse 



module.exports = router;