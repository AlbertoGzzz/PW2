const Joi =require('joi');

const id= Joi.string();
const texto= Joi.string();

const createRespuestaDto = Joi.object({
    texto: texto.required()
});


const updateRespuestaDto = Joi.object({
  texto: texto
});

const getRespuestaDto = Joi.object({
  id: id.required()
});

module.exports= { createRespuestaDto, updateRespuestaDto, getRespuestaDto };
