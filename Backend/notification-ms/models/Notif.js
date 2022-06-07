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
    default: false
  },
  delivered: {
    type: String
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
