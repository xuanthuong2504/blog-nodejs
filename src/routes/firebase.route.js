const express = require("express");
const router = express.Router();
const firebaseController = require("../controllers/firebase.controller");
router.get("/send-notification", firebaseController.sendNotification);
module.exports = router;
