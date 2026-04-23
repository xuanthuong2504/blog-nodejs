const express = require("express");
const router = express.Router();
const firebase = require("../controllers/firebase.controller");
router.post("/send-notification", firebase.sendNotification);
module.exports = router;
