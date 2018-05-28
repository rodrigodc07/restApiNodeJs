const express = require('express')

module.exports = function (server){
var router = express.Router();              // get an instance of the express Router
var Bear  = require('../app/models/bear');


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

    })  
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    })

    // on routes that end in /bears/:bear_id
    // ----------------------------------------------------
    router.route('/bears/:bear_name')

        // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
        .get(function(req, res) {
            Bear.find({name: req.params.bear_name}, function(err, bear) {
                if (err)
                    res.send(err);
                res.json(bear);
            });
        })
            // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
        .put(function(req, res) {
            // use our bear model to find the bear we want
            Bear.findById(req.params.bear_name, function(err, bear) {

                if (err)
                    res.send(err);

                bear.name = req.body.name;  // update the bears info

                // save the bear
                bear.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Bear updated!' });
                });

            });
        })
        .delete(function(req, res) {
            Bear.remove({
                _id: req.params.bear_name
            }, function(err, bear) {
                if (err)
                    res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });

    // REGISTER OUR ROUTES -------------------------------
    // all of our routes will be prefixed with /api
    server.use('/api', router);
}