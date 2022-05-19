const Joi =require('joi');

const id= Joi.string();
const texto= Joi.string();
const descripcion= Joi.string();
const usuario= Joi.string();
const daysAgo= Joi.date();

const createPreguntaDto = Joi.object({
    texto: texto.required(),
    descripcion: descripcion.required(),
    usuario: usuario.required(),
    daysAgo: daysAgo.required(),
});


const updatePreguntaDto = Joi.object({
  texto: texto,
  descripcion: descripcion,
  usuario: usuario,
  daysAgo: daysAgo
});

const getPreguntaDto = Joi.object({
  id: id.required(),
});

const getPreguntaDto2 = Joi.object({
  usuario: usuario.required(),
});

module.exports= { createPreguntaDto, updatePreguntaDto, getPreguntaDto, getPreguntaDto2 };
