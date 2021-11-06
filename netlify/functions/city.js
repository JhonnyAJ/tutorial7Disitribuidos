'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');

let cities = [
  {
    "id": "1",
    "city": "John Wiley & Sons",
    "country": "United States",
    "founded": 1807,
    "genere": "Academic",
    "buildings": [
      {
        "building_id": 1,
        "title": "Operating System Concepts"
      },
      {
        "building_id": 2,
        "title": "Database System Concepts"
      }
    ]
  },
  {
    "id": "2",
    "city": "Pearson Education",
    "country": "United Kingdom",
    "founded": 1844,
    "genere": "Education",
    "buildings": [
      {
        "building_id": 3,
        "title": "Computer Networks"
      },
      {
        "building_id": 4,
        "title": "Modern Operating Systems"
      }
    ]
  }
];

const app = express.Router();

app.get('/', (req, res) => {
  res.json(cities);
})

app.get('/:id', (req, res) => {
  let city = cities.find(i => i.id == req.params.id);
  if (city == undefined)
    res.status(404).send('City not found');
  else
    res.json(city);
})

app.post('/:id', (req, res) => {
  let index = cities.findIndex(i => i.id == req.params.id);
  if (index != -1)
    res.status(404).send('City already exits');
  else {
    cities.push(body);
    saveCities();
  }
})

app.put('/', (req, res) => {
  let index = cities.findIndex(i => i.id == req.params.id);
  if (index == -1)
    res.status(404).send('City not found');
  else {
    cities[index] = body;
    saveCities();
  }
})

app.delete('/:id', (req, res) => {
  let index = cities.findIndex(i => i.id == req.params.id);
  if (index == -1)
    return resolve();
  else {
    cities = cities.filter(i => i.id != req.params.id);
    saveCities();
  }
})

exp.use(bodyParser.json());
exp.use('/.netlify/functions/city', app);

module.exports = exp;
module.exports.handler = serverless(exp);