require("dotenv").config();
const express = require("express");
const Notif = require("../models/Notif");
const router = express.Router();
const https = require("https");

//AdminApp: app_id: "ce9b6483-0272-4f13-8560-e6c628f65776",
// -------
//ClientApp: app_id: "10d0d189-e8bd-413a-b51b-becc098b1617",

var options = {
  host: "onesignal.com",
  port: 443,
  path: "/api/v1/notifications",
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: "Basic ZjE1NGVjOWQtYjUwNi00ZmZiLTg1YzktMGVjY2M2OTU3OGZk",
  },
};

router.post("/toAll", async (req, res) => {
  const data = req.body;
  var message = {
    app_id: "10d0d189-e8bd-413a-b51b-becc098b1617",
    contents: { en: data.text },
    included_segments: ["Subscribed Users"],
  };

  var req = https.request(options, function (res) {
    res.on("data", function (data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });

  req.on("error", function (e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(message));
  req.end();

  res.status(200).json({ etat: true, message: "Notification sent successfully" });
});

module.exports = router;
