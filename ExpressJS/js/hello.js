const express = require('express');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', '../views');

var users = [
    { id: 1, name: 'Hung Nguyen' },
    { id: 2, name: 'Lam Ga' }
    ];

app.get('/', (req, res) =>
    res.render('index', {
        name: 'HungNN'
    })
);
app.get('/users', function (req, res) {
    res.render('users/index', {
        users: users
    });
});

app.get('/users/search', function (req, res) {
    var q = req.query.q;
    var matchUsers = users.filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    res.render('users/index', {
        users: matchUsers
    })
});
app.listen(3000, function () {
    console.log('Server is listening on port ' + port);
});
