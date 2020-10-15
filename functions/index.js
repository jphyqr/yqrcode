const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
const checkIfUserExistsByPhone = require("./check_if_user_exists_by_phone.js");
const requestOneTimePassword = require("./request_one_time_password.js");
const createUserByPhone = require("./create_user_by_phone.js");
const verifyOneTimePassword = require("./verify_one_time_password");
exports.checkIfUserExistsByPhone = functions.https.onRequest(
  checkIfUserExistsByPhone
);

exports.requestOneTimePassword = functions.https.onRequest(
  requestOneTimePassword
);

exports.createUserByPhone = functions.https.onRequest(createUserByPhone);

exports.verifyOneTimePassword = functions.https.onRequest(
  verifyOneTimePassword
);
