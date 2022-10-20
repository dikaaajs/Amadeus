const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/amadeus");
const Schema = mongoose.Schema;

// model data user
const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);

const createNewUser = async (value) => {
  const user = new User({
    username: value.username,
    email: value.email,
    password: value.password,
  });

  // insert data to databases
  await user.save();
};

const cekName = async (value) => {
  const users = await User.find();
  const cek = users.indexOf((data) => data.username == value);
  console.log(cek);
  if (cek == -1) {
    return false;
  }
  return true;
};

module.exports = { User, createNewUser, cekName };
