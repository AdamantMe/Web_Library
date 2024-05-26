# Project Proposal: Book Library Catalog Web Application

## Project Overview
This project aims to create a comprehensive web application that serves as a book library catalog. The application will feature a REST API backend and a dynamic frontend interface, designed to cater to two types of users with different levels of access and capabilities:

1. **Reader (No Authentication Required)**: Public users can explore the library's collection by listing books based on genre, author, or title. No login is required to use the library catalog.

2. **Librarian (Authentication Required)**: Librarians can manage books after logging in; Adding new books or updating/removing existing books.

## Technical Implementation

### Backend
The backend is built using Node.js and Express, with PostgreSQL as the database. It includes several key components:

- **Authorization Middleware**: Handles JWT-based user authentication, ensuring that only authenticated users can perform certain operations.
- **Database Connection**: Manages the connection to the PostgreSQL database, allowing for query execution.
- **Book Management**: 
  - `booksController.js`: Provides endpoints for fetching books, adding new books, updating existing books, and deleting books.
  - `booksService.js`: Contains business logic for creating, retrieving, updating, and deleting books. Validates data and checks for duplicates.
  - `booksRepository.js`: Interacts with the PostgreSQL database to perform CRUD operations on books.
- **User Registration and Login**: Handles user registration, including password hashing with bcrypt, and user login, generating JWTs for authenticated sessions.

### Frontend
The frontend is developed with Alpine.js, providing a dynamic and responsive user interface. It includes:
- **Library Application**: Manages the state and interactions for browsing books, including fetching books, genres, authors, and titles from the backend.
- **User Authentication**: Handles user login and registration, interacting with the backend to authenticate users and register new accounts.
- **Book Management**: Allows librarians to add, update, and delete books, with functionalities to fetch and display books, and handle form submissions for book management.

### Database Schema
The database schema includes tables for books and users:
- **Books Table**: Contains fields for title, author, genre, pages, title_image, release_date, and uuid.
- **Users Table**: Contains fields for username, password (hashed), and created_at.

### Deployment
The application is deployed on Render, which provides a free tier for hosting both the web service and the PostgreSQL database. Environment variables are managed through a .env file to ensure security and ease of configuration.

## Project Plan
The project follows a structured plan, starting with the proposal submission and moving through setup, development, integration, testing, deployment, and documentation phases. Key milestones include:
1. **Setup**: Setting up the development environment and initializing repositories.
2. **Backend Development**: Developing the REST API using Express.js and PostgreSQL.
3. **Frontend Development**: Creating the user interface with HTML, CSS, and Alpine.js.
4. **Deployment and Testing**: Deploying the application on Render, followed by thorough testing to ensure that the application works correctly in the production environment.
5. **Integration and Testing**: Performing thorough integration testing to ensure that all components work seamlessly together, both locally and in the deployed environment.
6. **Documentation**: Completing the technical documentation and finalizing the project report.

## Conclusion
This project aims to enhance the library experience for both readers and librarians through a simple yet effective web application. By leveraging modern web technologies such as Node.js, Express, Alpine.js, and PostgreSQL, the application provides a user-friendly platform for book management and browsing.