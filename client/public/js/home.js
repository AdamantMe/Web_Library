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
    .then(response => {
        if (response.status === 401) {
            alert('You need to log in to view this section.');
            window.location.href = '/html/login.html';
            return;
        }
        return response.json();
    })
    .then(data => {
        if (data) {
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
                sectionList.appendChild(bookElement);
            });
        }
    })
    .catch(error => console.error('Error loading books:', error));
}