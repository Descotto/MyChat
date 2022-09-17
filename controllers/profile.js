const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const axios = require('axios');
const { where } = require('sequelize');

const SECRET_SESSION = process.env.SECRET_SESSION;



router.get('/', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get(); 
    db.blog.findAll({ 
        where: {
        userId: req.user.id
    }}).then((blog) => {
        res.render('profile', { id, name, email, blog}); 
    })
  });



router.post('/blog', async (req, res) => {
    let content = req.body.blog;
    let id = req.user.id;
    db.blog.create({
        content: content,
        userId: id
       }).then(() => {
       res.redirect('/profile');
      }).catch(err => {
       console.log(err);
      })
     });

module.exports = router;