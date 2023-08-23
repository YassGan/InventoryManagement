

var express = require('express');
var router = express.Router();
const Societe = require('../models/Societe_Model.js');
const SocieteAdmin = require('../models/SocieteAdmin_Model.js');
const User =require('../models/Utilisateur_Model.js');

const jwt = require('jsonwebtoken');
var bcrypt   = require('bcrypt');


const uuid = require('uuid');
const nodemailer = require('nodemailer');

router.post('/add_Societe_et_Admin', async (req, res) => {
  try {
    const {
      nomSociete,
      idPackage,
      nomPackage,
      nomAdminSociete,
      email,
      passwordSocieteAdmin,
      role,
      dateInsertion_DB
    } = req.body;

    // Check if a societe with the given name already exists
    const existingSociete = await Societe.findOne({ nomSociete });
    if (existingSociete) {
      return res.status(400).json({ error: 'Societe with the given name already exists' });
    }

    // Check if an admin with the given email already exists
    const existingAdmin = await SocieteAdmin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "L'email introduit est déjà existant " });
    }

    const societe = new Societe({
      nomSociete,
      idPackage,
      nomPackage,
      dateInsertion_DB
    });

    await societe.save();

    const verificationToken = uuid.v4();
    const hashedPassword = await bcrypt.hash(passwordSocieteAdmin, 10);

    const societeAdmin = new SocieteAdmin({
      nomAdminSociete,
      email,
      passwordHashed: hashedPassword,
      passwordText: passwordSocieteAdmin,
      role: 'admin_' + role,
      idSociete: societe._id,
      verificationToken,
      dateInsertion_DB
    });

    let emailUser = "test_User_" + email;

    const user = new User({ nom: 'tes_user_' + email, role: role, email: emailUser, password: emailUser, passwordText: emailUser, societeId: societe._id, dateInsertionId: dateInsertion_DB });
    await user.save();

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

    console.log('New societe and admin added on the same time successfully:', societe);
    res.status(201).json({ message: 'New societe and admin added on the same time successfully' });
  } catch (error) {
    console.error('Error adding societe and admin on the same time:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;
