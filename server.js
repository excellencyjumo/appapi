const express = require('express');
const db = require('./db/database');
const router = require('./routes');

const server = express();

server.use(express.json());
// server.use(express.urlencoded({ 
//   extended: true 
// }));


server.use(router);

server.use((req, res, next) => {
  next(new Error(`Could not handle request to ${req.url}`));
});

server.use((err, req, res, next) => {
  res.status(404).json({
    status: 404,
    message: err.toString(),
  });
});

const port = 8080;
db.connect((err) => {
  if (err) {
    console.log("could not connect to the database");
  } else {
    server.listen(port, () => {
      console.log('server running on port %s', port);
    });
  }
});