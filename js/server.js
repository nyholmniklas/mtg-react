const path = require('path');
const express = require('express');


const app = express();
const indexPath = path.join(__dirname, '/../public/index.html');
const publicPath = express.static(path.join(__dirname, '../public'));

app.use('/public', publicPath);
app.get('/', function (_, res) {
    res.sendFile(indexPath);
});

const Server = require('./server.js');
const port = (process.env.PORT || 8080);
const app = Server.app();

app.listen(port);
console.log(`Listening at http://localhost:${port}`);