const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: '192.168.100.5',
    user: 'microservice',
    password: 'password',
    database: 'College'
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL (Students DB)");
});

app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Student Microservice running on port ${port}`);
});
