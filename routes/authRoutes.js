/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
const express = require('express');
const viewControllers = require("../controller/viewsController");
const authController = require("./../controller/authController");
const router = express.Router();
router.get('/login', viewControllers.login);
router.get('/register',viewControllers.register);
router.post('/register',authController.signup);
router.post('/login',authController.login);
router.get('/logout',authController.logout);
module.exports = router;
