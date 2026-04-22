const admin = require("firebase-admin");
const serviceAccount = require("../config/blognodejs-2a033-firebase-adminsdk-fbsvc-1d5567d435.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
