const e = require("express");

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyDGIqmUI0Sl72CadhkJabfnfQ3crLeUEHY",
  authDomain: "blognodejs-2a033.firebaseapp.com",
  projectId: "blognodejs-2a033",
  storageBucket: "blognodejs-2a033.firebasestorage.app",
  messagingSenderId: "1096903485848",
  appId: "1:1096903485848:web:7639331c6bbf61b7cc23ed",
  measurementId: "G-CBD4F3241Y",
});

firebase.messaging();
