const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  name:  String,
  age: String
})


const product = mongoose.model('persona', productSchema)
module.exports = product
