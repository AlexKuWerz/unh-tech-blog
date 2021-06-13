'use strict';

const logoutHandler = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

const init = () => {
    document.getElementById('js-logout-link').addEventListener('click', logoutHandler);
}

init();