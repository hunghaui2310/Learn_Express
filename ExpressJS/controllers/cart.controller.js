var db = require('../db');

module.exports.index = function (req, res) {
    res.render('cart/index', {
        sessions: db.get('sessions').value()
    });
};

module.exports.addToCart = function (req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/products');
        return;
    }

    var count = db.get('sessions').find({ id: sessionId }).get('cart.' + productId, 0).value();
    db.get('sessions')
        .find({ id: sessionId })
        .set('cart.' + productId, count + 1)
        .write();

    var total = 0;
    if (db.get('sessions').find({ id: sessionId }).value()['cart'] !== undefined) {
        var obj = db.get('sessions').find({ id: sessionId }).value()['cart'];
        var arr = Object.values(obj);
        for (var i = 0; i < arr.length; i++) {
            total += arr[i];
        }
    }
    db.get('sessions')
        .find({ id: sessionId })
        .set('total', total)
        .write();
    res.redirect('/products');
};
