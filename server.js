// defined constant for paths/modules/port
const express = require('express');
const fs = require('fs');
const readDb = require('./db/db.json');
const path = require('path');
const PORT = 3333;


const app = express();

// installed middleware
app.use(express.json());
app.use(express.urlencoded({ extended: TRUE}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// listening for connection at specified port
app.listen(PORT, () => 
    console.log(`Note App is available at http://localhost.${PORT}🚀`);
);
