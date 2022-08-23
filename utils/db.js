const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/dataLogin');

const User = mongoose.model('User', {
    username: {type: String, required: true,},
    password: {type: String, required: true,},
    email: {type: String, required: true,},
});

const createUser = new User({
    username: 'Andika',
    password: 'adachikawai',
    email: 'zoneandika@gmail.com',
});

createUser.save().then((user) => console.log(user));