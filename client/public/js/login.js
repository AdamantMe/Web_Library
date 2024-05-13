const BASE_URL = 'http://localhost:5500';

document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    submitUser(`${BASE_URL}/register`, { username, password }, username);
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    // Send a request to your server with the entered username and password
    fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // If the login was successful, store the token and redirect to the posts page
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                window.location.href = '/client/public/html/index.html';
            } else {
                // If the login failed, display an error message
                alert('Login failed: ' + data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

function submitUser(url, user) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                window.location.href = '/client/public/html/login.html';
            } else {
                console.log(response);
                throw new Error('Server response was not ok.');
            }
        })
        .then(data => {
            if (data) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.user.id);
                localStorage.setItem('username', data.user.username);
                window.location.href = '/client/public/html/index.html';
            } else {
                console.error('Error:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}