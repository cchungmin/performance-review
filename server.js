const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser());

  MongoClient.connect('mongodb://localhost:27017/performance', function(err, client) {
    if (err) throw err

    const db = client.db('performance');

    server.get('/v1/api/fetch-employees', async (req, res) => {
      await db.collection('employees').find().toArray(function(err, result) {
        if (err) throw err;
        return res.json(result);
      });
    })

    server.post('/v1/api/add-employee', async (req, res) => {
      const item = req.body;
      await db.collection('employees').insert(item);
      await db.collection('employees').find().toArray(function(err, result) {
        if (err) throw err;
        return res.json(result);
      });
    })

    server.post('/v1/api/update-employee', async (req, res) => {
      const item = req.body;
      await db.collection('employees').updateOne(
        { _id: ObjectID(item._id) },
        {
          $set: {
            surname: item.surname,
            forename: item.forename,
            admin: item.admin,
            startDate: item.startDate,
            position: item.position,
            department: item.department,
          }
        },
        { upsert: true },
      );
      await db.collection('employees').find().toArray(function(err, result) {
        if (err) throw err;
        return res.json(result);
      });
    })

    server.post('/v1/api/delete-employee', async (req, res) => {
      const item = req.body;
      await db.collection('employees').remove({ _id: ObjectID(item._id) });
      await db.collection('employees').find().toArray(function(err, result) {
        if (err) throw err;
        return res.json(result);
      });
    })

    server.get('*', (req, res) => {
      return handle(req, res);
    })

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    })
  })
})
