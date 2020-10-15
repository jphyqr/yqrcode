const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("./twilio");

const cors = require("cors")({ origin: true });

module.exports = function (req, res) {
  return cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(401).json({
        message: "Not allowed",
      });
    }

    if (req.body.phone.length !== 10) {
      res.status(422).send({ error: "10 digit number required" });
    }

    //phone number comes in, clean it up
    let phone = String(req.body.phone).replace(/[^\d]/g, "");
    phone = `+1${phone}`;
    console.log("phone", phone);
    try {
      let user = await admin.auth().getUserByPhoneNumber(phone);

      console.log({ user });
      return res.status(200).json({ data: user });
    } catch (error) {
      let newUser = {};
      console.log("User doesnt exist, create new user", error);
      try {
        newUser = await admin.auth().createUser({
          // email: "user@example.com",
          emailVerified: false,
          phoneNumber: phone,
          displayName:
            phone.substr(2, 3) + "****" + phone.substr(9, phone.length),

          disabled: false,
        });

        let newUserRecord = {
          freeAgent: true,
          PhoneNumber: true,
          displayName:
            phone.substr(2, 3) + "****" + phone.substr(9, phone.length),

          createdAt: Date.now(),
        };

        //CREATE USER RECORD
        await admin
          .firestore()
          .collection("users")
          .doc(newUser.uid)
          .set(newUserRecord);
      } catch (err) {
        console.log({ err });
        res.status(422).send({ error: err });
      }
      return res.status(200).json({ data: newUser });
    }
  });
};
