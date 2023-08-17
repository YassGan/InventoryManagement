const mongoose = require("mongoose");

const SocieteAdminSchema = new mongoose.Schema({
  nomAdminSociete: {
    type: String,
  },
  email: {
    type: String,
  },
  passwordHashed: {
    type: String,
  },
  passwordText: {
    type: String,
  },
  role: {
    type: String,
  },
  idSociete: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
  },

  dateInsertion_DB: {
    type: String,
  },
});

const SocieteAdmin_Collection = mongoose.model(
  "SocieteAdmin_Collection",
  SocieteAdminSchema
);

module.exports = SocieteAdmin_Collection;
