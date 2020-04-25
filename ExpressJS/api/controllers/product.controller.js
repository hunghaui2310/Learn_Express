// var db = require('../db');
const shortid = require('shortid');
var Product = require('../../models/product.model');

module.exports.index = async function (req, res) {
    // var page = parseInt(req.query.page) || 1;
    // var perPage = 8;
    // var start = (page - 1) * perPage;
    // var end = page * perPage;
    // res.render('products/index', {
    //     products: db.get('products').value().slice(start, end)
    // });

    var products = await Product.find();
    res.json(products);
};

module.exports.create = async function (req, res) {
    var product = Product.create(req.body);
    res.json(product);
}

