require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

app.post('/reserve', async (req, res) => {
    try {
        const { name, email, phone, date, time, guests } = req.body;
        const result = await pool.query(
            'INSERT INTO reservations (name, email, phone, date, time, guests) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, email, phone, date, time, guests]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/reservations', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reservations');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
