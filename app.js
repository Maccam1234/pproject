const express = require('express');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config()
const mongodb = require('mongodb');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var username = process.env.DB_USERNAME
var password = process.env.DB_PASSWORD
var url = process.env.DB_URL

const dbConn = mongodb.MongoClient.connect(`mongodb+srv://${username}:${password}@${url}`);

app.use(express.static("public")); 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
    
app.post('/', urlencodedParser, (req, res) => {
    dbConn.then(function(db) {
      delete req.body._id; // for safety reasons
      db.db("Project").collection("test").insertOne(req.body);
    });    
    
    res.sendStatus(200);
});
    
app.listen(8080);