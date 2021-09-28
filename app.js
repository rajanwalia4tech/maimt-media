const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("./config/passport-local-strategy");
const expressLayouts = require("express-ejs-layouts");
const multer = require("multer");
const fs = require("fs").promises;
const router = require("./routes");
const db = require("./models/db");
const PORT = process.env.PORT || 3000;

const app = express();

// To recieve post requests
app.use(express.urlencoded({extended:true}));
app.use(express.json());  

// public file serving
app.use("/public",express.static(__dirname+ '/public'));
app.use("/",express.static(__dirname+ '/public'));

// use express layouts
app.use(expressLayouts);

// express styles and subpages from subpages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use the ejs files to render the templates
app.set("view engine","ejs");
app.set("views","./views");

// use sessions 
app.use(session({
  secret:"This is a secret string",
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge: 1000*60*60*24
  }
}));

app.use(passport.initialize());
app.use(passport.session()); 

// set authentication if user is authenticated
app.use(passport.setAuthenticatedUser);

// use the router/index.js file to route to other routes
app.use("/",router);

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error(new Error('Could not start database'))
    console.error(err)
  })
