const PORT = 3000
const HOST = 'localhost'
const STATIC_PATH = '../client'

const path = require('path');
const express = require('express');
const app = express();

app.use('/', express.static(path.join(__dirname, STATIC_PATH)));

app.listen(PORT, HOST, () => {
    console.log(`Successfully started at: ${HOST}:${PORT}`);
});
