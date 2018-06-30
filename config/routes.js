var express = require('express')

function saveInMongo(object,res) {
    object.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Seller created!' });
    });
}

function httpDel(req, res, object) {
    object.remove({
        _id: req.params.seller_id
    }, function(err, seller) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}

function createObj(object, req, parms){
    parms.forEach(function(value){
        object[value] = req [value];
    })
    return object
}

module.exports = function (server){
    var router = express.Router();              // get an instance of the express Router
    var Seller  = require('../app/models/seller');
    var Store  = require('../app/models/store');
    var Product  = require('../app/models/product');

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
            saveInMongo(createObj(seller,req.body,["name"]),res)

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
    router.route('/sellers/:seller_id')

        .get(function(req, res) {
            Seller.find({name: req.params.seller_id}, function(err, seller) {
                if (err)
                    res.send(err);
                res.json(seller);
            });
        })
        .put(function(req, res) {
            // use our seller model to find the seller we want
            Seller.findById(req.params.seller_id, function(err, seller) {

                if (err)
                    res.send(err);
                saveInMongo(createObj(seller,req.body,["name"]),res)
            });
        })
        .delete(function(req, res) {
            httpDel(req,res,Seller)
        });

    // REGISTER OUR ROUTES -------------------------------
    // all of our routes will be prefixed with /api
    server.use('/api', router);
}