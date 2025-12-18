//Bring in Mongo
const { MongoClient, ObjectId } = require("mongodb");
const characterData = require("./files/data.json");
//Define Database URL
const dbURL = "mongodb://127.0.0.1";
const dbName = "charLibrary";
//Define the database server
const client = new MongoClient(dbURL);

let services = function (app) {
    app.post("/write-character", async function (req, res) {
        //1.  Bring in the data from the client
        let nameSentFromClient = req.body.name;
        let worldSentFromClient = req.body.world;
        let dataCenterSentFromClient = req.body.dataCenter;
        let raceSentFromClient = req.body.race;
        let grandCompanySentFromClient = req.body.grandCompany;
        let preferredRoleSentFromClient = req.body.preferredRole;
        let preferredClassSentFromClient = req.body.preferredClass;
        let playstyleSentFromClient = req.body.playstyle;
        let platformSentFromClient = req.body.platform;
        let commentSentFromClient = req.body.comment;

        //2. Create JSON with data to be inserted
        let newChar = {
            name: nameSentFromClient,
            world: worldSentFromClient,
            dataCenter: dataCenterSentFromClient,
            race: raceSentFromClient,
            grandCompany: grandCompanySentFromClient,
            preferredRole: preferredRoleSentFromClient,
            preferredClass: preferredClassSentFromClient,
            playstyle: playstyleSentFromClient,
            platform: platformSentFromClient,
            comment: commentSentFromClient
        };

        //3.  Connect and insert data, close database, return success or failure
        try {
            const connection = await client.connect();
            const db = connection.db(dbName);
            const collection = db.collection("characters");

            await collection.insertOne(newChar);

            await connection.close();
            return res.json({ msg: "SUCCESS" });
        } catch (err) {
            return res.json({ msg: `Error: ${err}` });
        }
    });

    app.get("/get-characters", async function (req, res) {
        //No data needed from client
        //1. Set up sort by name ascending
        const orderBy = { name: 1 };
        //2.  Connect, find data, close database, return results or error
        try {
            const connection = await client.connect();
            const db = connection.db(dbName);
            const collection = db.collection("characters");

            const chars = await collection.find().sort(orderBy).toArray();

            await connection.close();
            return res.json({ msg: "SUCCESS", data: chars });
        } catch (err) {
            return res.json({ msg: `Error: ${err}` });
        }
    });

    app.put("/update-character", async function (req, res) {
        //1.  Bring in the data from the client (see spellsTable.js, line 96 for JSON object names)
        let idSentFromClient = req.body.id;
        let nameSentFromClient = req.body.name;
        let worldSentFromClient = req.body.world;
        let dataCenterSentFromClient = req.body.dataCenter;
        let raceSentFromClient = req.body.race;
        let grandCompanySentFromClient = req.body.grandCompany;
        let preferredRoleSentFromClient = req.body.preferredRole;
        let preferredClassSentFromClient = req.body.preferredClass;
        let playstyleSentFromClient = req.body.playstyle;
        let platformSentFromClient = req.body.platform;
        let commentSentFromClient = req.body.comment;

        //2. Create JSON with the data sent
        let updatedData = {
            $set: {
                name: nameSentFromClient,
                world: worldSentFromClient,
                dataCenter: dataCenterSentFromClient,
                race: raceSentFromClient,
                grandCompany: grandCompanySentFromClient,
                preferredRole: preferredRoleSentFromClient,
                preferredClass: preferredClassSentFromClient,
                playstyle: playstyleSentFromClient,
                platform: platformSentFromClient,
                comment: commentSentFromClient
            }
        };
        //3. Convert id string to a MongoID object
        let idAsMongoObject = ObjectId.createFromHexString(idSentFromClient);
        //4. Create search with MongoID
        const search = { id: idAsMongoObject };
        //5.  Connect and update data, close database, return success or failure
        try {
            const connection = await client.connect();
            const db = connection.db(dbName);
            const collection = db.collection("characters");

            await collection.updateOne(search, updatedData);

            await connection.close();
            return res.json({ msg: "SUCCESS" });
        } catch (err) {
            return res.json({ msg: `Error: ${err}` });
        }
    });

    app.get("/get-charsByRole", async function (req, res) {
        //1.  Capture data sent from client (see line 34 in spellsTable.js for JSON object name)
        let preferredRoleValueSentFromClient = req.query.preferredRole;

        //2.  Filter by the data value sent from the client.
        //       Note: type = "", is sent when ALL is selected.
        let search =
            preferredRoleValueSentFromClient === ""
                ? {}
                : { preferredRole: preferredRoleValueSentFromClient };

        //3. Set up sort by name ascending
        const orderBy = { name: 1 };
        //4.  Connect, find data, close database, return results or error
        try {
            const connection = await client.connect();
            const db = connection.db(dbName);
            const collection = db.collection("characters");

            const chars = await collection.find(search).sort(orderBy).toArray();

            await connection.close();
            return res.json({ msg: "SUCCESS", data: chars });
        } catch (err) {
            return res.json({ msg: `Error: ${err}` });
        }
    });

    app.delete("/delete-character", async function (req, res) {
        //1.  Bring in the data from the client (see spellsTable.js, line 54 for JSON object name)
        let idSentFromClient = req.query.id;

        //2. Convert id string to a MongoID object
        let idAsMongoObject = ObjectId.createFromHexString(idSentFromClient);
        //3. Create search with MongoID
        const search = { id: idAsMongoObject };
        //4.  Connect and delete data, close database, return success or failure
        try {
            const connection = await client.connect();
            const db = connection.db(dbName);
            const collection = db.collection("characters");

            await collection.deleteOne(search);

            await connection.close();
            return res.json({ msg: "SUCCESS" });
        } catch (err) {
            return res.json({ msg: `Error: ${err}` });
        }
    });
};

var initializeDatabase = async function () {
    try {
        const conn = await client.connect();
        const db = conn.db(dbName);
        const coll = db.collection("characters");

        // Create unique index on name
        await coll.createIndex({ name: 1 }, { unique: true });

        const data = await coll.find().toArray();

        if (data.length === 0) {
            var characters = [...characterData];
            characters.reverse();
            await coll.insertMany(characters);
            console.log("Added seed records");
        }

        await conn.close();
    } catch (err) {
        console.log(err);
    }
};

module.exports = { services, initializeDatabase };
