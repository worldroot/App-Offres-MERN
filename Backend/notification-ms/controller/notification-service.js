require("dotenv").config();
const express = require("express");
const Notif = require("../models/Notif");
const router = express.Router();
const https = require("https");
const axios = require("axios");
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

var optionsAd = {
  host: "onesignal.com",
  port: 443,
  path: "/api/v1/notifications",
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: "Basic YjA0ZTEyOWItMjY3OS00ODA3LTkyMTctYTNlYzExZjQzZGIw",
  },
};

// ======== ADMIN APP =========== //
//Admin Notif: After dateFin Offre
router.post("/selected", async (req, res) => {
  const data = req.body;

  var message = {
    app_id: AdminApp,
    contents: {
      en: `Un clé vient de vous être envoyé par mail`,
    },
    include_player_ids: data.responsable.OneSignalID,
    data: { foo: "bar" },
  };

  var req = https.request(optionsAd, function (res) {
    var payload = "";
    res.on("data", function (data) {
      payload += data;
    });

    res.on("end", function () {
      payload = JSON.parse(payload);
      const notification = new Notif({
        idClient: data.responsable._id,
        idNotification: payload.id,
        title: message.contents.en,
        text: `Vous avez été sélectionné pour le dépouillement pour le ${data.dateFin}`,
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
  console.log("Notification Selected Responsable");
});

router.get("/user-email", async (req, res) => {
  try {
    const data = req.body;
    const result = await Notif.findOne({ idClient: data.email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "server error",
    });
    console.log(error);
  }
});

// ======== CLIENT APP =========== //
router.post("/toAll", async (req, res) => {
  const data = req.body;
  var message = {
    app_id: ClientApp,
    contents: { en: data.text },
    included_segments: ["Subscribed Users"],
  };

  var req = https.request(optionsAd, function (res) {
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

router.post("/welcome", async (req, res) => {
  const data = req.body;
  var message = {
    app_id: ClientApp,
    contents: {
      en: `Bienvenue ${data.nom}`,
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
        text: "Merci de votre inscription, vous pouvez maintenent ajouter une demande",
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
  console.log("Welcome Notification ");
});

router.post("/new", async (req, res) => {
  const data = req.body;

  await axios
    .get("http://localhost:5001/api/access/admin", {
      email: data.postedBy,
    })
    .then(async (ad) => {
      var message = {
        app_id: AdminApp,
        contents: {
          en: `Nouvelle soumission !`,
        },
        include_player_ids: ad.data.OneSignalID,
        data: { foo: "bar" },
      };

      console.log(ad.data);

      var req = https.request(optionsAd, function (res) {
        var payload = "";
        res.on("data", function (data) {
          payload += data;
        });

        res.on("end", function () {
          payload = JSON.parse(payload);
          const notification = new Notif({
            idClient: ad.data._id,
            idNotification: payload.id,
            title: message.contents.en,
            text: `L'appel d'offre '${data.titre}' a une nouvelle soumission`,
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
      console.log("Notification New Demande");
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json({
        error: true,
        msg: "Demande impossible !",
      });
    });
});

router.post("/demande", async (req, res) => {
  const data = req.body;
  var message = {
    app_id: ClientApp,
    contents: {
      en: `Votre soumission pour l'appel d'offre '${data.titre}' a été validée`,
    },
    include_player_ids: data.array,
    data: { foo: "bar" },
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
        idClient: data.userId,
        title: 'Confirmation de soumission',
        text: message.contents.en,
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
  console.log("Notification Published");
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
    await Notif.findByIdAndDelete(req.params.notifId);
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

router.delete("/", async (req, res) => {
  try {
    const data = req.body;
    await Notif.findOneAndDelete(data.email);
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
