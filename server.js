const express = require('express');
const app = express();
const path = require("path");

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  let user = {
    // name: "John Doe",
    // email: "jonn@doe.com",
  };
  
  res.render('pages/index', {user: user});
});

app.get('/login', function(req, res) {
  res.render('pages/login', {register: false});
});

app.get('/register', function(req, res) {
  res.render('pages/login', {register: true});
});

app.get('/try-premium', function(req, res) {
  res.render('pages/try-premium');
});

// TODO: remove this route
app.get('/dashboard', function(req, res) {
  res.render('pages/dashboard');
});

app.listen(8080);
console.log('server is running on http://localhost:8080');