var mogoose = require('mongoose');

var userSchema = new mogoose.Schema({
   email: String,
   password: String,
   name: String,
   avatar: String,
   phone: String
});

var User = mogoose.model('User', userSchema, 'users');

module.exports = User;
