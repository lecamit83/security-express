const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const app = express();

app.use(session({
  resave: false,
  secret : 'sdadsadas',
  saveUninitialized : true,
  cookie : {
    maxAge: 30000
  }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(csrf());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function(req, res){
  res.render('form', {
    csrfToken : req.csrfToken()
  });
});

app.post('/submit', function(req, res){
  res.send('/submit');
});

app.use(function(err, req, res, next){
  if(err.code !== "EBADCSRFTOKEN"){
    next(err);
    return;
  }
  res.status(403).send('CSRF error');
});
app.use(function(err, req, res, next){
  res.status(500).send('Internal Error!'); 
})
app.listen(3000, function(){
  console.log('Server is running...');
});
