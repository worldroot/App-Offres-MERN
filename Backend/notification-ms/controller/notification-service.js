require("dotenv").config();
const express = require("express");
const Notif = require("../models/Notif");
const router = express.Router();
const https = require("https");
const { verifyAccessToken } = require("../middleware/verify-token");
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
// ======== ADMIN APP =========== //
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
        title: message.contents.en,
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

  res
    .status(200)
    .json({ etat: true, message: "Notification sent successfully" });
  console.log("Notification Delivered");
});

// ======== CLIENT APP =========== //
router.post("/toAll", async (req, res) => {
  const data = req.body;
  var message = {
    app_id: ClientApp,
    contents: { en: data.text },
    included_segments: ["Subscribed Users"],
  };

  var req = https.request(options, function (res) {
    var payload = "";
    res.on("data", function (data) {
      payload += data;
    });

    res.on("end", function () {
      payload = JSON.parse(payload);
      const notification = new Notif({
        idNotification: payload.id,
        title: message.contents.en,
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

  res
    .status(200)
    .json({ etat: true, message: "Notification sent successfully" });
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
        text: message.contents.en,
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

  res
    .status(200)
    .json({ etat: true, message: "Notification sent successfully" });
  console.log("Notification Published");
});

router.post("/verif-account", async (req, res) => {
  const data = req.body;

  if (data.array.length > 0) {
    var message = {
      app_id: ClientApp,
      contents: {
        en: `Un e-mail vient de vous être envoyé`,
      },
      include_player_ids: data.array,
      data: { foo: "bar" },
    };

    var req = https.request(options, function (res) {
      var payload = "";
      res.on("data", function (data) {
        payload += data;
      });
      res.on("end", function () {
        payload = JSON.parse(payload);
        const notification = new Notif({
          idClient: data.userId,
          idNotification: payload.id,
          title: message.contents.en,
          text: "Pour finaliser votre inscription,rendez-vous dans votre boîte-mail pour activer votre compte",
          delivered: data.date,
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

    res
      .status(200)
      .json({ etat: true, message: "Notification sent successfully" });
    console.log("Notification account verification ");
  } else {
    res.status(400).json({
      error: true,
      msg: "Error array OneSignalId",
    });
  }
});

router.get("/user", verifyAccessToken, async (req, res) => {
  try {
    const data = await Notif.find({ idClient: req.user.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "server error",
    });
    console.log(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const data = await Notif.findByIdAndUpdate(
      req.body.id,
      { $set: { seen: true } },
      { new: true }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "server error",
    });
    console.log(error);
  }
});

router.delete("/:notifId", async (req, res) => {
  try {
    let results = await Notif.findByIdAndDelete(req.params.notifId);
    res.status(200).json({
      message: `Notification: deleted successfully`,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "server error",
    });
    console.log(error);
  }
});

module.exports = router;
