const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const routes = require('./routes/routes.js')(app, fs);
const server = app.listen(8090, function() {
    console.log('Sistema de API ArangoDB disponivel na porta 8090');
});