const Joi = require('joi');
const mongoose = require('mongoose');

const Link = mongoose.model('Link', new mongoose.Schema({
  URL: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 2048
  },
  shortHash: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 6
  },
  clickCounter: {
    type: Number,
    default: 0
  }
}))

function generateHash() {
    const minInt = 14776336
    const maxInt = 525649985
    const randomInt = Math.floor(Math.random() * (maxInt - minInt)) + minInt
    return randomInt.toString(36)
}

// function validateCustomer(customer) {
//   const schema = {
//     name: Joi.string().min(5).max(50).required(),
//     phone: Joi.string().min(5).max(50).required(),
//     isGold: Joi.boolean()
//   };

//   return Joi.validate(customer, schema);
// }

exports.Link = Link
exports.generateHash = generateHash


// exports.validate = validateCustomer;