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

        res.render('dashboardPage', {
            posts: {
                ...userPosts,
            },
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
