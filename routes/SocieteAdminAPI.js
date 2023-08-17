


var express = require('express');
var router = express.Router();
const SocieteAdmin = require('../models/SocieteAdmin_Model.js');
const jwt = require('jsonwebtoken');
var bcrypt   = require('bcrypt');

const uuid = require('uuid');
const nodemailer = require('nodemailer');

// Post request to create a new societe admin
router.post('/addSocieteAdmin', async (req, res) => {
    try {
      const {
        nomAdminSociete,
        email,
        passwordSocieteAdmin,
        role,
        idSociete,
        dateInsertion_DB

      } = req.body;
      const verificationToken = uuid.v4();

      const hashedPassword = await bcrypt.hash(passwordSocieteAdmin, 10);

      const societeAdmin = new SocieteAdmin({
        nomAdminSociete,
        email,
        passwordHashed:hashedPassword,
        passwordText:passwordSocieteAdmin,
        role,
        idSociete,
        verificationToken,
        dateInsertion_DB
       
      });
  
      await societeAdmin.save();
      // Send the verification email
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: 'yassinegana.yt@gmail.com',
          pass: 'vfbazajgmpfgydaz',
        },
        debug: true, 
      });
  
      const mailOptions = {
        from: 'yassinegana.yt@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Please click on the following link to verify your email: http://localhost:8000/api/SocieteAdminAPI/verify/${verificationToken}`,
      };
  
      console.log("Sending verification email...");
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending verification email:', error);
          return res.status(500).json({ error: 'Error sending verification email' });
        }
        console.log('Verification email sent:', info.response);
        res.status(200).json({ message: 'Verification email sent' });
      });
  
      console.log('New societeAdmin added:', societeAdmin);
  
      res.status(201).json({ message: 'New societeAdmin added successfully' });
    } catch (error) {
      console.error('Error during email sending:', error);
      console.error('Error adding societeAdmin:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });







// Route for verifying the email using the token
router.get('/verify/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const societeAdmin = await SocieteAdmin.findOne({ verificationToken: token });

    if (!societeAdmin) {
      return res.status(404).json({ error: 'Invalid verification token' });
    }

    societeAdmin.isVerified = true;
    societeAdmin.verificationToken = undefined;
    await societeAdmin.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.log('Error verifying email:', error);
    res.status(500).json({ error: 'Error verifying email' });
  }
});







// Admin Login API
router.post('/loginAdmin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }
    const societeAdmin = await SocieteAdmin.findOne({ email });
    if (!societeAdmin) {
      res.status(401).json({ error: 'Email is not found ' });
      return;
      
    }

       // Check if the user's email is verified
       if (!societeAdmin.isVerified) {
        res.status(401).json({ error: 'please verify your email ' });
        return;
      }


 
   const isPasswordValid = await bcrypt.compare(password, societeAdmin.passwordHashed);
   console.log("état isPasswordValid "+isPasswordValid)
   // const isPasswordValid =  bcrypt.compare(password, societeAdmin.passwordHashed);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid  password' });
      return;
    }
    const token = jwt.sign({ SocieteAdmin_Id: societeAdmin._id }, 'secret-key');
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// !!Login API



// API to find a user
router.get('/getAdmin/:email', async (req, res) => {
  try {
    const email = req.params.email;

    const societeAdmin = await SocieteAdmin.findOne({ email });

    if (!societeAdmin) {
      return res.status(404).json({ error: 'societeAdmin not found' });
    }

    res.status(200).json(societeAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






module.exports = router;
