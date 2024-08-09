/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
const express = require('express');
const expressLayouts = require('express-layouts');
// eslint-disable-next-line prettier/prettier
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config({ path: './config.env' });
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(flash());
app.use((req, res, next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

app.use(expressLayouts);
app.set('view engine', 'ejs');
const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');


const db = process.env.DATABASE;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(err));
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
//Routes
app.use('/', indexRoutes);
app.use('/users', authRoutes);

module.exports = app;
