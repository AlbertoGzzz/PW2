const mongoose = require('mongoose')


const Schema = mongoose.Schema

const respuestaSchema = new Schema({
  texto:  String,
  usuario: String,
  pregunta: String
})


const respuesta = mongoose.model('respuesta', respuestaSchema)
module.exports = respuesta
