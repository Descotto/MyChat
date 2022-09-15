const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');


const updateCounter = ctx => {
  ctx.io.emit('count', Object.keys(ctx.io.sockets.sockets).length);
};

// Send the new message to everyone
const sendMessage = ctx => {
  ctx.io.emit('message', ctx.data);
};

let messages = db.message.content;

router.get('/', isLoggedIn, (req, res) => {
 
    const { id, name, email } = req.user.get(); 
    res.render('chat', { id, name, email, messages});
  });
  


module.exports = router;