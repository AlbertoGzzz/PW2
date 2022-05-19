const express = require('express');
const faker = require('faker');
const RespuestaService = require('../services/respuesta.service');
const service = new RespuestaService();

const validatorHandler= require('./../middlewares/validator.handler');
const { createRespuestaDto, updateRespuestaDto, getRespuestaDto, getRespuestaDto2 } = require('../dtos/respuesta.dto');

const router = express.Router();


//BUSCAR
router.get('/', async (req, res, next) => {
try {
  const { size } = req.query;
  const filter = req.body;
  const respuesta = await service.findDB(size || 10, filter);

  res.json({
     'success': true,
     'message': "Estos son las respuesta encontradas",
     'Data': respuesta,
 });
} catch (error) {
  next(error);
}
});


//CREAR
router.post('/', validatorHandler(createRespuestaDto, 'body'), async (req, res, next) => {
  const body = req.body;
  const respuesta= await service.createDB(body);


  const { size } = req.query;
  const filter = req.body;
  const respuestas = await service.findResponseDB(size || 10, filter);

  res.json({
     'success': true,
     'message': "La respuesta se ha creado con exito",
     'Data': respuestas
 });


});




//BUSCAR POR ID
router.get('/:id', validatorHandler(getRespuestaDto, 'params'), async (req, res, next) => {
 try {
  const { id } = req.params;
  const respuesta = await service.findOneDB(id);

      res.json({
          'success': true,
          'message': 'ID tiene que ser entero',
          'Data':  respuesta
      });
 } catch (error) {
   next(error);
 }

});

//BUSCAR POR ID DE PREGUNTA

//BUSCAR
router.get('/', async (req, res, next) => {
  try {
    const { size } = req.query;
    const filter = req.body;
    const respuesta = await service.findResponseDB(size || 10, filter);

    res.json({
       'success': true,
       'message': "XD No se porque funciono",
       'Data': respuesta
   });
  } catch (error) {
    next(error);
  }
  });


  router.post('/preg', async (req, res, next) => {
    try {
      const { size } = req.query;
      const filter = req.body;
      const respuesta = await service.findResponseDB(size || 10, filter);

      res.json({
         'success': true,
         'message': "Estas son las respuestas de la pregunta",
         'Data': respuesta
     });
    } catch (error) {
      next(error);
    }
    });



router.delete('/:id',validatorHandler(getRespuestaDto, 'params'), async (req, res, next) => {
  try {
   const { id } = req.params;
   console.log('Este es mi id' + id)
   const respuesta = await service.deleteDB(id);

       res.json({
           'success': true,
           'message': 'El siguiente registro se ha eliminado correctamente',
           'Data':  respuesta
       });
  } catch (error) {
    next(error);
  }

 });


 router.patch('/:id', validatorHandler(getRespuestaDto, 'params'), validatorHandler(updateRespuestaDto, 'body'), async (req, res, next) => {
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

    let respuesta = [];
    const { size } = req.query;
    const limit = size || 10;
    for (let index = 0; index < limit; index++) {
      respuesta.push({
           name: faker.commerce.productName(),
           price: faker.commerce.price(),
           image: faker.image.imageUrl()
       })
    }
    res.json({
       'success': true,
       'message': "Exito",
       'Data': respuesta,
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
