const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const MongoClient = require('mongodb').MongoClient;

app.prepare().then(() => {
  const server = express();
  MongoClient.connect('mongodb://localhost:27017/performance', function(err, client) {
    if (err) throw err

    const db = client.db('performance');

    server.get('/v1/private/fetch-employee-data', (req, res) => {
      db.collection('employees').find().toArray(function(err, result) {
        if (err) throw err;

        console.log(result);
      });
      return app.render(req, res, '/v1/private/fetch-employee-data', req.query);
    })

    server.get('/b', (req, res) => {
      return app.render(req, res, '/b', req.query);
    })

    server.get('/posts/:id', (req, res) => {
      return app.render(req, res, '/posts', { id: req.params.id });
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
