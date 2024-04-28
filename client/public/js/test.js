document.getElementById('save-button').addEventListener('click', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5500/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.getElementById('login-button').addEventListener('click', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5500/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token);
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.getElementById('test-button').addEventListener('click', function (event) {
    event.preventDefault();
    const token = localStorage.getItem('token');

    fetch('http://localhost:5500/posts', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.getElementById('logout-button').addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.removeItem('token');
});