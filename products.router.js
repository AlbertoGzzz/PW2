const express = require('express');
const ProductService = require('../services/product.service');
const service = new ProductService();

const router = express.Router();

//RUTAS GENERALES /

//GET ALL PRODUCTS
router.get('/', (req, res) => {
  const { size } = req.query;
  const products = service.find(size || 10)
  res.json({
    'success': true,
    'message': 'Estos son los productos encontrados',
    'Data': products
  });
});

//CREATE PRODUCTS
router.post('/', (req, res) => {
  const body = req.body;
  const product = service.create(body);
  res.json({
    'success': true, //VALIDACIONES FRONTEND
    'message': 'El producto se ha creado con Ã©xito.', //MOSTRAR AL USUARIO
    'Data': product //DESPLEGAR LA INFORMACIÃ“N EN ALGÃšN FORMATO
  });
});

//RUTAS ESPECIFICAS /:id
//GET PRODUCTS BY ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.json({
    'success': true,
    'message': 'Este es el producto encontrado:',
    'Data': product
  });
});


router.patch('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    'success': true,
    'message': 'Se ha actualizado el siguiente registro.',
    'Data': {
      id,
      "name": "SABRITAS ADOBADAS",
      "price": 13.5
    }
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    'success': true,
    'message': 'El siguiente registro se ha eliminado correctamente.',
    'Data': {
      id,
      "name": "SABRITAS ADOBADAS",
      "price": 13.5
    }
  });
});





//RUTAS COMPLEJAS /:id/photos/
//RUTAS COMPLEJAS ESPECIFICAS /:id/photos/:id

module.exports = router;
