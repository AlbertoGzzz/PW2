const express = require('express');
const faker = require('faker');
const ProductService = require('../services/product.service');
const service = new ProductService();

const validatorHandler= require('./../middlewares/validator.handler');
const { createProductDto, updateProductDto, getProductDto, getProductDto2 } = require('../dtos/users.dto');

const router = express.Router();


//BUSCAR
router.get('/', async (req, res, next) => {
try {
  const { size } = req.query;
  const filter = req.body;
  const products = await service.findDB(size || 10, filter);

  if (products==0){

  res.json({
     'success': false,
     'message': "No hay ningun papu"
 });

    }else{
      res.json({
        'success': true,
        'message': "Estos son los productos encontrados",
        'Data': products,
    });
    }

} catch (error) {
  next(error);
}
});


router.post('/log', async (req, res, next) => {
  try {
    const { size } = req.query;
    const filter = req.body;
    const products = await service.findDB(size || 10, filter);

    if (products==0){

    res.json({
       'success': false,
       'message': "No hay ningun papu"
   });

      }else{
        res.json({
          'success': true,
          'message': "Estos son los productos encontrados",
          'Data': products,
      });
      }

  } catch (error) {
    next(error);
  }
  });




//CREAR
router.post('/', validatorHandler(createProductDto, 'body'), async (req, res) => {

  const { size } = req.query;
  const filter = req.body;
  const products = await service.findDB(size || 10, {name: filter.name});
  const body = req.body;


  if (products==0){

    const product= await service.createDB(body);
  res.json({
     'success': true,
     'message': "El usuario se ha creado con exito",
     'Data': product
 });
  }else{
    res.json({
      'success': false,
      'message': "Ya existe ese usuario, intente con uno nuevo"
  });
  }



});




//BUSCAR POR ID
router.get('/:id', validatorHandler(getProductDto, 'params'), async (req, res, next) => {
 try {
  const { id } = req.params;
  const product = await service.findOneDB(id);

      res.json({
          'success': true,
          'message': 'ID tiene que ser entero',
          'Data':  product
      });
 } catch (error) {
   next(error);
 }

});

/*
router.get('/login', validatorHandler(getProductDto2, 'params'), async (req, res, next) => {
  try {
   const { name, password } = req.params;
   const product = await service.loginDB(name, password);

       res.json({
           'success': true,
           'message': 'Pasele mijo',
           'Data':  product
       });
  } catch (error) {
    next(error);
  }

 });

*/


 router.get('/login', async (req, res, next) => {
  try {
    const { size } = req.query;
    const filter = req.body;
    const products = await service.loginDB(size || 10, filter);

    res.json({
       'success': true,
       'message': "PASALE",
       'Data': products,
   });
  } catch (error) {
    next(error);
  }
  });


router.delete('/:id',validatorHandler(getProductDto, 'params'), async (req, res, next) => {
  try {
   const { id } = req.params;
   console.log('Este es mi id' + id)
   const product = await service.deleteDB(id);

       res.json({
           'success': true,
           'message': 'El siguiente registro se ha eliminado correctamente',
           'Data':  product
       });
  } catch (error) {
    next(error);
  }

 });


 router.patch('/:id', validatorHandler(getProductDto, 'params'), validatorHandler(updateProductDto, 'body'), async (req, res, next) => {
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

    let products = [];
    const { size } = req.query;
    const limit = size || 10;
    for (let index = 0; index < limit; index++) {
       products.push({
           name: faker.commerce.productName(),
           price: faker.commerce.price(),
           image: faker.image.imageUrl()
       })
    }
    res.json({
       'success': true,
       'message': "Exito",
       'Data': products,
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

