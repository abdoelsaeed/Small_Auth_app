/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable node/no-missing-require */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, minlength: [8,'the minimum required name is 8 length'] ,required: [true, 'You must have a name'] },
  email:{type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    
    lowercase: true,
    validators : [validator.isEmail, 'Please validate your email']
},
password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength:[8,'the minimum required password is 8 length'] ,
    select: false
  },
  date:{type:Date,
    default:Date.now
  }
});
// eslint-disable-next-line prefer-arrow-callback
userSchema.pre('save', async function(next){
this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {

  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model('User',userSchema);
module.exports = User;
