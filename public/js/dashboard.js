'use strict';

const newPostFormToggle = () => {
    document.querySelector('#js-new-post-form').classList.toggle('d-none');
};

const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();

    if (title && text) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                text,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.querySelector('#js-new-post-form').classList.add('d-none');
            alert('New post created!');
            document.location.reload();
        } else {
            const resData = await response.json();

            alert(`${response.statusText}\n${resData.message ? resData.message : ''}`);
        }
    }
};

const initDashboard = () => {
    document.querySelector('#js-new-post-btn').addEventListener('click', newPostFormToggle);
    document.querySelector('#js-new-post-form').addEventListener('submit', newPostFormHandler);
};

initDashboard();