import { getHeaders, fetchAPI, API_BASE_URL } from './utils/apiHelpers.js';

window.onload = function() {
    fetchPostsAndBooks();
};

function fetchPostsAndBooks() {
    fetchPosts();
    fetchBooks();
}

function fetchPosts() {
    fetch(`${API_BASE_URL}/posts`, { headers: getHeaders() })
    .then(response => response.json())
    .then(data => {
        const postsList = document.getElementById('posts');
        postsList.innerHTML = ''; 
        data.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'item';
            const uniqueParam = new Date().getTime() + index; // Create a unique parameter
            postElement.innerHTML = `
                <img src="${post.title_image}?random=${uniqueParam}" alt="${post.title}">
                <h3>${post.title}</h3>
            `;
            postsList.appendChild(postElement);
        });
    })
    .catch(error => console.error('Error loading posts:', error));
}

function fetchBooks() {
    fetch(`${API_BASE_URL}/books`, { headers: getHeaders() })
    .then(response => response.json())
    .then(data => {
        const booksList = document.getElementById('books');
        booksList.innerHTML = ''; 
        data.forEach((book, index) => {
            const bookElement = document.createElement('div');
            bookElement.className = 'item';
            const uniqueParam = new Date().getTime() + index; // Create a unique parameter
            bookElement.innerHTML = `
                <img src="${book.title_image}?random=${uniqueParam}" alt="${book.title}">
                <h3>${book.title}</h3>
            `;
            booksList.appendChild(bookElement);
        });
    })
    .catch(error => console.error('Error loading books:', error));
}