const router = require('express').Router();
const { Post } = require('../../models');
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

module.exports = router;
