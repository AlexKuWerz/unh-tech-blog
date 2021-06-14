const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: {
                exclude: [
                    'author_id',
                ],
            },
            include: [
                {
                    model: User,
                    attributes: [
                        'name',
                    ],
                },
                {
                    model: Comment,
                    attributes: [
                        'text',
                        'creation_date',
                    ],
                    include: {
                        model: User,
                        attributes: [
                            'name',
                        ],
                    },
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('postPage', {
            post: post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
                author_id: req.session.user_id,
            },
            attributes: {
                exclude: [
                    'author_id',
                ],
            },
        });

        if (!postData) {
            res.redirect('/');

            return;
        }

        const post = postData.get({ plain: true });

        res.render('postEditPage', {
            post: post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
