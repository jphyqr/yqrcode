const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors")({ origin: true });

module.exports = function (req, res) {
  return cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(401).json({
        message: "Not allowed",
      });
    }

    let userExists;
    //if user exists then just add user to group
    try {
      userExists = await admin
        .auth()
        .getUserByPhoneNumber(`+1${req.body.phone}`);

      return res.status(200).json({ data: userExists });
    } catch (error) {
      console.log("User does not exist, return false");
      return res.status(200).json({ data: false });
    }
  });
};
