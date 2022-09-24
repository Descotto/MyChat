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
app.use(express.static(path.join(__dirname, '/public')));
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
  db.gblog.findAll({ order: [['createdAt', 'DESC']], limit: 10,
   offset: 0,
   include: [db.user, {
    model: db.comment,
    include: [db.user]
   }] }).then((gblogs) => {
    res.render('index', {gblogs, root: req.get('host') });
  })
});

//=== post new global
app.post('/new', isLoggedIn, async (req, res) => {
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

//== Post new comments
app.post('/:idx/comment/', isLoggedIn, (req, res) => {
  let comments = req.body.comments;
  let id = req.user.id;
  db.comment.create({
    content: req.body.comments,
    userId: req.user.id,
    gblogId: req.params.idx
  }).then(() => {
    res.redirect('/');
  }).catch(err => {
    console.log('Error creating comment', err);
  });
});

//== get edit
app.get('/global/edit/:idx', isLoggedIn, async (req, res) => {

  db.gblog.findOne({
    where: { id: req.params.idx }
  }).then(log => {
    const id = log.id;
    const content = log.content;
    console.log('console log', log);
    res.render('global/edit', { id, content });
  })
});
//=== now Edit
app.post('/global/new/:idx', isLoggedIn, (req, res) => {
  const edit = ' _edit';
  newContent = JSON.stringify(req.body.editContent)
  db.gblog.update(
    { content: req.body.editContent + ' --edited' },
    { where: { id: req.params.idx } }
  )
    .then((results) => {
      console.log(results);
      res.redirect('/');
    })
    .catch(err => {
      console.log('error below: ', err);
    })
});


//== get delete
app.get('/global/delete/:idx', isLoggedIn, (req, res) => {
  db.gblog.findOne({
    where: { id: req.params.idx }
  }).then(log => {
    const id = log.id;
    const content = log.content;
    console.log('console log', log);
    res.render("global/delete", { id, content });
  })
});
//=== Delete route
app.post('/global/delete/dl/:idx', isLoggedIn, function (req, res, next) {
  db.gblog.findOne({ where: { id: req.params.idx } }).then((gblog) => {
    console.log('blog deleted', gblog);
    gblog.destroy();
  })
    .then(() => {
      res.redirect('/');
    }).catch(err => {
      console.log('CONSOLE>LOG: ', err);
    });
});

app.use('/auth', require('./controllers/auth'));
app.use('/chat', require('./controllers/chat'));
app.use('/profile', require('./controllers/profile'));



const PORT = process.env.PORT || 3000;
const appserver = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = appserver;
