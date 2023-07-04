const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true
  }
 
});

const User = mongoose.model('UserLog', UserSchema);

module.exports = User;
