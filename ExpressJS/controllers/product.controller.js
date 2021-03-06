// var db = require('../db');
const shortid = require('shortid');
var Product = require('../models/product.model');

module.exports.index = async function (req, res, next) {
    // var page = parseInt(req.query.page) || 1;
    // var perPage = 8;
    // var start = (page - 1) * perPage;
    // var end = page * perPage;
    // res.render('products/index', {
    //     products: db.get('products').value().slice(start, end)
    // });

    try {
        var products = await Product.find();
        res.render('products/index', {
            products: products
        })
    }catch (e) {
        next(e);
    }
};
