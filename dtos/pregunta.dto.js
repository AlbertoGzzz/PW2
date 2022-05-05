const Joi =require('joi');

const id= Joi.string();
const texto= Joi.string();
const descripcion= Joi.string();

const createPreguntaDto = Joi.object({
    texto: texto.required(),
    descripcion: descripcion.required(),
});


const updatePreguntaDto = Joi.object({
  texto: texto,
  descripcion: descripcion,
});

const getPreguntaDto = Joi.object({
  id: id.required()
});

module.exports= { createPreguntaDto, updatePreguntaDto, getPreguntaDto };
