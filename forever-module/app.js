const express = require('express');
const app = express();

app.get('/', function(req, res){
  res.send('/');
});
app.get('/crash', function(req, res){
  res.status(500);
  res.send('/crash');
  process.exit(0);
});

app.listen(3000, function(error){
  if(error) throw error;
  console.log(`Running`);
});
