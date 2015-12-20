const express = require('express');
const path =  require('path');

const app = express();
const static_path = path.join(__dirname, 'dist'); 
const port = process.env.PORT || 3000;

app.use(express.static(static_path))
  .get('/', function(req, res) {
    res.sendFile('index.html', {
      root: static_path
    });
  })
  .listen(port, function(err) {
    if (err) console.log(err);
    console.log('listening on port ', port);
  });

