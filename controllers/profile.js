const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const axios = require('axios');

const SECRET_SESSION = process.env.SECRET_SESSION;



router.get('/profile', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get(); 
    res.render('profile', { id, name, email });
  });