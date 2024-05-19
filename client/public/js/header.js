function initializeHeader() {
    console.log("ASD");
    const currentPath = window.location.pathname.split('/').pop();
    
    const homeButton = document.getElementById('home-button');
    const catalogButton = document.getElementById('catalog-button');
    
    // Enable all buttons by default
    homeButton.disabled = false;
    catalogButton.disabled = false;

    if (currentPath === 'home.html' || currentPath === '') {
        homeButton.disabled = true;
        homeButton.classList.add('disabled-button');
    } else {
        homeButton.classList.remove('disabled-button');
        homeButton.addEventListener('click', () => {
            window.location.href = '/client/public/home.html';
        });
    }

    if (currentPath === 'catalog.html') {
        catalogButton.disabled = true;
        catalogButton.classList.add('disabled-button');
    } else {
        catalogButton.classList.remove('disabled-button');
        catalogButton.addEventListener('click', () => {
            window.location.href = '/client/public/html/catalog.html';
        });
    }

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        darkModeToggle.textContent = document.body.classList.contains('dark-theme') ? 'Light Mode' : 'Dark Mode';
    });

    // Check dark mode state on load
    darkModeToggle.textContent = document.body.classList.contains('dark-theme') ? 'Light Mode' : 'Dark Mode';
}

initializeHeader();