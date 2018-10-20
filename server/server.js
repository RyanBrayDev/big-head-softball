// SET UP THE SERVER
// =============================================================================
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;
var router = express.Router();

// SET UP THE DATABASE
// =============================================================================
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const dbUri = "mongodb+srv://big_head:Password1@cluster0-vf3fb.mongodb.net/big_head?retryWrites=true";
const dbOptions = {useNewUrlParser: true};


// INTERCEPT ALL ROUTES
// =============================================================================
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    // do logging
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Processing request: ' + req.originalUrl + ' from: ') + req.ip;
    next(); // make sure we go to the next routes and don't stop here
});


// GET
// =============================================================================
router.get('/', function (req, res) {
    res.json({message: 'Big Head Softball API. All rights reserved.'});
});

// GET TEAMS
// =============================================================================
router.get('/teams', async (req, res) => {
    try {
        MongoClient.connect(dbUri, dbOptions, function (err, client) {
            if (err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
                res.send(err);
            }
            else {
                console.log('Connected...');
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
        res.status(500);
        res.send(e);
    }
});

// GET TEAM
// =============================================================================
router.get('/teams/:teamId', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        MongoClient.connect(dbUri, dbOptions, function (err, client) {
            if (err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
                res.send(err);
            }
            else {
                console.log('Connected...');
                const db = client.db("big_head");
                const collection = db.collection('teams');
                collection.findOne({_id: ObjectId(req.param("teamId"))}, function (err, team) {
                    if (err) {
                        console.log('Error occurred while finding the record...\n', err);
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
router.put('/teams/:teamId', async (req, res) => {
    try {
        console.log('PUT Called!!');
        let updatedTeam = null;
        MongoClient.connect(dbUri, dbOptions, function (err, client) {
            if (err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
            }
            else {
                console.log('Connected...');
                const collection = client.db("big_head").collection('teams');
                const team = req.body;
                team._id = ObjectId(req.params.teamId);
                console.log('Updating record: ' + team._id);
                collection.replaceOne({_id: ObjectId(req.params.teamId)}, team, function (err, res) {
                    if (err) {
                        console.log('Error occurred while updating the record...\n', err);
                        res.send(err);
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

app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port, () => console.log('Big Head Softball API ready on port ' + port));
