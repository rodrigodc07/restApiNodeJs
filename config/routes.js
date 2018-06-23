const express = require('express')

module.exports = function (server){
var router = express.Router();              // get an instance of the express Router
var Seller  = require('../app/models/seller');


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

// on routes that end in /sellers
// ----------------------------------------------------
router.route('/sellers')

    // create a seller (accessed at POST http://localhost:8080/api/sellers)
    .post(function(req, res) {

        var seller = new Seller();      // create a new instance of the Seller model
        seller.name = req.body.name;  // set the sellers name (comes from the request)

        // save the seller and check for errors
        seller.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Seller created!' });
        });

    })  
    .get(function(req, res) {
        Seller.find(function(err, sellers) {
            if (err)
                res.send(err);

            res.json(sellers);
        });
    })

    // on routes that end in /sellers/:seller_id
    // ----------------------------------------------------
    router.route('/sellers/:seller_name')

        // get the seller with that id (accessed at GET http://localhost:8080/api/sellers/:seller_id)
        .get(function(req, res) {
            Seller.find({name: req.params.seller_name}, function(err, seller) {
                if (err)
                    res.send(err);
                res.json(seller);
            });
        })
            // update the seller with this id (accessed at PUT http://localhost:8080/api/sellers/:seller_id)
        .put(function(req, res) {
            // use our seller model to find the seller we want
            Seller.findById(req.params.seller_name, function(err, seller) {

                if (err)
                    res.send(err);

                seller.name = req.body.name;  // update the sellers info

                // save the seller
                seller.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Seller updated!' });
                });

            });
        })
        .delete(function(req, res) {
            Seller.remove({
                _id: req.params.seller_name
            }, function(err, seller) {
                if (err)
                    res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });

    // REGISTER OUR ROUTES -------------------------------
    // all of our routes will be prefixed with /api
    server.use('/api', router);
}