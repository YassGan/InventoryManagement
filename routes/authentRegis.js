
var express = require('express');
var router = express.Router();
const User = require('../models/User');
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











// Sign Up API
router.post('/signup', async (req, res) => {
try {
  const { email, password } = req.body;

  // Check if user with the same email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
  console.error(error); // Log the error to the console for debugging
  res.status(500).json({ error: 'Internal server error' });
}
});
// !!Sign Up API




// Login API
router.post('/login', async (req, res) => {
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
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'secret-key');
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// !!Login API





// post request to create a new user using the front end 
router.post('/addNewUserFront', async (req, res) => {
  try {
    const { password, email } = req.body;

    const NewUser = new User({
      email,
      password
    });
    await NewUser.save();

    console.log('New User element added to the data base :', NewUser);

    res.status(201).json({ message: 'New User element added to the data base' });
  } catch (error) {
    console.error('Error adding User element:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// !! post request to create a new user using the front end 


module.exports = router;