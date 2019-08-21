var express = require('express');
var router = express.Router();
var leaguesRouter = require('./leagues');
router.use('/:teamId/leagues', leaguesRouter)
const teamService = require('../services/teamService');

/**
 * @swagger
 * /teams:
 *    get:
 *      description: This should return all teams
 *      parameters:
 *      - in: query
 *        name: manager
 *        schema:
 *          type: string
 *        description: The manager's name
 *      responses:
 *        200:
 *          description: OK
 *        404:
 *          description: Not Found
 */
router.get('/', (req, res) => teamService.getTeams(req, res));

/**
 * @swagger
 * /team/{teamId}:
 *    get:
 *      description: This should return the specified team
 *      parameters:
 *      - in: path
 *        name: teamId
 *        schema:
 *          type: string
 *        description: The id of the team
 *      responses:
 *        200:
 *          description: OK
 *        404:
 *          description: Not Found
 */
router.get('/:teamId', (req, res) => teamService.getTeam(req, res));

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

