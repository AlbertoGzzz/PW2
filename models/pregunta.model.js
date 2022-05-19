const mongoose = require('mongoose')

const Schema = mongoose.Schema

const preguntaSchema = new Schema({
  texto:  String,
  descripcion: String,
  usuario: String,
  daysAgo: Date,
})


const pregunta = mongoose.model('pregunta', preguntaSchema)
module.exports = pregunta
