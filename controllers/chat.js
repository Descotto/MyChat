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


router.get('/', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get(); 
    res.render('chat', { id, name, email });
  });




// var socket = io();

// // The user count. Can change when someone joins/leaves
// socket.on('count', function (data) {
//   $('.user-count').html(data);
// });

// // When we receive a message
// // it will be like { user: 'username', message: 'text' }
// socket.on('message', function (data) {
//   $('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');
// });

// // When the form is submitted
// $('form').submit(function (e) {
//   // Avoid submitting it through HTTP
//   e.preventDefault();

//   // Retrieve the message from the user
//   var message = $(e.target).find('input').val();

//   // Send the message to the server
//   socket.emit('message', {
//     user: cookie.get('user') || 'Anonymous',
//     message: message
//   });

//   // Clear the input and focus it for a new message
//   e.target.reset();
//   $(e.target).find('input').focus();
// });


module.exports = router;