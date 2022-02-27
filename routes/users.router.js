const express = require('express');
const faker = require('faker');
const router = express.Router();

//esta es una prueba

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

