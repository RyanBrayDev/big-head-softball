const express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

const app = express();
const dbUri = "mongodb+srv://big_head:Password1@cluster0-vf3fb.mongodb.net/big_head?retryWrites=true";

app.get('/api/teams', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        MongoClient.connect(dbUri, function (err, client) {
            if (err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
            }
            else {
                console.log('Connected...');
                const db = client.db("big_head");
                const collection = db.collection('teams');
                collection.find({}).toArray(function (err, docs) {
                    assert.equal(err, null);
                    console.log("Found the following records");
                    console.log(JSON.stringify(docs))
                    client.close();
                    res.status(200);
                    res.send(JSON.stringify(docs));
                });
            }
        });

    } catch (e) {
        console.log("An unexpected error occured: " + e.toString());
        res.status(500);
        res.send(e);
    }
});

app.get('/api/teams/:teamId', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        MongoClient.connect(dbUri, function (err, client) {
            if (err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
            }
            else {
                console.log('Connected...');
                const db = client.db("big_head");
                const collection = db.collection('teams');
                collection.findOne({ _id: ObjectId(req.param("teamId")) }, function (err, team) {
                    if (err) {
                        console.log('Error occurred while finding the record...\n', err);
                    }
                    assert.equal(err, null);
                    console.log("Found the following records");
                    console.log(JSON.stringify(team))
                    client.close();
                    res.status(200);
                    res.send(JSON.stringify(team));
                });
            }
        });

    } catch (e) {
        console.log("An unexpected error occured: " + e.toString());
        res.status(500);
        res.send(e);
    }
});

// app.get('/', (req, res) => {
//     res.sendFile('/dist/spectrum-deployment-dashboard/index.html', {root: '.'});
// });

app.listen(3000, () => console.log('Example app listening on port 3000!'));