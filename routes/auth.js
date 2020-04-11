const router = require("express").Router();
const User = require("../models/users");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const session = require("express-session");

dotenv.config();

router.post("/register", async (req, res) => {
  //?VALIDATE THE DATA
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //?EMAIL DOESN'T EXIST
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exists");

  //HASH THE PASSWORDS
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //CREATE A NEW USER
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    console.log(newUser);
    const savedUser = await newUser.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.satuts(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  //?VALIDATE THE DATA
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //?EMAIL DOESN'T EXIST
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email or password doesn't exists");

  //?check the password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalide password");

  //? CREATE THE TOKEN
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
});

module.exports = router;
