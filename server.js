const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to your background MySQL Engine
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'YOUR_PASSWORD_HERE', // 🌟 Put your MySQL root password here
    database: 'auth_demo'
});

db.connect(err => {
    if (err) console.error('Database connection failed: ' + err.stack);
    else console.log('Successfully connected to MySQL background engine.');
});

// 2. CREATE: Sign Up a new user
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(400).json({ message: 'Username already exists!' });
        res.json({ message: 'Account created successfully!' });
    });
});

// 3. READ: Check credentials during Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (results.length > 0) {
            res.json({ message: 'Login successful!', user: results[0].username });
        } else {
            res.status(401).json({ message: 'Invalid username or password.' });
        }
    });
});

// 4. DELETE: Vaporize an account from the vault
app.post('/api/delete-account', (req, res) => {
    const { username } = req.body;
    const sql = 'DELETE FROM users WHERE username = ?';
    db.query(sql, [username], (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.json({ message: 'Account successfully deleted.' });
    });
});

app.listen(3000, () => console.log('Backend server running on http://localhost:3000'));