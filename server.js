const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
global.__basedir = __dirname;

//database connection
require("./mongo");

//models
require("./model/Post");

//middleware
app.use(bodyParser.json())
   .use(morgan());

//routes
app.use("/", require("./routes/posts"));

app.listen(3001, () => {
    console.log("server is running on port no. 3001");
});