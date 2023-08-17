
var express = require('express');
var router = express.Router();
const User = require('../models/Utilisateur_Model');
const jwt = require('jsonwebtoken');
var bcrypt   = require('bcrypt');



// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  jwt.verify(token, 'secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};
// !! Middleware to verify JWT token















router.post('/addUser', async (req, res) => {
  try {
    const { nom,role,email, password, societeId, dateInsertionId } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({nom:nom,role:role ,email:email, password: hashedPassword,passwordText:password, societeId, dateInsertionId });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal server error' });
  }
});





// Login API for users agents de comptage
router.post('/loginAction', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Email is not found ' });
      return;
    }


    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid  password' });
      return;
    }
    const token = jwt.sign({ userId: user._id }, 'secret-key');
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// !!Login API








// Login API for SuperAdmin
router.post('/loginActionSuperAdmin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }
    if (email !== 'superAdmin@gmail.com') {
      res.status(401).json({ error: 'Email is not found' });
      return;
    }
    
    const isPasswordValid = await bcrypt.compare(password, '$2b$10$.tcLQ3J9Xk7SyPMKAW34ZeVulIOEAzB2FA5CvfPuzaGl5a9ZztbDO');
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }
    
    const token = jwt.sign({ userId: email }, 'secret-key');
    res.status(200).json({ token, message: 'Good authentication' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// !!Login API







// API to find a user
router.get('/getUser/:email', async (req, res) => {
  try {
    const email = req.params.email;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// API to find users with a specific societeId
router.get('/getUsersBySocieteId/:societeId', async (req, res) => {
  try {
    const societeId = req.params.societeId;

    // Find all users with the specified societeId
    const users = await User.find({ societeId });

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found for the provided societeId' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API to get all users with a specific societeId
router.get('/getAllUsersBySocieteId/:societeId', async (req, res) => {
  try {
    const societeId = req.params.societeId;

    const users = await User.find({ societeId });

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found for the provided societeId' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// API to delete a user by email
router.delete('/deleteUser/:email', async (req, res) => {
  try {
    const email = req.params.email;

    // Find and delete the user by email
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ...



// API to update a user by email
router.put('/updateUser/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const { nom, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user information
    user.nom = nom || user.nom;
    user.password = password || user.password;
    

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});







module.exports = router;
