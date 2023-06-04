const express = require('express');
const fs = require('fs');
const readDb = require('./db/db.json');
const PORT = 3333;


const app = express();

app.listen(PORT, () => 
    console.log(`Note App is available at http://localhost.${PORT}🚀`);
);
