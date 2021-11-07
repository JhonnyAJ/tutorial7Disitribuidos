'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');

let architects = [
  {
    "id": "1",
    "architect": "Abraham Silberschatz",
    "nationality": "Israelis / American",
    "birth_year": 1952,
    "fields": "Database Systems, Operating Systems",
    "books": [
      {
        "book_id": 1,
        "title": "Operating System Concepts"
      },
      {
        "book_id": 2,
        "title": "Database System Concepts"
      }
    ]
  },
  {
    "id": "2",
    "architect": "Andrew S. Tanenbaum",
    "nationality": "Dutch / American",
    "birth_year": 1944,
    "fields": "Distributed computing, Operating Systems",
    "books": [
      {
        "book_id": 3,
        "title": "Computer Networks"
      },
      {
        "book_id": 4,
        "title": "Modern Operating Systems"
      }
    ]
  }
];

const app = express.Router();

app.get('/', (req, res) => {
  res.json(architects);
})

app.get('/:id', (req, res) => {
  let architect = architects.find(i => i.id == req.params.id);
  if (architect == undefined)
    res.status(404).send('Author not found');
  else
    res.json(architect);
})

app.post('/:id', (req, res) => {
  let index = architects.findIndex(i => i.id == req.params.id);
  if (index != -1)
    res.status(404).send('Author already exits'); 
  else {
    architects.push(body);
  }
})

app.put('/', (req, res) => {
  let index = architects.findIndex(i => i.id == req.params.id);
  if (index == -1)
    res.status(404).send('Author not found');
  else {
    architects[index] = body;
  }
})

app.delete('/:id', (req, res) => {
  let index = architects.findIndex(i => i.id == req.params.id);
  if (index == -1)
    return resolve();
  else {
    architects = architects.filter(i => i.id != req.params.id);
  }
})

exp.use(bodyParser.json());
exp.use('/.netlify/functions/architect', app);

module.exports = exp;
module.exports.handler = serverless(exp);