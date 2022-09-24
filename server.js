require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');
const db = require('./models');
const path = require('path');


const SECRET_SESSION = process.env.SECRET_SESSION;
const apiKey = process.env.APIKEY
console.log('works ', SECRET_SESSION);







app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname , '/public')));
app.use(layouts);


app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

app.use(flash());            // flash middleware

app.use(passport.initialize());      // Initialize passport
app.use(passport.session());         // Add a session

app.use((req, res, next) => {
  console.log('res locals >>>', res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});



//=== HOME PAGE ===//
app.get('/', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
    db.gblog.findAll({order: [['createdAt', 'DESC']], limit:10, offset:0, include:[db.user]}).then((messages) => {
        res.render('index', { id, name, email, messages, root:req.get('host')});
    })
  // res.render('index');
});

//=== post new global
app.post('/new', async (req, res) => {
  let content = req.body.newBlog;
  let id = req.user.id;
  let topic = req.body.topic;
  db.gblog.create({
      content: content,
      topic: topic,
      userId: id
     }).then(() => {
     res.redirect('/');
    }).catch(err => {
     console.log(err);
    })
  });

app.use('/auth', require('./controllers/auth'));
app.use('/chat', require('./controllers/chat'));
app.use('/profile', require('./controllers/profile'));
// Add this above /auth controllers


const PORT = process.env.PORT || 3000;
const appserver = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = appserver;
