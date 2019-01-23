var express = require('express');
var router = express.Router();
var leaguesRouter = require('./leagues/leagues');
router.use('/:teamId/leagues', leaguesRouter)

// SET UP THE DATABASE
// =============================================================================
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
// const dbUri = "mongodb+srv://big_head:Password1@cluster0-vf3fb.mongodb.net/big_head?retryWrites=true";
const dbUri = "mongodb://localhost:27017/big_head";
const dbOptions = { useNewUrlParser: true };


// GET TEAMS
// =============================================================================
router.get('/', async (req, res) => {
    try {
        MongoClient.connect(dbUri, dbOptions, function (err, client) {
            if (err) {
                console.log('Error occurred while connecting to MongoDB...\n', err);
                res.status(500).send(err);
            }
            else {
                console.log('Connected to MongoDB...');
                const db = client.db("big_head");
                const collection = db.collection('teams');
                var query = { manager: req.header("X-manager") };
                collection.find(query).toArray(function (err, docs) {
                    console.log("Found the following records");
                    console.log(JSON.stringify(docs))
                    client.close();
                    res.status(200).json(docs);
                });
            }
        });

    } catch (e) {
        console.log("An unexpected error occured: " + e.toString());
        res.status(500).send(e);
    }
});

// GET TEAM
// =============================================================================
router.get('/:teamId', async (req, res) => {
    try {
        MongoClient.connect(dbUri, dbOptions, function (err, client) {
            if (err) {
                console.log('Error occurred while connecting to MongoDB...\n', err);
                res.status(500).send(err);
            }
            else {
                console.log('Connected to MongoDB...');
                const db = client.db("big_head");
                const collection = db.collection('teams');
                collection.findOne({ _id: ObjectId(req.params.teamId) }, function (err, team) {
                    if (err) {
                        console.log('Error occurred while finding the record...\n', err);
                        res.status(500).send(err);
                    }
                    console.log("Found the following records");
                    console.log(JSON.stringify(team))
                    client.close();
                    res.status(200).json(team);
                });
            }
        });

    } catch (e) {
        console.log("An unexpected error occured: " + e.toString());
        res.status(500);
        res.send(e);
    }
});

// PUT
// =============================================================================
router.put('/:teamId', async (req, res) => {
    try {
        console.log('PUT Called!!');
        MongoClient.connect(dbUri, dbOptions, function (err, client) {
            if (err) {
                console.log('Error occurred while connecting to MongoDB...\n', err);
                res.status(500).send(err);
            }
            else {
                console.log('Connected to MongoDB...');
                const collection = client.db("big_head").collection('teams');
                const team = req.body;
                team._id = ObjectId(req.params.teamId);
                console.log('Updating record: ' + team._id);
                collection.replaceOne({ _id: team._id }, team, { upsert: true }, function (err, res) {
                    if (err) {
                        console.log('Error occurred while updating the record...\n', err);
                        res.status(500).send(err);
                    }
                    console.log('Record updated: ' + team._id);
                    res.location('api/teams/').status(200).send();
                });
                client.close();
            }
        });
    } catch (e) {
        console.log("An unexpected error occured: " + e.toString());
        res.status(500).send(e);
    }
});

// POST
// =============================================================================
router.post('/', async (req, res) => {
    try {
        console.log('POST Called!!');
        MongoClient.connect(dbUri, dbOptions, function (err, client) {
            if (err) {
                console.log('Error occurred while connecting to MongoDB...\n', err);
                res.status(500).send(err);
            }
            else {
                console.log('Connected to MongoDB...');
                const collection = client.db("big_head").collection('teams');
                const team = req.body;
                console.log('Inserting record');
                const doc = collection.insertOne(team, function (err, result) {
                    if (err) {
                        console.log('Error occurred while updating the record...\n', err);
                        res.status(500).send(err);
                    }
                    console.log('Record inserted: ' + result.insertedId);
                    res.location(req.hostname + 'api/teams/' + result.insertedId).status(200).send();
                });
                client.close();
            }
        });
    } catch (e) {
        console.log("An unexpected error occured: " + e.toString());
        res.status(500).send(e);
    }
});

// DELETE
// =============================================================================
router.delete('/:teamId', async (req, res) => {
    try {
        console.log('DELETE Called!!');
        MongoClient.connect(dbUri, dbOptions, function (err, client) {
            if (err) {
                console.log('Error occurred while connecting to MongoDB...\n', err);
                res.status(500).send(err);
            }
            else {
                console.log('Connected to MongoDB...');
                const collection = client.db("big_head").collection('teams');
                teamId = ObjectId(req.params.teamId);
                console.log('Deleting record: ' + teamId);
                const doc = collection.deleteOne({ _id: teamId }, function (err, result) {
                    if (err) {
                        console.log('Error occurred while deleting the record...\n', err);
                        res.status(500).send(err);
                    }
                    console.log('Record deleted: ' + teamId);
                    res.status(200).send();
                });
                client.close();
            }
        });
    } catch (e) {
        console.log("An unexpected error occured: " + e.toString());
        res.status(500).send(e);
    }
});

module.exports = router;

