const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const apiRoutes =require('./routes/api');


//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({limit:"10mb",extended:true}));

//connect to DB!
//"mongodb+srv://ala:ala@cluster0-tcu3a.mongodb.net/test?retryWrites=true&w=majority",
mongoose.connect(
  "mongodb://localhost:27017/auth",
  { useNewUrlParser: true },
  () => console.log("Connected to DB!")
);

app.use(express.json());

//import routes
app.use("/api/user", authRoute);
app.use("/api/blogs",apiRoutes);
app.use("/api/events",apiRoutes);
app.listen(3000, () => console.log("server up and runnig"));
