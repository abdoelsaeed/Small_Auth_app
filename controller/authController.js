/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
/* eslint-disable no-const-assign */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');

exports.signup = async (req, res, next) => {
try{
  if (req.body.password !== req.body.password2) {
      throw new Error('Passwords do not match with Confirm Password');
    }
    
    // إذا وصلت الكلمات المرور هنا، يعني أنها متطابقة، لذا يتم إنشاء المستخدم
    await User.create(req.body);
    req.flash('success_msg','You are now registered and can login');
    res.redirect('/users/login');
}catch(err){
  let error= err.message.split(',').slice(1);
  if(error.length===0){ 
  error=[err];
}
  res.status(500).render('register',{
    title: 'Register',
    error,
    
})}
};
exports.login = async (req, res) => {
  try{
  const {email, password} = req.body;
  if(!email||!password) {
    throw new Error('please provide email and password!');
  }
  const user = await User.findOne({email}).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
        throw new Error('Incorrect email or password');
  }
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN
});
  const cookieOption = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: true, //يعني هيشتغل علي الhttps بس
    httpOnly: true //ان مينفعش اي حد يعدل عليه هو بييجي مع الريكوست
  };

  res.cookie('jwt', token, cookieOption);
  
    res.redirect('/dashboard');
}
  catch(err){
    console.log(err);
    res.json(err);
  }
};
exports.logout = async(req, res, next)=>{
  res.clearCookie('jwt');
  res.redirect('/');
};

exports.isLoggedIn = async (req, res, next) => {
  if(req.cookies.jwt){
  try{
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
      throw new Error('You are not logged in')
    }
    console.log(currentUser);
    res.locals.user = currentUser;
    return next();
  }
  
  catch(err){
    req.flash('error_msg','please login first and go to dashboard');
    res.redirect(`users/login`);
  }
}
 req.flash('error_msg','please login first and go to dashboard');
 res.redirect(`users/login`);
  next();
};
