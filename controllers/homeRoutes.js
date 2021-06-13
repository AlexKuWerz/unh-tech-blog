const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'text_content',
                'creation_date',
            ],
            include: [
                {
                    model: User,
                    attributes: [
                        'name',
                    ],
                },
            ],
        });

        const posts = postsData.map(post => post.get({ plain: true }));

        res.render('homePage', {
            posts: {
                ...posts,
            },
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/');

            return;
        }

        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;