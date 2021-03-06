'use strict';

const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const resData = await response.json();

            alert(`${response.statusText}\n${resData.message ? resData.message : ''}`);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#signup-name').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (password.length < 8) {
        alert('Password must be at least 8 characters');
        document.querySelector('#signup-password').focus();

        return;
    }

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            const resData = await response.json();

            alert(`${response.statusText}\n${resData.message ? resData.message : ''}`);
        }
    }
};

const toggleBlocks = () => {
    document.querySelector('#js-login-block').classList.toggle('d-none');
    document.querySelector('#js-signup-block').classList.toggle('d-none');
};

const initLogin = () => {
    document.querySelector('#js-login-form').addEventListener('submit', loginFormHandler);
    document.querySelector('#js-signup-form').addEventListener('submit', signupFormHandler);
    document.querySelectorAll('.js-block-toggle').forEach(elem => elem.addEventListener('click', toggleBlocks));
};

initLogin();
