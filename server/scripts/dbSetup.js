const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const defaultDbConfig = {
    host: "localhost",
    port: 5432,
    database: "blog",
    user: "postgres",
    password: "admin"
};

const pool = new Pool(defaultDbConfig);

async function setupDatabase() {
    try {
        // Install the UUID extension to ensure uuid_generate_v4() is available
        await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL UNIQUE,
            author VARCHAR(255) NOT NULL,
            date TIMESTAMP WITH TIME ZONE NOT NULL,
            body TEXT NOT NULL,
            title_image VARCHAR(255),
            uuid UUID DEFAULT uuid_generate_v4(),
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
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );      
    `);

        // Default user
        const hashedPassword = await bcrypt.hash('admin', 10);
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING', ['admin', hashedPassword]);
        console.log("Tables created and default user added successfully.");
        await seedData();
        await pool.end();
    }
    catch (error) {
        console.error("Error setting up database:", error);
    }
}

const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();

const posts = [
    {
        date: getRandomDate(new Date(2020, 0, 1), new Date()),
        title: 'Welcome to Our Blog',
        author: 'John Doe',
        body: 'This is the beginning of something great. Stay tuned for more posts!',
        title_image: 'https://picsum.photos/200/300'
    },
    {
        date: getRandomDate(new Date(2018, 0, 1), new Date()),
        title: 'Is it the Past or the Future?',
        author: 'Alice Johnson',
        body: 'No idea why this post precedes the welcoming one!',
        title_image: 'https://picsum.photos/200/300'
    },
    {
        date: getRandomDate(new Date(2019, 0, 1), new Date()),
        title: 'Deep Dive into the Ocean',
        author: 'Chris Field',
        body: 'Exploring the secrets of the deep blue has never been more exciting.',
        title_image: 'https://picsum.photos/200/300'
    },
    {
        date: getRandomDate(new Date(2021, 0, 1), new Date()),
        title: 'Mountains or Beaches?',
        author: 'Diana Crest',
        body: 'A perennial question for travelers - what does your heart say?',
        title_image: 'https://picsum.photos/200/300'
    },
    {
        date: getRandomDate(new Date(2017, 0, 1), new Date()),
        title: 'The Art of Coffee Making',
        author: 'Eva Storm',
        body: 'Coffee is an art form. Let\'s brew some!',
        title_image: 'https://picsum.photos/200/300'
    }
];

const books = [
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Novel',
        pages: 180,
        title_image: 'https://picsum.photos/200/300'
    },
    {
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
        pages: 328,
        title_image: 'https://picsum.photos/200/300'
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Classic',
        pages: 281,
        title_image: 'https://picsum.photos/200/300'
    },
    {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        genre: 'Novel',
        pages: 234,
        title_image: 'https://picsum.photos/200/300'
    },
    {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        genre: 'Romance',
        pages: 432,
        title_image: 'https://picsum.photos/200/300'
    }
];

async function seedData() {
    try {
        for (let post of posts) {
            await pool.query(
                'INSERT INTO posts(date, title, author, body, title_image) VALUES($1, $2, $3, $4, $5) ON CONFLICT (title) DO NOTHING', 
                [post.date, post.title, post.author, post.body, post.title_image]
            );
        }
        for (let book of books) {
            await pool.query(
                'INSERT INTO books(title, author, genre, pages, title_image) VALUES($1, $2, $3, $4, $5) ON CONFLICT (title) DO NOTHING', 
                [book.title, book.author, book.genre, book.pages, book.title_image]
            );
        }
        console.log('Seed data has been successfully inserted into the database.');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}


setupDatabase();