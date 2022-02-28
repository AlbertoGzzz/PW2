const express = require('express');
const faker = require('faker');
const ProductService = require('../services/product.service');
const service = new ProductService();
const router = express.Router();


//BUSCAR
router.get('/', (req, res, next) => {
try {
  const { size } = req.query;
  const products = new service.find(size || 10)

  res.json({
     'success': true,
     'message': "Estos son los productos encontrados",
     'Data': products,
 });
} catch (error) {
  next(error);
}
});


//CREAR
router.post('/', (req, res) => {
  const body = req.body;
  const product= service.create(body);

  res.json({
     'success': true,
     'message': "El producto se ha creado con exito",
     'Data': product,
 });
});




//BUSCAR POR ID
router.get('/:id', (req, res, next) => {
 try {
  const { id } = req.params;
  const product = service.findOne(id);

      res.json({
          'success': false,
          'message': 'ID tiene que ser entero',
          'Data':  product
      });
 } catch (error) {
   next(error);
 }

});




router.delete('/:id', (req, res, next) => {
  try {
   const { id } = req.params;
   console.log('Este es mi id' + id)
   const product = service.delete(id);

       res.json({
           'success': true,
           'message': 'El siguiente registro se ha eliminado correctamente',
           'Data':  product
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

