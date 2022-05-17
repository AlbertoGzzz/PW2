const Joi =require('joi');

const id= Joi.string();
const texto= Joi.string();
const usuario= Joi.string();
const pregunta= Joi.string();

const createRespuestaDto = Joi.object({
    texto: texto.required(),
    usuario: usuario.required(),
    pregunta:pregunta.required(),
});


const updateRespuestaDto = Joi.object({
  texto: texto,
  usuario: usuario,
  pregunta: pregunta,
});

const getRespuestaDto = Joi.object({
  id: id.required()
});

module.exports= { createRespuestaDto, updateRespuestaDto, getRespuestaDto };
