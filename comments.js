//create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
// const db = require('./db.js');
const mongoose = require('mongoose');
const Comment = require('./comments.js');

//set up body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//set up port
const port = 3000;

//set up static file
app.use(express.static(path.join(__dirname, '../client/dist')));

//set up database
mongoose.connect('mongodb://localhost/comments', {useNewUrlParser: true, useUnifiedTopology: true});

//set up routes
app.get('/comments', (req, res) => {
  Comment.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send('Error getting comments from database');
    });
});

app.post('/comments', (req, res) => {
  Comment.create({
    name: req.body.name,
    comment: req.body.comment
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send('Error posting comment to database');
    });
});

app.delete('/comments/:id', (req, res) => {
  Comment.deleteOne({_id: req.params.id})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send('Error deleting comment from database');
    });
});

//start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});