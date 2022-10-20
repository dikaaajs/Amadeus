const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
// const { body, validationResult, check } = require("express-validator");
const port = 3000;

// databases
require("./utils/db");
const { User, createNewUser, cekName } = require("./model/user");

const app = express();
app.set("view engine", "ejs");

app.use(express.static("public")); //for set assets acess
app.use(expressLayouts); //for layouting
app.use(express.urlencoded({ extended: true })); //for parser req.body

// connect to flash
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  console.log(req.session);
  res.render("index", { tittle: "Amadeus" });
});

app.get("/about", (req, res) => {
  res.send("ini adalah halaman about", { tittle: "signup" });
});

// Sign-up Handler
app
  .route("/signup")
  .get((req, res) => {
    res.render("signup", { tittle: "signup", message: req.flash("") });
  })
  .post(async (req, res) => {
    const { username, email, password } = req.body;

    // check double email
    const user = await User.findOne({ email: req.body.email });
    const cekUsername = await User.findOne({ username: req.body.username });

    if (user !== null || cekUsername !== null) {
      return res.redirect("/signup", {
        message: req.flash("username atau password sudah digunakan"),
      });
    }
    createNewUser(req.body);
    res.redirect("/login");
  });

// Login Handler
app
  .route("/login")
  .get((req, res) => {
    res.render("login", {
      tittle: "login",
      msg: req.flash("msg"),
    });
  })
  .post((req, res) => {
    res.send(req.body);
  });

// debug
app.get("/debug", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

// error handler
app.use("/", (req, res) => {
  res.status(404);
  res.send("Halaman eror");
});

app.listen(port, () => {
  console.log(`app berjalan di localhost:${port}`);
});
