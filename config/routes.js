var express = require('express');

function saveInMongo(object,res) {
    object.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'ID = ' + object.id });
    });
}

function httpDel(object, id, res) {
    object.remove({
        _id: id
    }, function(err, seller) {
        if(seller == null)
            res.json({ message: "Id Invalido" });
        else if (err)
            res.send(err);
        else
            res.json({ message: 'Successfully deleted' });
    });
}

function createObj(object, req){
    object.schema.eachPath(function(path) {
        if((!(path.toString().includes("_"))) && ((req[path])))
            object[path] = req [path];
    });
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
            saveInMongo(createObj(seller,req.body),res)

        })
        .get(function(req, res) {
            Seller.find(function(err, sellers) {
                if (err)
                    res.send(err);

                res.json(sellers);
            });
        });

    // on routes that end in /sellers/:seller_id
    // ----------------------------------------------------
    router.route('/sellers/:id')

        .get(function(req, res) {
            Seller.find({_id: req.params.id}, function(err, seller) {
                if (err)
                    res.send(err);
                res.json(seller);
            });
        })
        .put(function(req, res) {
            // use our seller model to find the seller we want
            Seller.findById(req.params.id, function(err, seller) {
                if (seller == null)
                    res.send("Id Invalido");
                else
                    saveInMongo(createObj(seller,req.body),res)
            });
        })
        .delete(function(req, res) {
            httpDel(Seller,req.params.id,res)
        });
    router.route('/products')

    // create a product (accessed at POST http://localhost:8080/api/products)
        .post(function(req, res) {

            var product = new Product();      // create a new instance of the Product model
            saveInMongo(createObj(product,req.body),res)

        })
        .get(function(req, res) {
            Product.find(function(err, products) {
                if (err)
                    res.send(err);

                res.json(products);
            });
        });

    // on routes that end in /products/:product_id
    // ----------------------------------------------------
    router.route('/products/:id')

        .get(function(req, res) {
            Product.find({_id: req.params.id}, function(err, product) {
                if (err)
                    res.send(err);
                res.json(product);
            });
        })
        .put(function(req, res) {
            // use our product model to find the product we want
            Product.findById(req.params.id, function(err, product) {
                if (product == null)
                    res.send("Id Invalido");
                else
                    saveInMongo(createObj(product,req.body),res)
            });
        })
        .delete(function(req, res) {
            httpDel(Product,req.params.id,res);
            Store.find({ name: 'john'}, function (err, docs) {return docs});
        });

    router.route('/stores')

    // create a store (accessed at POST http://localhost:8080/api/stores)
        .post(function(req, res) {

            var store = new Store();      // create a new instance of the Store model
            saveInMongo(createObj(store,req.body),res)

        })
        .get(function(req, res) {
            Store.find(function(err, stores) {
                if (err)
                    res.send(err);

                res.json(stores);
            });
        });

    // on routes that end in /stores/:store_id
    // ----------------------------------------------------
    router.route('/stores/:id')

        .get(function(req, res) {
            Store.find({_id: req.params.id}, function(err, store) {
                if (err)
                    res.send(err);
                res.json(store);
            });
        })
        .put(function(req, res) {
            // use our store model to find the store we want
            Store.findById(req.params.id, function(err, store) {
                if (store == null)
                    res.send("Id Invalido");
                else
                    saveInMongo(createObj(store,req.body),res)
            });
        })
        .delete(function(req, res) {
            httpDel(Store,req.params.id,res)
        });

    // REGISTER OUR ROUTES -------------------------------
    // all of our routes will be prefixed with /api
    server.use('/api', router);
};