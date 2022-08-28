const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const {body, validationResult, check } = require('express-validator')
const port = 3000;

// connect to databases
require('./utils/db');
const {User, createNewUser, cekName} = require('./model/user');

const app = express();
app.set('view engine', 'ejs');

// built-in middleware
app.use(express.static('public')); //for set assets acess
app.use(expressLayouts); //for layouting
app.use(express.urlencoded({extended: true})) //for parser req.body

// connect to flash
app.use(cookieParser());
app.use(session({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash())

app.get('/', (req,res) => {
    res.render('index', {tittle: "Amadeus"});
})

app.get('/about', (req,res) => {
    res.send('ini adalah halaman about', {tittle: "signup"});
});

// Sign-up Handler
app.route('/signup')
    .get((req,res) => {
        res.render('signup', {tittle: 'signup'})
    })
    .post(
        [
            body('username').custom( async (value) => {
                console.log(value);
                const duplikat = await User.findOne({name: value})
                console.log(duplikat)
                if(duplikat){
                    throw new Error('username sudah digunakan');
                };
                return true;
            }),
            check('email', "masukan email yg benar").isEmail(),
            body('password', "jangan menggunakan spasi di password").custom((value) => {
                const cekStatus = value.indexOf(" ");
                if(cekStatus >= 1){
                    throw new Error('jangan menggunakan spasi didalam password')
                }
                return true;
            })
        ],
        (req,res) => {
            // handle error
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                res.render('signup',
                    {
                        tittle: "signup",
                        errors: errors.array(),
                    }
                )
            }else {
                // createNewUser(req.body);
                req.flash('msg', 'data berhasil ditambahkan')
                res.redirect('/login')
            }
        }
    )

// Login Handler
app.route('/login')
    .get((req,res) => {
        res.render('login',
        {
            tittle: 'login',
            msg: req.flash('msg')
        }
        );
    })
    .post((req,res) => {
        res.send(req.body);    
    });

// debug
app.get('/debug', async (req,res) => {
    const user = await User.find();
    res.send(user);
})

// error handler
app.use('/', (req,res) => {
    res.status(404);
    res.send('Halaman eror');
});


app.listen(port, () => {
    console.log(`app berjalan di localhost:${port}`);
});