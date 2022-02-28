const Joi =require('joi');

const id= Joi.string().uuid();
const name= Joi.string().alphanum().min(3).max(15);
const age= Joi.number().integer();

const createProductDto = Joi.object({
    name: name.required(),
    age: age.required(),
});


const updateProductDto = Joi.object({
  name: name,
  age: age,
});

const getProductDto = Joi.object({
  id: id.required()
});

module.exports= { createProductDto, updateProductDto, getProductDto };
