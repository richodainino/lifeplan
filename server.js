const express = require('express');
const app = express();
const path = require("path");

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  let user = {
    // name: "John Doe",
    // email: "jonn@doe.com",
  };
  
  res.render('pages/index.ejs', {user: user});
});

app.get('/login', function(req, res) {
  res.render('pages/login.ejs', {register: false});
});

app.get('/register', function(req, res) {
  res.render('pages/login.ejs', {register: true});
});

app.get('/try-premium', function(req, res) {
  res.render('pages/try-premium.ejs');
});

// TODO: remove this route
app.get('/dashboard', function(req, res) {
  res.render('pages/dashboard.ejs');
});

app.listen(8080);
console.log('server is running on http://localhost:8080');
// module.exports = app;