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
        },
        order: [['createdAt', 'DESC']],
        include: [{
            model: db.comment,
            include: [db.user]
        }]
    }).then((blog) => {
        db.emoji.findAll().then((emo) => {
            const emoji = emo.slice(0, 500);
            res.render('profile', { id, name, email, blog, emoji });
        });
    })
});


//=== post new content
router.post('/blog', isLoggedIn, async (req, res) => {
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

//== Post new comments
router.post('/:idx/comment/', isLoggedIn, (req, res) => {
    let comments = req.body.comments;
    let id = req.user.id;
    db.comment.create({
        content: req.body.comments,
        userId: req.user.id,
        blogId: req.params.idx
    }).then(() => {
        res.redirect('/profile');
    }).catch(err => {
        console.log('Error creating comment', err);
    });
});


//get the comment for delete


router.get('/delete/:idx', isLoggedIn, (req, res) => {
    db.blog.findOne({
        where: { id: req.params.idx }
    }).then(log => {
        const id = log.id;
        const content = log.content;
        console.log('console log', log);
        res.render("profile/delete", { id, content });
    })
});


//====edit comments
// first grab the comment

router.get('/edit/:idx', isLoggedIn, async (req, res) => {
    db.blog.findOne({
        where: { id: req.params.idx }
    }).then(log => {
        const id = log.id;
        const content = log.content;
        console.log('console log', log);
        res.render('profile/edit', { id, content });
    })
});


//=== now Edit
router.put('/edit/new/:idx', isLoggedIn, (req, res) => {
    newContent = JSON.stringify(req.body.editContent)
    db.blog.update(
        { content: req.body.editContent },
        { where: { id: req.params.idx } }
    )
        .then((results) => {
            console.log(results);
            res.redirect('/profile');
        })
        .catch(err => {
            console.log('error below: ', err);
        })
});
//=== Delete route
router.delete('/delete/dl/:idx', isLoggedIn, function (req, res, next) {
    db.blog.findOne({ where: { id: req.params.idx } }).then((blog) => {
        console.log('blog deleted', blog);
        blog.destroy();
    })
        .then(() => {
            res.redirect('/profile');
        }).catch(err => {
            console.log('CONSOLE>LOG: ', err);
        });
});

//now delete

module.exports = router;