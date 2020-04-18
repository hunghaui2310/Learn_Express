const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const shortid = require('shortid');

db.defaults({ users: []})
    .write();
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) =>
    res.render('index', {
        name: 'HungNN'
    })
);
app.get('/users', function (req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
});

app.get('/users/search', function (req, res) {
    var q = req.query.q;
    var matchUsers = users.filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchUsers
    })
});

app.get('/users/create', function (req, res) {
   res.render('users/create');
});

app.get('/users/:id', function (req, res) {
   var id = req.params.id;
   console.log(id);
   var user = db.get('users').find({ id: id }).value();
   res.render('users/view', {
       user: user
   })
});

app.post('/users/create', function (req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.listen(3000, function () {
    console.log('Server is listening on port ' + port);
});
