const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const nodemailer = require('nodemailer');

module.exports = app => {
  app.post("/api/stripe", async (req, res) => { 
    const charge = await stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      description: "Fees for the month",
      source: req.body.token.id
    });

    console.log(charge.source.name);

    res.status(200).json({
        "Message":"Charge Successful"
    })

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: keys.myEmail,
            pass: keys.myPassword
        }
    });

    const mailOptions = {
        from: "server@sanskriti.com",
        to: charge.source.name,
        subject: "Your payment was successful!",
        text: "We successfully processed your fees payment."
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
        }
        else{
            console.log("successful");
        }
    });
  });
};
