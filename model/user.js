const mongoose = require('mongoose');

// model data user
const User = mongoose.model('User', {
    username: {type: String, required: true,},
    password: {type: String, required: true,},
    email: {type: String, required: true,},
});

const createNewUser = (value) => {
    User.create({
        username: value.username,
        password: value.password,
        email: value.email,
    })
}

const cekName = async (value) => {
    const users = await User.find();
    const cek = users.indexOf((data) => data.username == value);
    console.log(cek);
    if(cek == -1){
        return false;
    };
    return true;
}

module.exports = {User, createNewUser, cekName};