'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');

let buildings = [
{
  "id": "1",
  "title": "Empire State",
  "edition": "9th",
  "copyright": 2012,
  "language": "ENGLISH",
  "pages": 976,
  "architect": "Abraham Silberschatz",
  "architect_id": 1,
  "city": "John Wiley & Sons",
  "city_id": 1
},
{
  "id": "2",
  "title": "Banco Nacional",
  "edition": "6th",
  "copyright": 2010,
  "language": "ENGLISH",
  "pages": 1376,
  "architect": "Abraham Silberschatz",
  "architect_id": 1,
  "city": "John Wiley & Sons",
  "city_id": 1
},
{
  "id": "3",
  "title": "Washington",
  "edition": "5th",
  "copyright": 2010,
  "language": "ENGLISH",
  "pages": 960,
  "architect": "Andrew S. Tanenbaum",
  "architect_id": 2,
  "city": "Pearson Education",
  "city_id": 2
},
{
  "id": "4",
  "title": "Edificio 1",
  "edition": "4th",
  "copyright": 2014,
  "language": "ENGLISH",
  "pages": 1136,
  "architect": "Andrew S. Tanenbaum",
  "architect_id": 2,
  "city": "Pearson Education",
  "city_id": 2
}
];

const app = express.Router();

app.get('/', (req, res) => {
  res.json(buildings);
});

app.get('/:id', (req, res) => {
  let building = buildings.find(i => i.id == req.params.id);
  if (building == undefined)
    res.status(404).send('Building not found');
  else
    res.json(building);
});

app.post('/:id', (req, res) => {
  let index = buildings.findIndex(i => i.id == req.params.id);
  if (index != -1)
    res.status(404).send('Building already exits'); 
  else {
    buildings.push(body);
  }
});

app.put('/', (req, res) => {
  let index = buildings.findIndex(i => i.id == req.params.id);
  if (index == -1)
    res.status(404).send('Building not found');
  else {
    buildings[index] = body;
  }
});

app.delete('/:id', (req, res) => {
  let index = buildings.findIndex(i => i.id == req.params.id);
  if (index == -1)
    return resolve();
  else {
    buildings = buildings.filter(i => i.id != req.params.id);
  }
});

exp.use(bodyParser.json());
exp.use('/.netlify/functions/building', app);

module.exports = exp;
module.exports.handler = serverless(exp);