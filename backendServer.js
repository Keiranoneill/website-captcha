import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import postgres from 'postgres'; // Import 'postgres' module
import sha256 from 'sha256';

const app = express();
app.use(bodyParser.json());

// Connect to PostgreSQL database
const sql = postgres({
    host: '127.0.0.1',
    port: 5432,
    database: 'your_database_name',
    username: 'your_username',
    password: 'your_password'
});

// Define user input
const person = {
    name: '',
    email: '',
    password: ''
};

// Signup route
app.post('/signup.html', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    
    // You should validate input fields here
    
    person.name = name;
    person.email = email;
    person.password = hashedPassword;

    try {
        await sql`
            INSERT INTO persons (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})
        `;
        // Redirect to login page after successful signup
        res.redirect('/login.html');
    } catch (error) {
        console.error(error);
        res.json({ status: 500 });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    try {
        const user = await sql`
            SELECT * FROM persons WHERE email = ${email} AND password = ${hashedPassword}
        `;
        if (user.length === 0) {
            res.json({ status: 401 });
        } else {
            res.json({ status: 200 });
        }
    } catch (error) {
        console.error(error);
        res.json({ status: 500 });
    }
});

// Start the server
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

