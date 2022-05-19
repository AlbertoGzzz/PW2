const express = require('express');
const faker = require('faker');
const PreguntaService = require('../services/pregunta.service');
const service = new PreguntaService();

const validatorHandler= require('./../middlewares/validator.handler');
const { createPreguntaDto, updatePreguntaDto, getPreguntaDto, getPreguntaDto2 } = require('../dtos/pregunta.dto');

const router = express.Router();


//BUSCAR
router.get('/', async (req, res, next) => {
try {
  const { size } = req.query;
  const filter = req.body;
  const pregunta = await service.findDB(size || 10, filter);

  res.json({
     'success': true,
     'message': "Estos son las preguntas encontradas",
     'Data': pregunta,
 });
} catch (error) {
  next(error);
}
});


//CREAR
router.post('/', validatorHandler(createPreguntaDto, 'body'), async (req, res) => {

  const body = req.body;;
  body.daysAgo = new Date().toDateString();
  const pregunta= await service.createDB(body);

  res.json({
     'success': true,
     'message': "La pregunta se ha creado con exito",
     'Data': pregunta
 });
});


//BUSCAR POR USER
  router.get('/usuario', async (req, res, next) => {
    try {
      const { size } = req.query;
      const filter = req.body;
      const pregunta = await service.findUserDB(size || 10, filter);

      res.json({
         'success': true,
         'message': "Estas son las preguntas hechas por el usuario",
         'Data': pregunta,
     });
    } catch (error) {
      next(error);
    }
    });



    //BUSCAR POR TEXTO
  router.get('/text', async (req, res, next) => {
    try {
      const { size } = req.query;
      const filter = req.body;
     // const busq = ("{texto: {$regex: /^"+ filter+ "/}}")
      const pregunta = await service.findTextDB(size || 10, filter);

      res.json({
         'success': true,
         'message': "Estas son las preguntas encontradas por la busqueda",
         'Data': pregunta,
     });
    } catch (error) {
      next(error);
    }
    });



    /*

    router.get('/usuario/:usuario', validatorHandler(getPreguntaDto2, 'params'), async (req, res, next) => {
      try {
       const { usuario } = req.params;
       const pregunta = await service.findUserDB(usuario);

           res.json({
               'success': true,
               'message': 'ID tiene que ser entero',
               'Data':  pregunta
           });
      } catch (error) {
        next(error);
      }

     });*/

//BUSCAR POR ID
router.get('/:id', validatorHandler(getPreguntaDto, 'params'), async (req, res, next) => {
 try {
  const { id } = req.params;
  const pregunta = await service.findOneDB(id);

      res.json({
          'success': true,
          'message': 'ID tiene que ser entero',
          'Data':  pregunta
      });
 } catch (error) {
   next(error);
 }

});




router.delete('/:id',validatorHandler(getPreguntaDto, 'params'), async (req, res, next) => {
  try {
   const { id } = req.params;
   console.log('Este es mi id' + id)
   const pregunta = await service.deleteDB(id);

       res.json({
           'success': true,
           'message': 'El siguiente registro se ha eliminado correctamente',
           'Data':  pregunta
       });
  } catch (error) {
    next(error);
  }

 });


 router.patch('/:id', validatorHandler(getPreguntaDto, 'params'), validatorHandler(updatePreguntaDto, 'body'), async (req, res, next) => {
  try {
   const { id } = req.params;
   const body = req.body;
  const  { old, changed }= await service.updateDB(id, body);

       res.json({
           'success': true,
           'message': 'Se ha actualizado con exito',
           'Data': {
             "Original":old,
             "Modificado": changed
           }
       });
  } catch (error) {
    next(error);
  }

 });


router.get('/', (req, res) => {
    console.log(req);

    let pregunta = [];
    const { size } = req.query;
    const limit = size || 10;
    for (let index = 0; index < limit; index++) {
      pregunta.push({
           name: faker.commerce.productName(),
           price: faker.commerce.price(),
           image: faker.image.imageUrl()
       })
    }
    res.json({
       'success': true,
       'message': "Exito",
       'Data': pregunta,
   });
});



router.get('/:id', (req, res) => {
    const validationNumber = /^[1-9]\d*$/
    let { id } = req.params;
    id = parseInt(id, 10);
    console.log(typeof id);

    if ( validationNumber.test(id) && typeof id === 'number'){
        res.json({
            'success': true,
            'message': 'Exito',
            'Data':  {
             "id": id,
             "nombre": faker.commerce.productName(),
             "precio": parseInt(faker.commerce.price(), 10)
         }
        });
    } else {
        res.json({
            'success': false,
            'message': 'ID tiene que ser entero',
            'Data':  {}
        })
    }

});

module.exports = router;

