import { getHeaders, API_BASE_URL } from './utils/apiHelpers.js';

document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    fetchAllBooks();
});

let allBooks = [];

function initializeEventListeners() {
    document.getElementById('search-button').addEventListener('click', fetchAllBooks);
    document.getElementById('search-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            fetchAllBooks();
        }
    });
    document.getElementById('year-start').addEventListener('input', filterBooks);
    document.getElementById('year-end').addEventListener('input', filterBooks);
}

function fetchAllBooks() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();

    fetch(`${API_BASE_URL}/books`, { headers: getHeaders() })
        .then(response => response.json())
        .then(data => {
            allBooks = data.filter(book => book.title.toLowerCase().includes(searchQuery));
            filterBooks();
        })
        .catch(error => console.error('Error fetching books:', error));
}

function filterBooks() {
    const yearStart = parseInt(document.getElementById('year-start').value);
    const yearEnd = parseInt(document.getElementById('year-end').value);

    let filteredBooks = allBooks;

    if (!isNaN(yearStart)) {
        filteredBooks = filteredBooks.filter(book =>
            new Date(book.release_date).getFullYear() >= yearStart
        );
    }

    if (!isNaN(yearEnd)) {
        filteredBooks = filteredBooks.filter(book =>
            new Date(book.release_date).getFullYear() <= yearEnd
        );
    }

    displayBooks(filteredBooks);
}

function displayBooks(books) {
    const catalogList = document.getElementById('catalog-list');
    catalogList.innerHTML = '';
    books.forEach((book, index) => {
        const bookElement = document.createElement('tr');
        const uniqueParam = new Date().getTime() + index;
        bookElement.innerHTML = `
            <td><img src="${book.title_image}?random=${uniqueParam}" alt="${book.title}" class="book-cover"></td>
            <td>${truncateText(book.title, 30)}</td>
            <td>${truncateText(book.author, 30)}</td>
            <td>${new Date(book.release_date).toDateString()}</td>
        `;
        catalogList.appendChild(bookElement);
    });
}

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}
