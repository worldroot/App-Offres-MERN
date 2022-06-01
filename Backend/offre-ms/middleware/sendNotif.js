var sendNotification = function (data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: "Basic ZjE1NGVjOWQtYjUwNi00ZmZiLTg1YzktMGVjY2M2OTU3OGZk",
  };

  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers,
  };

  var https = require("https");
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

  req.write(JSON.stringify(data));
  req.end();
};

var message = {
  app_id: "10d0d189-e8bd-413a-b51b-becc098b1617",
  contents: { en: "Nouvelles offres publiées" },
  included_segments: ["Subscribed Users"],
};

sendNotification(message);
