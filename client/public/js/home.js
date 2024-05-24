import { getHeaders, fetchAPI, API_BASE_URL } from './utils/apiHelpers.js';

window.onload = function() {
    fetchBooksForSections();
};

function fetchBooksForSections() {
    fetchBooksForSection('latest-additions', '/books/latest-additions');
    fetchBooksForSection('latest-releases', '/books/latest-releases');
    fetchBooksForSection('a-to-z', '/books/alphabetical');
}

function fetchBooksForSection(section, endpoint) {
    fetch(`${API_BASE_URL}${endpoint}`, { headers: getHeaders() })
    .then(response => response.json())
    .then(data => {
        const sectionList = document.getElementById(section);
        sectionList.innerHTML = '';
        data.forEach((book, index) => {
            const bookElement = document.createElement('div');
            bookElement.className = 'item';
            const uniqueParam = new Date().getTime() + index;
            bookElement.innerHTML = `
                <img src="${book.title_image}?random=${uniqueParam}" alt="${book.title}">
                <h3>${book.title}</h3>
            `;
            bookElement.addEventListener('click', () => openModal(book));
            sectionList.appendChild(bookElement);
        });
    })
    .catch(error => console.error('Error loading books:', error));
}

function openModal(book) {
    document.getElementById('modal-title').textContent = book.title;
    document.getElementById('modal-cover').src = book.title_image;
    document.getElementById('modal-author').textContent = book.author;
    document.getElementById('modal-genre').textContent = book.genre;
    document.getElementById('modal-pages').textContent = book.pages;
    document.getElementById('modal-release-date').textContent = new Date(book.release_date).toDateString();

    const modal = document.getElementById('book-modal');
    modal.style.display = 'block';

    const closeButton = document.querySelector('.close-button');
    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}