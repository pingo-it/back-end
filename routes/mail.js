const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const router = require("express").Router();

dotenv.config();
const sendMail = (user, callback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: `"ala bouziri", "alabouziri2000@gmail.com"`,
    to: `${user.email}`,
    subject: "Confirmation",
    html: `<h1>it's work</h1><br>,`,
  };
  transporter.sendMail(mailOptions, callback);
};
router.post("/:id", (req, res) => {
  console.log("request came");
  sendMail(order, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent");
      res.status(200).json({ message: info });
    }
  });
});

module.exports = router;
