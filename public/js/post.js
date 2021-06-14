'use strict';

const newCommentFormToggle = () => {
    document.querySelector('#js-new-comment-form').classList.toggle('d-none');
};

const newCommentFormHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#comment-text').value.trim();
    const post_id = parseInt(document.querySelector('#post-id').value.trim(), 10);

    if (text && post_id) {
        const response = await fetch(`/api/posts/comment`, {
            method: 'POST',
            body: JSON.stringify({
                text,
                post_id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.querySelector('#js-new-comment-form').classList.add('d-none');
            alert('New comment created!');
            document.location.reload();
        } else {
            const resData = await response.json();

            alert(`${response.statusText}\n${resData.message ? resData.message : ''}`);
        }
    }
};

const initPost = () => {
    document.querySelector('#js-add-comment').addEventListener('click', newCommentFormToggle);
    document.querySelector('#js-new-comment-form').addEventListener('submit', newCommentFormHandler);
};

initPost();
