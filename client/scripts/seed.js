require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool(JSON.parse(process.env.POSTGRES));

const posts = [
    {
        date: '2024-03-18',
        title: 'Welcome to Our Blog',
        body: 'This is the beginning of something great. Stay tuned for more posts!',
    },
    {
        date: '2023-02-28',
        title: 'Is it the Past or the Future?',
        body: 'No idea why this post precedes the welcoming one!',
    },
    {
        date: '2001-01-30',
        title: 'Archives v.14.4666',
        body: 'Even older posts?',
    },
    {
        date: '1943-05-23',
        title: 'The New Order',
        body: 'What is the perfect bait? We decided to find out! Did you find out?',
    },
];

async function seedPosts() {
    try {
        await Promise.all(posts.map(post => {
            const { date, title, body } = post;
            return pool.query(
                'INSERT INTO posts(date, title, body) VALUES($1, $2, $3)',
                [date, title, body]
            );
        }));
        console.log('Seed data has been successfully inserted into the database.');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await pool.end();
    }
}

seedPosts();