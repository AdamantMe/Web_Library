function initializeHeader() {
    const currentPath = window.location.pathname.split('/').pop();

    const homeButton = document.getElementById('home-button');
    const catalogButton = document.getElementById('catalog-button');
    const loginRegisterButton = document.getElementById('login-button');

    homeButton.disabled = false;
    catalogButton.disabled = false;

    if (currentPath === 'home.html' || currentPath === '') {
        homeButton.disabled = true;
        homeButton.classList.add('disabled-button');
    } else {
        homeButton.classList.remove('disabled-button');
        homeButton.addEventListener('click', () => {
            window.location.href = '/home.html';
        });
    }

    if (currentPath === 'catalog.html') {
        catalogButton.disabled = true;
        catalogButton.classList.add('disabled-button');
    } else {
        catalogButton.classList.remove('disabled-button');
        catalogButton.addEventListener('click', () => {
            window.location.href = '/html/catalog.html';
        });
    }

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        darkModeToggle.textContent = document.body.classList.contains('dark-theme') ? 'Light Mode' : 'Dark Mode';
    });

    darkModeToggle.textContent = document.body.classList.contains('dark-theme') ? 'Light Mode' : 'Dark Mode';

    const token = localStorage.getItem('token');
    if (token) {
        loginRegisterButton.textContent = 'Logout';
        loginRegisterButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.reload();
        });
    } else {
        loginRegisterButton.addEventListener('click', () => {
            window.location.href = '/html/login.html';
        });
    }
}

initializeHeader();