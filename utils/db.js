// connect to database
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/amadeus");

// check koneksi ke databases
const db = mongoose.connection;
db.on("error", () => {
  console.log("gagal menyambungkan ke databases !");
});
db.once("open", () => {
  console.log("berhasil terhubung ke databases !");
});
