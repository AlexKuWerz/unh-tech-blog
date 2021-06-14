const router = require('express').Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/');

            return;
        }

        const userPostsData = await Post.findAll({
            attributes: {
                exclude: [
                    'author_id',
                ],
            },
            where: {
                author_id: req.session.user_id,
            },
        });

        const userPosts = userPostsData.map(post => post.get({ plain: true }));

        const options = {
            logged_in: req.session.logged_in,
        };

        if (userPosts.length) {
            options.posts = {
                ...userPosts,
            };
        }

        res.render('dashboardPage', options);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
