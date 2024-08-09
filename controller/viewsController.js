/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
exports.welcome = (req, res) => {res.render('welcome')}
exports.login = (req, res) => {res.render('login');}
exports.register = (req, res) => {res.render('register')};
exports.dashboard = (req, res) => {
    res.render('dashboard');
};