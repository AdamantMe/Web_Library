import { getHeaders, API_BASE_URL } from './utils/apiHelpers.js';

let allBooks = [];
let isLoggedIn = false;

document.addEventListener('DOMContentLoaded', function () {
    isLoggedIn = !!localStorage.getItem('token');
    initializeEventListeners();
    fetchAllBooks();
});

function initializeEventListeners() {
    document.getElementById('search-button').addEventListener('click', fetchAllBooks);
    document.getElementById('search-input').addEventListener('keydown', function (event) {
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
            <td contenteditable="${isLoggedIn}">${truncateText(book.title, 30)}</td>
            <td contenteditable="${isLoggedIn}">${truncateText(book.author, 30)}</td>
            <td contenteditable="${isLoggedIn}">${new Date(book.release_date).toDateString()}</td>
            ${isLoggedIn ? '<td><button class="save-button" data-uuid="' + book.uuid + '">Save</button></td>' : ''}
        `;
        catalogList.appendChild(bookElement);
    });

    if (isLoggedIn) {
        document.querySelectorAll('.save-button').forEach(button => {
            button.addEventListener('click', function () {
                const bookUUID = this.getAttribute('data-uuid');
                const row = this.parentNode.parentNode;
                const updatedBook = {
                    title: row.cells[1].innerText,
                    author: row.cells[2].innerText,
                    release_date: new Date(row.cells[3].innerText).toISOString(),
                    title_image: row.cells[0].querySelector('img').src.split('?')[0]
                };

                if (!validateBookData(updatedBook)) {
                    alert('Invalid book data. Please check your input.');
                    return;
                }

                updateBook(bookUUID, updatedBook);
            });
        });
    }
}

function validateBookData(book) {
    if (!book.title || !book.author || !book.release_date || !book.title_image) {
        return false;
    }
    return true;
}

function updateBook(uuid, book) {
    fetch(`${API_BASE_URL}/books/${uuid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(book)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Error updating book');
                });
            }
            return response.json();
        })
        .then(data => {
            if (data && data.uuid === uuid) {
                alert('Book updated successfully');
                const index = allBooks.findIndex(b => b.uuid === uuid);
                if (index !== -1) {
                    allBooks[index] = data;
                }
                filterBooks();
            } else {
                alert('Error updating book: Unexpected response');
            }
        })
        .catch(error => {
            console.error('Error updating book:', error);
            alert('Error updating book: ' + error.message);
        });
}


function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}
