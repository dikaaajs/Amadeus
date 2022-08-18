const express = require('express');
const port = 3000;

const app = express();
app.set('view engine', 'ejs');

// built-in middleware
app.use(express.static('public'));

// application level middleware
app.get('/', (req,res) => {
    res.render('index');
})

app.get('/account', (req,res) => {
    res.render('account');
});

app.use('/', (req,res) => {
    res.status(404);
    res.send('Halaman eror');
});

app.listen(port, () => {
    console.log(`app berjalan di localhost:${port}`);
});