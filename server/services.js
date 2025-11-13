const fs = require("fs");
const path = require("path");
const db_file = path.join(__dirname + "/files/data.txt");

let services = function (app) {
    app.post("/write-character", function (req, res) {
        let id = "lib" + Date.now();

        let characterData = {
            id: id,
            name: req.body.name,
            world: req.body.world,
            dataCenter: req.body.dataCenter,
            race: req.body.race,
            grandCompany: req.body.grandCompany,
            preferredRole: req.body.preferredRole,
            preferredClass: req.body.preferredClass,
            playstyle: req.body.playstyle,
            platform: req.body.platform,
            comment: req.body.comment
        };

        let libraryData = [];

        if (fs.existsSync(db_file)) {
            fs.readFile(db_file, "utf8", function (err, data) {
                if (err) res.send(JSON.stringify({ msg: err }));
                else {
                    libraryData = JSON.parse(data);

                    libraryData.push(characterData);

                    fs.writeFile(
                        db_file,
                        JSON.stringify(libraryData),
                        function (err) {
                            if (err)
                                res.send(
                                    JSON.stringify({ msg: `Error: ${err}` })
                                );
                            else res.send(JSON.stringify({ msg: "SUCCESS" }));
                        }
                    );
                }
            });
        } else {
            libraryData.push(characterData);
            fs.writeFile(db_file, JSON.stringify(libraryData), function (err) {
                if (err) res.send(JSON.stringify({ msg: `Error: ${err}` }));
                else res.send(JSON.stringify({ msg: "SUCCESS" }));
                console.log("File created");
            });
        }
    });

    app.get("/get-characters", function (req, res) {
        if (fs.existsSync(db_file)) {
            fs.readFile(db_file, "utf8", function (err, data) {
                if (err) res.json({ msg: err });
                else {
                    let libraryData = JSON.parse(data);
                    res.json({ msg: "SUCCESS", data: libraryData });
                }
            });
        } else {
            characterData = [];
            res.json({ msg: "SUCCESS", data: libraryData });
        }
    });
};

module.exports = services;
