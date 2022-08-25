const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const port = 3000;

// connect to databases
require('./utils/db');
const User = require('./model/user');

const app = express();
app.set('view engine', 'ejs');

// built-in middleware
app.use(express.static('public'));
app.use(expressLayouts);
app.use(express.urlencoded())

// application level middleware
app.get('/', (req,res) => {
    res.render('index');
})

app.get('/about', (req,res) => {
    res.send('ini adalah halaman about');
});

// Login Handler
app.get('/login', (req,res) => {
    res.render('login');
});

app.post('/login', (req,res) => {
    console.log('kode post jalan')
    console.log(req.body)
    res.send(req.body);
})

// Sign-up Handler
app.get('/signup', (req,res) => {
    res.render('signup');
});

app.post('/signup', (req,res) => {
    
})

// error handler
app.use('/', (req,res) => {
    res.status(404);
    res.send('Halaman eror');
});

app.listen(port, () => {
    console.log(`app berjalan di localhost:${port}`);
});