const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('welcome');
});

app.listen('3000', () => {
    console.log('server ready and listening on port 3000');
});
