import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import postgres from 'postgres';
import axios from 'axios';

const app = express();
const jsonParser = bodyParser.json();

// Connect to PostgreSQL database
const sql = postgres({
  host: '127.0.0.1',
  port: 5432,
  database: 'users',
  username: 'maxroach',
  password: 'bobross'
});

// Test comment

// reCAPTCHA secret key
const RECAPTCHA_SECRET_KEY = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

app.use(jsonParser);

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password, recaptchaToken } = req.body;
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');




  // Verify reCAPTCHA
  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY,
        response: recaptchaToken
      }
    });

    const { success, 'error-codes': errorCodes } = response.data;

    if (!success) {
      return res.status(400).json({ success, errorCodes });
    }

    await sql`
      INSERT INTO persons (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})
    `;

    // Redirect to login page after successful signup
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: error.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password, recaptchaToken } = req.body;
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  // Verify reCAPTCHA
  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY,
        response: recaptchaToken
      }
    });

    const { success, 'error-codes': errorCodes } = response.data;

    if (!success) {
      return res.status(400).json({ success, errorCodes });
    }

    const user = await sql`
      SELECT * FROM persons WHERE email = ${email} AND password = ${hashedPassword}
    `;

    if (user.length === 0) {
      res.status(401).json({ message: 'Login failed' });
    } else {
      res.status(200).json({ message: 'Login successful' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
