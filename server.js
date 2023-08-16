// defined constant for paths/modules/port
const express = require('express');
const fs = require('fs');
// const readDb = require('./db/db.json');
const path = require('path');
const newNoteId = require('./helpers/newnoteid');
const PORT =  process.env.PORT || 6666;


const app = express();

// installed middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));


// GET home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// GET for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// GET for notes inside of db.js file
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});
// Writes user inputted notes to the db
app.post('/api/notes', (req, res) => {
    const { title, text} = req.body;
    console.log(req.body);
    if (title && text){
        const addNote = {
            title,
            text,
            id: newNoteId()
        };

        fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parseNote = JSON.parse(data);
                console.log(parseNote);
                parseNote.push(addNote);

                fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(parseNote), (err) =>
                    err
                    ? console.error(writeErr)
                    : console.info('Confirmed')
                );
                res.redirect(req.get('referer'));
            }
        })
    }
});

// app.delete('/db/db.json',)

// listening for connection at specified port
app.listen(PORT, () => 
    console.log(`Note App is available at http://localhost:${PORT}`)
);
