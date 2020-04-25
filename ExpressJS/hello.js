require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var db = require('./db');
const port = 3000;
var authMiddleWare = require('./middlewares/auth.middleware');
var productRoute = require('./routes/product.route');
var sessionMiddleware = require('./middlewares/session.middleware');
var csurf = require('csurf');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');
var apiProductRoute = require('./api/routers/product.route');

var mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/products', apiProductRoute);
app.use(cookieParser(process.env.SESSSION_SECRET));
app.use(sessionMiddleware);
// app.use(csurf({ cookie: true }));

app.get('/', (req, res) =>
    res.render('index', {
        name: 'HungNN'
    })
);

app.use('/users', authMiddleWare.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', authMiddleWare.requireAuth, productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleWare.requireAuth, transferRoute);

app.listen(3000, function () {
    console.log('Server is listening on port ' + port);
});
