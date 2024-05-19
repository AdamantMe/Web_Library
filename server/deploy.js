const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool(JSON.parse(process.env.POSTGRES));

async function setupDatabase() {
    try {
        await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL UNIQUE,
                author VARCHAR(255) NOT NULL,
                genre VARCHAR(100),
                pages INT,
                title_image VARCHAR(255),
                uuid UUID DEFAULT uuid_generate_v4(),
                release_date TIMESTAMP WITH TIME ZONE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );      
        `);

        const hashedPassword = await bcrypt.hash('admin', 10);
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING', ['admin', hashedPassword]);
        console.log("Tables created and default user added successfully.");
        await seedData();
        await pool.end();
    } catch (error) {
        console.error("Error setting up database:", error);
    }
}

const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();

const books = [
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Novel',
        pages: 180,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1920, 0, 1), new Date(1925, 11, 31))
    },
    {
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
        pages: 328,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1945, 0, 1), new Date(1949, 11, 31))
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Classic',
        pages: 281,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1955, 0, 1), new Date(1960, 11, 31))
    },
    {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        genre: 'Novel',
        pages: 234,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1945, 0, 1), new Date(1951, 11, 31))
    },
    {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        genre: 'Romance',
        pages: 432,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1800, 0, 1), new Date(1813, 11, 31))
    },
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        pages: 310,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1935, 0, 1), new Date(1937, 11, 31))
    },
    {
        title: 'Moby Dick',
        author: 'Herman Melville',
        genre: 'Adventure',
        pages: 635,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1845, 0, 1), new Date(1851, 11, 31))
    },
    {
        title: 'War and Peace',
        author: 'Leo Tolstoy',
        genre: 'Historical Fiction',
        pages: 1225,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1860, 0, 1), new Date(1869, 11, 31))
    },
    {
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        genre: 'Psychological Fiction',
        pages: 671,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1860, 0, 1), new Date(1866, 11, 31))
    },
    {
        title: 'The Adventures of Huckleberry Finn',
        author: 'Mark Twain',
        genre: 'Adventure',
        pages: 366,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1875, 0, 1), new Date(1884, 11, 31))
    },
    {
        title: 'Brave New World',
        author: 'Aldous Huxley',
        genre: 'Dystopian',
        pages: 311,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1930, 0, 1), new Date(1932, 11, 31))
    },
    {
        title: 'Anna Karenina',
        author: 'Leo Tolstoy',
        genre: 'Realist Novel',
        pages: 864,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1870, 0, 1), new Date(1877, 11, 31))
    },
    {
        title: 'The Grapes of Wrath',
        author: 'John Steinbeck',
        genre: 'Realist Novel',
        pages: 464,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1935, 0, 1), new Date(1939, 11, 31))
    },
    {
        title: 'The Great Expectations',
        author: 'Charles Dickens',
        genre: 'Classic',
        pages: 505,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1855, 0, 1), new Date(1861, 11, 31))
    },
    {
        title: 'Wuthering Heights',
        author: 'Emily Bronte',
        genre: 'Gothic Fiction',
        pages: 348,
        title_image: 'https://picsum.photos/200/300',
        release_date: getRandomDate(new Date(1845, 0, 1), new Date(1847, 11, 31))
    }
];

async function seedData() {
    try {
        for (let book of books) {
            await pool.query(
                'INSERT INTO books(title, author, genre, pages, title_image, release_date) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT (title) DO NOTHING', 
                [book.title, book.author, book.genre, book.pages, book.title_image, book.release_date]
            );
        }
        console.log('Seed data has been successfully inserted into the database.');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

setupDatabase();