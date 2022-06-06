const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  idClient: {
    type: String,
  },
  idNotification: {
    type: String,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  seen: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
