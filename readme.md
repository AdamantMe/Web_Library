# Book Library Catalog Web Application

## Overview
This project is a web application that serves as a book library catalog. It allows users to browse books and manage the library's collection. The application features a REST API backend and a dynamic frontend interface.

## Features
- **Public Access**: Explore the library's collection without logging in.
- **User Authentication**: Log in as a librarian to manage the book collection.
- **Book Management**: Add, update, and delete books (for librarians).
- **Search Functionality**: Search books by title, author, or genre.
- **Responsive Design**: User-friendly interface with Alpine.js.

## Live Demo
Access the live application at [weblibrary.onrender.com](https://weblibrary.onrender.com).

**Note:** Due to modifications required for production deployment on Render, certain paths in the code are configured for the live environment. This may cause some discrepancies when running the application locally. The code is functional, but local paths might need adjustments for full compatibility in a local setup.

## Installation and Setup

### Prerequisites
- Node.js
- PostgreSQL

### Local Setup

1. **Clone the repository:**
    ```sh
    git clone [<repository-url>](https://github.com/AdamantMe/Web_Library)
    cd <repository-directory>
    ```

2. **Install dependencies:**
    ```sh
    cd server
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the `server` directory with the following content:
    ```plaintext
    POSTGRES={"host":"<your-db-host>","port":5432,"database":"<your-db-name>","user":"<your-db-user>","password":"<your-db-password>"}
    PORT=5500
    SECRET='your-secret-key'
    ```

4. **Initialize the database:**
    Use the provided script to set up the initial database schema and seed data:
    ```sh
    node deploy.js
    ```

5. **Run the application:**
    ```sh
    node server.js
    ```

6. **Access the application:**
    Open your browser and navigate to `http://localhost:5500`.

## Instructions of Use

### Home Page
- **View Books**: On the home page, users can see a list of books. Clicking on the book's cover, title, or the whole box will open a modal displaying detailed information about the book.
- **Sections**: The home page is divided into sections like "Latest Additions", "Latest Releases", and "A-Z", each showcasing the top 5 results (ordered accordingly)

### Catalog Page
- **Search Books**: Users can search for books by title using the search bar.
- **Filter by Year**: Users can filter books by specifying the start and end years.
- **Add Books**: Logged-in librarians can add new books using the "Add Book" button located to the right of the year filtering inputs.
- **Edit Books**: Logged-in librarians can click on book details to edit them directly.
- **Delete Books**: Logged-in librarians can delete books using the "Delete" button next to each book.

## Authorization Middleware
While the `authorize.js` middleware is included to handle JWT-based user authentication, it is not actively used in the final implementation. User permissions are managed through different logic in the application.

## Database Schema
The database schema includes tables for books and users:
- **Books Table**: Contains fields for title, author, genre, pages, title_image, release_date, and uuid.
- **Users Table**: Contains fields for username, password (hashed), and created_at.

## Deployment
The application is deployed on Render, which provides a free tier for hosting both the web service and the PostgreSQL database. Environment variables are managed through a `.env` file to ensure security and ease of configuration.

## Conclusion
This Book Library Catalog Web Application enhances the library experience for both readers and librarians through a user-friendly platform for book management and browsing. By leveraging modern web technologies, the application provides a robust and scalable solution.