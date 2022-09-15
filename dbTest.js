const db = require('./models');

// Implement CRUD for user model

// CREATE
async function createUser() {
    try {
        const newUser = await db.user.create({
            name: "My Name",
            email: "myemail@gmail.com"
        });
        console.log('my new user >>>', newUser);
    } catch (error) {
        console.log('new user was not created b/c of >>>', error);
    }
    
}
// @todo run createUser function below

// READ
// find one user
async function findOneUser() {
    try {
        const user = await db.user.findOne({
            where: { id: 1 }
        });
        console.log('current user here >>>', user);  
    } catch (error) {
        console.log('did not find user b/c of >>>', error);
    }
}
// @todo run findOneUser function below

// find all users
async function findAllUsers() {
    try {
        const users = await db.user.findAll();
        console.log('all users here >>>', users);  
    } catch (error) {
        console.log('did not find all users because of >>>', error);
    }
}
// @todo run findAllUsers function below

// find one user
async function findOrCreate() {
    try {
        const users = await db.user.findOrCreate({
            where: { email: 'brainsmith@gmail.com' },
            defaults: {
                name: 'Brian Smith',
            },
        });
        console.log('all users here >>>', users);  
    } catch (error) {
        console.log('did not find all users because of >>>', error);
    }
}
// @todo run findOrCreate function below

// UPDATE
async function updateUser() {
    try {
        const numRowsUpdated = await db.user.update({
            name: 'Brain Taco'
        }, {
            where: {
                email: 'brainsmith@gmail.com'
            }
        });
        console.log('number of users updated', numRowsUpdated);
    } catch (error) {
        console.log('did not update user(s) because of >>>', error);
    }
}
// @todo run updateUser function below

// DELETE
async function deleteUser() {
    try {
        let numOfRowsDeleted = await db.user.destroy({
            where: { email: 'brainsmith@gmail.com' }
        });
        console.log('number of rows deleted >>>', numOfRowsDeleted);
    } catch (error) {
        console.log('did not delete user(s) because of >>>', error);
    }
}
// @todo run deleteUser function below





////==== chat tests



//   const socket = io();
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
