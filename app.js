const express = require("express");
const ejs = require("ejs");
const db = require("./models/db");
const app = express();
const PORT = process.env.PORT || 3000;

const router = require("./routes");

// To recieve post requests
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// use the ejs files to render the templates
app.set("view engine","ejs");
app.set("views","./views");

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
