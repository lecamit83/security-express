const express = require('express');
const session = require('express-session');
const csrf = require('csurf');

const app = express();
app.use(session({
  resave: false,
  secret : 'sdadsadas',
  saveUninitialized : true
}))
app.use(csrf({cookie : true}));

// create csrf token when someone request to any routing
app.use(function(req, res, next){
  res.cookie('CSRF-TOKEN', req.csrfToken());
  next();
});

app.use(function(err, req, res, next){
  res.status(500);
  res.send('Internal Interrup!')
});
app.listen(3000, function(){
  console.log('Server is running...');
});
