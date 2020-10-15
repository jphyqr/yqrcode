const admin = require("firebase-admin");
const twilio = require("./twilio");

const cors = require("cors")({ origin: true });

module.exports = function (req, res) {
  return cors(req, res, async () => {
    if (!req.body.phone) {
      return res.status(422).send({ error: "You must provide a phone number" });
    }

    const phone = req.body.phone;
    console.log("phone", req.body.phone);
    try {
      let user = await admin.auth().getUserByPhoneNumber(phone);

      console.log({ user });
      const code = Math.floor(Math.random() * 8999 + 1000);

      await twilio.messages.create(
        {
          body: "Your code is " + code,
          to: phone,
          from: "+13064036594",
        },
        (err) => {
          if (err) {
            console.log({ err });
            return res.status(422).send(err);
          }
        }
      );
      let result = await admin
        .firestore()
        .collection("user_onetime")
        .doc(phone)
        .set({ code: code, codeValid: true });
      console.log({ result });
      res.send({ success: true });
      return res.status(200).json({ success: true });
    } catch (error) {
      console.log({ error });
      res.status(422).send({ error: error });
    }
  });
};
