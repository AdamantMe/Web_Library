const API_BASE_URL = window.location.origin;

function getHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

function fetchAPI(url, options = {}) {
    return fetch(API_BASE_URL + url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
}

export { getHeaders, fetchAPI, API_BASE_URL };