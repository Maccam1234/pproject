const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongodb = require('mongodb');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const dbConn = mongodb.MongoClient.connect("mongodb+srv://superuser:superpassword@fusionpersonalproject.8jwti.mongodb.net/Project?retryWrites=true&w=majority");

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