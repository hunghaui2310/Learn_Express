const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var db = require('./db');
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var authMiddleWare = require('./middlewares/auth.middleware');

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) =>
    res.render('index', {
        name: 'HungNN'
    })
);

app.use('/users', authMiddleWare.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(3000, function () {
    console.log('Server is listening on port ' + port);
});
