import { API_BASE_URL } from './utils/apiHelpers.js';

document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    submitUser(`${API_BASE_URL}/register`, { username, password });
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                window.location.href = '/html/catalog.html';
            } else {
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
                window.location.href = '/html/login.html';
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
                window.location.href = '/html/catalog.html';
            } else {
                console.error('Error:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}