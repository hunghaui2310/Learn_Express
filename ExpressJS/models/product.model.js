var mogoose = require('mongoose');

var productSchema = new mogoose.Schema({
    name: String,
    image: String,
    description: String
});

var Product = mogoose.model('Product', productSchema, 'products');

module.exports = Product;
