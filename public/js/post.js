'use strict';

const editPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();
    const post_id = parseInt(document.querySelector('#post-id').value.trim(), 10);

    if (title && text && post_id) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                text,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert('Post updated!');
            document.location.replace(`/post/${post_id}`);
        } else {
            const resData = await response.json();

            alert(`${response.statusText}\n${resData.message ? resData.message : ''}`);
        }
    }
};

const initPost = () => {
    document.querySelector('#js-edit-post-form').addEventListener('submit', editPostFormHandler);
};

initPost();
