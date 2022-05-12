const Joi =require('joi');

const id= Joi.string();
const name= Joi.string().alphanum().min(3).max(15);
const age= Joi.number().integer();
const email=Joi.string().min(3).email();
const password=Joi.string().min(3);


const createProductDto = Joi.object({
    name: name.required(),
    email: email.required(),
    password: password.required()
});


const updateProductDto = Joi.object({
  name: name,
  email: email,
  password: password
});

const getProductDto = Joi.object({
  id: id.required()
});

module.exports= { createProductDto, updateProductDto, getProductDto };
