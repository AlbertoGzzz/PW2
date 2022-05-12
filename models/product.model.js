const { string } = require('joi')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  name:  String,
  email: String,
  password: String
})


const product = mongoose.model('persona', productSchema)
module.exports = product
