const mongoose = require("mongoose");

const Table_Schema = new mongoose.Schema({
  email: {
    type: String,
  },
  currentPassword: {
    type: String,
  },
  passwordConfirmation:{
    type: String,

  },
  newPassword: {
    type: String,
  },

  dateInsertion_DB: {
    type: String,
  },
});

const Table_Collection = mongoose.model(
  "Table_Collection",
  Table_Schema
);
module.exports = Table_Collection;
