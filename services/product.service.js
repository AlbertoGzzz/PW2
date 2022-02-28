const faker = require('faker');

const boom= require('@hapi/boom');

class ProductService
{
  constructor()
    {
      this.products =[];
      this.generate();
    }

    generate()
    {
      const limit=100;
      for (let index = 0; index < limit; index++) {
        this.products.push({
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(),10),
          image: faker.image.imageUrl()
        });

      }
    }

    find(size)
    {
      const products = this.products.filter(( item, index) => item && index < size);
      if(!products){
        throw boom.notFound('No se encontro el catálogo');
      }else if(products.length < 0){
        throw boom.notFound('No hay productos registrados aun');
      }
      return products;
    }
    create(data)
    {
      const newProduct = {
        id: faker.datatype.uuid(),
        ...data
      }
      this.products.push(newProduct);
      return newProduct
    }

    findOne(id)
    {
      const product = this.products.find((item) => item.id === id)
      if(!product)
       throw boom.notFound('El producto no fue encontrado');
      return product;
    }
    update()
    {
      const index = this.products.findIndex(item => item.id === id)
      console.log('Este es mi index' + index);
      if(index === -1){
        throw boom.notFound('El producto no fue encontrado');
      }
      var currentProduct = this.products[index];
      this.products[index]={
        ...currentProduct,
        ...changes
      };
      return{
        old: currentProduct,
        changed: this.products[index]
      }
    }
    delete(id)
    {
      const index = this.products.findIndex(item => item.id === id)
      console.log('Este es mi index' + index);
      if(index === -1){
        throw boom.notFound('El producto no fue encontrado');
      }
      var currentProduct = this.products[index];
      this.products.splice(index, 1);
      return currentProduct;
    }
}
module.exports= ProductService;
