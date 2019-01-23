
var express = require('express');
var router = express.Router({ mergeParams: true })

// SET UP THE DATABASE
// =============================================================================
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
// const dbUri = "mongodb+srv://big_head:Password1@cluster0-vf3fb.mongodb.net/big_head?retryWrites=true";
const dbUri = "mongodb://localhost:27017/big_head";
const dbOptions = { useNewUrlParser: true };


// GET LEAGUES
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
                collection.findOne({ _id: ObjectId(req.param("teamId")) }, function (err, team) {
                    if (err) {
                        console.log('Error occurred while finding the record...\n', err);
                        res.status(500).send(err);
                    }
                    console.log("Found the following records");
                    console.log(JSON.stringify(team))
                    client.close();
                    res.status(200).json(team.leagues);
                });
            }
        });

    } catch (e) {
        console.log("An unexpected error occured: " + e.toString());
        res.status(500).send(e);
    }
});

// GET League
// =============================================================================
router.get('/:leagueId', async (req, res) => {
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
                collection.findOne({ _id: ObjectId(req.param("teamId")) }, function (err, team) {
                    if (err) {
                        console.log('Error occurred while finding the record...\n', err);
                        res.status(500).send(err);
                    }
                    console.log("Found the following records");
                    console.log(JSON.stringify(team))
                    client.close();
                    res.status(200).json(team.leagues.find(league => league.id == req.param("leagueId")));
                });
            }
        });

    } catch (e) {
        console.log("An unexpected error occured: " + e.toString());
        res.status(500);
        res.send(e);
    }
});

// PUT LEAGUE
// =============================================================================
router.put('/:leagueId', async (req, res) => {
    try {
        console.log('PUT LEAGUE Called!!');
        MongoClient.connect(dbUri, dbOptions, function (err, client) {
            if (err) {
                console.log('Error occurred while connecting to MongoDB...\n', err);
                res.status(500).send(err);
            }
            else {
                console.log('Connected to MongoDB...');
                const collection = client.db("big_head").collection('teams');
                collection.findOne({ _id: ObjectId(req.params.teamId) }, function (err, team) {
                    if (err) {
                        console.log('Error occurred while finding the record...\n', err);
                        res.status(500).send(err);
                    }
                    console.log("Found the following records");
                    console.log(JSON.stringify(team));
                    const newLeague = req.body;
                    team.leagues.filter(league => league.id != req.params.leagueId).push(newLeague);
                    console.log('Updating record: ' + team._id);
                    collection.replaceOne({ _id: team._id }, team, { upsert: true }, function (err, res) {
                        if (err) {
                            console.log('Error occurred while updating the record...\n', err);
                            res.status(500).send(err);
                        }
                    });
                });
                client.close();
                console.log('Record updated: ' + newLeague.id);
                res.location('api/teams/' + team._id).status(200).send();
            }
        });
    } catch (e) {
        console.log("An unexpected error occured: " + e.toString());
        res.status(500).send(e);
    }
});

// POST LEAGUE
// =============================================================================
router.post('/', async (req, res) => {
    try {
        console.log('POST LEAGUE Called!!');
        MongoClient.connect(dbUri, dbOptions, function (err, client) {
            if (err) {
                console.log('Error occurred while connecting to MongoDB...\n', err);
                res.status(500).send(err);
            }
            else {
                console.log('Connected to MongoDB...');
                const collection = client.db("big_head").collection('teams');
                collection.findOne({ _id: ObjectId(req.params.teamId) }, function (err, team) {
                    if (err) {
                        const league = req.body;
                        console.log('Error occurred while finding the record...\n', err);
                        res.status(500).send(err);
                    }
                    console.log('Inserting record: ' + teamId);
                    collection.insertOne(team, function (err, res) {
                        if (err) {
                            console.log('Error occurred while updating the record...\n', err);
                            res.status(500).send(err);
                        }
                    });
                    client.close();
                    console.log('Record updated: ' + req.params._id);
                    res.location('api/teams/' + req.params.teamId).status(200).send();
                });
            }
        });
    } catch (e) {
        console.log("An unexpected error occured: " + e.toString());
        res.status(500).send(e);
    }
});

module.exports = router;

