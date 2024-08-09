/* eslint-disable prettier/prettier */
const express = require('express');
const viewControllers = require("../controller/viewsController");
const authController = require("../controller/authController");

const router = express.Router();
router.get('/',viewControllers.welcome );
router.get('/dashboard',authController.isLoggedIn ,viewControllers.dashboard)
module.exports = router;
