const mongoose = require('mongoose')

const Schema = mongoose.Schema

const preguntaSchema = new Schema({
  texto:  String,
  descripcion: String,
  usuario: String
})


const pregunta = mongoose.model('pregunta', preguntaSchema)
module.exports = pregunta
