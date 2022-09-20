const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const axios = require('axios');


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


//=== post new comments
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

//====edit comments
// first grab the comment

router.get('/edit/:idx', isLoggedIn, async (req, res) => {
    db.blog.findOne({
        where: {id: req.params.idx}
    }).then(log => {
        const id = log.id;
        const content = log.content;
        console.log('console log', log);
        res.render('profile/edit', { id, content});
    })
});

//=== now Edit
router.post('/edit/new/:idx', (req, res) => {
    newContent = JSON.stringify(req.body.editContent)
    db.blog.update(
        {content: req.body.editContent},
        {where: { id: req.params.idx}}
  )
    .then((results) => {
        console.log(results);
        res.redirect('/profile');
    })
    .catch(err => {
        console.log('error below: ', err);
    })
});

module.exports = router;