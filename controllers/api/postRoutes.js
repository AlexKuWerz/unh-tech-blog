const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/withAuth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = {
            title: req.body.title,
            text_content: req.body.text,
            author_id: req.session.user_id,
        };

        const postData = await Post.create(newPost);

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/comment', withAuth, async (req, res) => {
    try {
        const newComment = {
            text: req.body.text,
            author_id: req.session.user_id,
            post_id: req.body.post_id,
        };

        const commentData = await Comment.create(newComment);

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                author_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({
                message: 'You have no post with this id!',
            });

            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const foundPost = await Post.findByPk(req.params.id);

        if (!foundPost) {
            res.status(404).json({
                message: 'Post with this id not found!',
            });

            return;
        }

        const updatedPostData = {
            title: req.body.title,
            text_content: req.body.text,
            author_id: req.session.user_id,
        };

        const updatedPost = await Post.update(updatedPostData, {
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
