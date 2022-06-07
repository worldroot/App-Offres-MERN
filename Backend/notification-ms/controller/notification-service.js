require("dotenv").config();
const express = require("express");
const Notif = require("../models/Notif");
const router = express.Router();
const https = require("https");
const AdminApp = "ce9b6483-0272-4f13-8560-e6c628f65776";
const ClientApp = "10d0d189-e8bd-413a-b51b-becc098b1617";

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

//Annonce from Admin to all Users
router.post("/toAll", async (req, res) => {
  const data = req.body;
  var message = {
    app_id: ClientApp,
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

  res
    .status(200)
    .json({ etat: true, message: "Notification sent successfully" });
});

//Admin Notif: After dateFin Offre
router.post("/decrypt", async (req, res) => {
  const data = req.body;
  var message = {
    app_id: AdminApp,
    contents: {
      en: `Vous pouvez faire le dépouillement de l'offre ${data.titre}`,
    },
    included_segments: ["Subscribed Users"],
    send_after: data.dateFin,
  };

  var req = https.request(options, function (res) {
    var payload = "";
    res.on("data", function (data) {
      payload += data;
      //console.log("Response:");
      //console.log(JSON.parse(data));
    });

    res.on("end", function () {
      payload = JSON.parse(payload);
      const notification = new Notif({
        idClient: data.userId,
        idNotification: payload.id,
        title: `Dépouillement offre ${data.titre}`,
        delivered: data.dateFin,
      });
      notification.save();
      return payload;
    });
  });

  req.on("error", function (e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(message));
  req.end();

  res.status(200).json({ etat: true, message: "Notification sent successfully" });
  console.log("Notification Delivered");
});

router.post("/published-offre", async (req, res) => {
    const data = req.body;
    var message = {
      app_id: ClientApp,
      contents: {
        en: `Nouvelle offre publiée`,
      },
      included_segments: ["Subscribed Users"],
    };
  
    var req = https.request(options, function (res) {
      var payload = "";
      res.on("data", function (data) {
        payload += data;
        //console.log("Response:");
        //console.log(JSON.parse(data));
      });
  
      res.on("end", function () {
        payload = JSON.parse(payload);
        const notification = new Notif({
          idNotification: payload.id,
          title: data.titre,
          delivered: data.dateDebut,
        });
        notification.save();
        return payload;
      });
    });
  
    req.on("error", function (e) {
      console.log("ERROR:");
      console.log(e);
    });
  
    req.write(JSON.stringify(message));
    req.end();
  
    res.status(200).json({ etat: true, message: "Notification sent successfully" });
    console.log("Notification Published");
  });

module.exports = router;
