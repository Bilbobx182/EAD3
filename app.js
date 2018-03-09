var express = require("express");
var http = require('http');
var massive = require("massive");

// var graphqlHTTP = require('express-graphql');
// var graphql  = require('graphql');


var app = express();

massive({
    host: '127.0.0.1',
    port: 5432,
    database: 'dellstore2',
    user: 'CiaranLaptop',
    password: 'postgres'
}).then(db => {

    app.set('db', db);
    http.createServer(app).listen(8080);
    setupEndPoints();

});

function setupEndPoints() {
    // Root Page
    setRootPage();
}

function setRootPage() {
    app.get('/', (req, res) => {
        res.send('<h1>This is Ciarans root node!</h1>');
    });
}

app.get('/customernames/:id', (req, res) => {
    db = app.get('db');
    const searchID = req.params.id;
    console.log(searchID);
    var queryString = 'select * from postgraphile.customers where customerid = ';

    db.query(queryString + searchID,
        {something: 1}
    ).then(tests => {
        res.send(tests);
    });
});


