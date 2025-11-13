const path = require("path");

// function to hold all our page listeners
let router = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname + "/../client/gameLibrary.html"));
    });

    app.get("/write-data", function (req, res) {
        res.sendFile(path.join(__dirname + "/../client/write-data.html"));
    });

    app.get("/view-data", function (req, res) {
        res.sendFile(path.join(__dirname + "/../client/view-data.html"));
    });
};

module.exports = router;
