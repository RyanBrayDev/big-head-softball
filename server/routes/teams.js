
var express = require('express');
var router = express.Router();

// SET UP THE DATABASE
// =============================================================================
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
// const dbUri = "mongodb+srv://big_head:Password1@cluster0-vf3fb.mongodb.net/big_head?retryWrites=true";
const dbUri = "mongodb://localhost:27017/big_head";
const dbOptions = {useNewUrlParser: true};


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
                collection.find({}).toArray(function (err, docs) {
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
                collection.findOne({_id: ObjectId(req.param("teamId"))}, function (err, team) {
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
                const oId = ObjectId(req.params.teamId);
                const team = req.body;
                team._id = oId;
                console.log('Updating record: ' + team._id);
                collection.replaceOne({_id: team._id}, team, function (err, res) {
                    if (err) {
                        console.log('Error occurred while updating the record...\n', err);
                        res.status(500).send(err);
                    }
                });
                client.close();
                console.log('Record updated: ' + team._id);
                res.location('api/teams/' + team._id).status(200).send();
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
                team._id = ObjectId(req.params.teamId);
                console.log('Inserting record: ' + team._id);
                collection.insertOne(team, function (err, res) {
                    if (err) {
                        console.log('Error occurred while updating the record...\n', err);
                        res.status(500).send(err);
                    }
                });
                client.close();
            }
            console.log('Record updated: ' + req.params._id);
            res.location('api/teams/' + req.params.teamId).status(200).send();
        });
    } catch (e) {
        console.log("An unexpected error occured: " + e.toString());
        res.status(500).send(e);
    }
});

module.exports = router;

