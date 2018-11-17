const mongoose = require('mongoose');

const Stat = mongoose.model('Stat', new mongoose.Schema({
  OS: { family: String, vestion: String },
  Browser: { family: String, vestion: String },
  linkHash: String
}))



exports.Stat = Stat
