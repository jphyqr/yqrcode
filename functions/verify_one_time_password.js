const admin = require("firebase-admin");
const twilio = require("./twilio");

const cors = require("cors")({ origin: true });

module.exports = function (req, res) {
  return cors(req, res, async () => {
    if (!req.body.phone || !req.body.code) {
      return res
        .status(422)
        .send({ error: "You must provide a phone number and code" });
    }

    let phone = String(req.body.phone).replace(/[^\d]/g, "");
    phone = `+1${phone}`;

    const code = parseInt(req.body.code);
    try {
      await admin.auth().getUserByPhoneNumber(phone);
      console.log({ phone });
      const passRef = admin.firestore().collection("user_onetime").doc(phone);
      let passDoc = await passRef.get();
      console.log({ passDoc });
      let passData = passDoc.data();
      console.log({ passData });
      if (passData.code !== code || !passData.codeValid) {
        return res.status(422).send({ error: "Code not valid" });
      }

      await passRef.update({
        codeValid: false,
      });

      let user = await admin.auth().getUserByPhoneNumber(phone);
      let token = await admin.auth().createCustomToken(user.uid);

      return res.status(200).json({ token: token });
    } catch (error) {
      console.log({ error });
      res.status(422).send({ error: error });
    }
  });
};
