const  mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSc = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide user name']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    role:{
        type:String,
        enum: ['user', 'superAdmin'],
        default: 'user'
    },
    password:{
        type:String,
        required:[true,'Please provide a password']
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function(el) {
            return el === this.password;
          },
          message: 'Passwords are not the same!'
        }
      },
});

userSc.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User',userSc);
module.exports =User;