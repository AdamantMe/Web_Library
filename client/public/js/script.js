const API_BASE_URL = 'http://localhost:5500';

document.getElementById('createPostForm').addEventListener('submit', function (e) {
    e.preventDefault();
    submitPost('/posts', 'POST', {
        title: document.getElementById('title').value,
        body: document.getElementById('body').value,
        date: new Date().toISOString()
    });
    document.getElementById('createPostForm').reset();
});

let globalUpdatedPost = null;

document.getElementById('updatePostForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const uuid = this.querySelector('.uuid').value;
    const title = this.querySelector('.updateTitle').value;
    const body = this.querySelector('.updateBody').value;

    submitPost('/posts/' + uuid, 'PUT', { title: title, body: body });
});

function submitPost(url, method, data) {
    fetch(API_BASE_URL + url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (method === 'POST') {
                addPostToDOM(data);
            } else if (method === 'PUT') {
                updatePostInDOM(data);
            }
        })
        .catch(error => console.error('Error:', error));
}

function getPosts() {
    console.trace('getPosts called');
    fetch(API_BASE_URL + '/posts')
        .then(response => {
            return response.json(); 
        })
        .then(posts => {
            const postsContainer = document.getElementById('posts');
            postsContainer.innerHTML = ''; 
            console.log(posts);
            posts.forEach(post => {
                addPostToDOM(post);
            });
        });
}

function addPostToDOM(post) {
    const postsContainer = document.getElementById('posts');
    const postTemplate = document.getElementById('post-template').content;
    const postElement = document.importNode(postTemplate, true);

    postElement.querySelector('.post').dataset.uuid = post.uuid;
    postElement.querySelector('.post-content h3').textContent = post.title;
    postElement.querySelector('.post-content p').textContent = post.body;
    postElement.querySelector('.edit').onclick = () => editPost(post.uuid, post.title, post.body);
    postElement.querySelector('.delete').onclick = () => deletePost(post.uuid);
    postElement.querySelector('.uuid').value = post.uuid;
    postElement.querySelector('.updateTitle').value = post.title;
    postElement.querySelector('.updateBody').value = post.body;

    postsContainer.appendChild(postElement);
}

function editPost(uuid, title, body) {
    // Assuming you correctly find the postElement based on the uuid
    const postElement = document.querySelector(`.post[data-uuid="${uuid}"]`);
    const updateForm = postElement.querySelector('form');

    // Set initial values for the form inputs
    postElement.querySelector('.uuid').value = uuid;
    postElement.querySelector('.updateTitle').value = title;
    postElement.querySelector('.updateBody').value = body;

    // Display the form
    postElement.querySelector('.edit-form').style.display = 'block';

    // Prevent the form from submitting normally
    updateForm.onsubmit = function (event) {
        event.preventDefault();
        submitPost('/posts/' + uuid, 'PUT', {
            title: updateForm.querySelector('.updateTitle').value,
            body: updateForm.querySelector('.updateBody').value
        });
        // Hide the form again after submit
        postElement.querySelector('.edit-form').style.display = 'none';
    };
}


function cancelUpdate(uuid) {
    const postElement = document.querySelector(`.post[data-uuid="${uuid}"]`);
    postElement.querySelector('.post-content').style.display = 'block';
    postElement.querySelector('.edit-form').style.display = 'none';
}

function updatePostInDOM(updatedPost) {
    const uuid = updatedPost.uuid;
    const postElement = document.querySelector(`.post[data-uuid="${uuid}"]`);
    if (postElement) {
        postElement.querySelector('h3').textContent = updatedPost.title;
        postElement.querySelector('p').textContent = updatedPost.body;

        postElement.querySelector('.post-content').style.display = 'block';
        postElement.querySelector('.edit-form').style.display = 'none';
    } else {
        console.log(`Post with UUID ${updatedPost.uuid} not found in DOM. Refreshing posts...`);
        getPosts(); // Fallback to refreshing the list if the post isn't found
    }
}

function deletePost(uuid) {
    fetch(API_BASE_URL + '/posts/' + uuid, { method: 'DELETE' })
        .then(() => {
            getPosts(); // Refresh the list of posts
        })
        .catch(error => console.error('Error:', error));
}

function refreshUserAndPosts() {
    const token = localStorage.getItem('token');
    if (token && token.split('.').length === 3) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.username) {
            document.getElementById('username-display').textContent = `Logged in as ${payload.username}`;
        }
    }

    // Fetch the posts from server
    getPosts();
}

window.onload = function () {
    refreshUserAndPosts();

    if (!localStorage.getItem('token')) {
        window.location.href = '/client/public/login.html';
    }

    const token = localStorage.getItem('token');
    if (token && token.split('.').length === 3) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        document.getElementById('username-display').textContent = `Logged in as ${payload.username}`;

        // Fetch the posts from the server
        getPosts();
    }

    // Handle the logout button click
    document.getElementById('logout-button').addEventListener('click', function () {
        console.log('Logging out');
        localStorage.removeItem('token');
        window.location.href = '/client/public/login.html';
    });
};