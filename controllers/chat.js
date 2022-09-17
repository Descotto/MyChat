const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const axios = require('axios');

const SECRET_SESSION = process.env.SECRET_SESSION;
const apiKey = process.env.APIKEY




const updateCounter = ctx => {
  ctx.io.emit('count', Object.keys(ctx.io.sockets.sockets).length);
};

// Send the new message to everyone
const sendMessage = ctx => {
  ctx.io.emit('message', ctx.data);
};



router.get('/', isLoggedIn, (req, res) => {
 
    const { id, name, email } = req.user.get();
    db.message.findAll({order: [['createdAt', 'DESC']], limit:10, offset:0, include:[db.user]}).then((messages) => {
        res.render('chat', { id, name, email, messages});
    })
});





  router.post('/send', async (req, res) => {
    // we now have access to the user info (req.body);
    let content = req.body.chat; // goes and us access to whatever key/value inside of the object
    let id = req.user.id;
   db.message.create({
     content: content,
     userId: id
    }).then(() => {
    res.redirect('/chat');
   }).catch(err => {
    console.log(err);
   })
  
   
  })




module.exports = router;