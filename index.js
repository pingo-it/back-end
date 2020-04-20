const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const isAuth = require("./routes/verifyToken");
const image = require("./routes/galerie");
const sendmail = require("./routes/mail");

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
app.use("/api/galerie", image);
app.use("/api/sendmail", sendmail);
app.listen(3000, () => console.log("server up and runnig"));
