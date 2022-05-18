const faker = require('faker');

const boom= require('@hapi/boom');

const ProductModel = require('../models/product.model');
const bcrypt = require('bcryptjs/dist/bcrypt');
const product = require('../models/product.model');


const NOTFOUNDCATALOG = 'No se encontró el catalago'

const NOTFOUNDROWS = 'No hay productos registrados aun'

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
    update(id, changes)
    {
      const index = this.products.findIndex(item => item.id === id)
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




    //DBS

    async findDB(limit, filter){
      let productsDB = await ProductModel.find(filter);
      productsDB = limit ? productsDB.filter(( item, index) => item && index < limit) : productsDB;
      if(!productsDB){
        throw boom.notFound(NOTFOUNDCATALOG);
      }else if(productsDB.length < 0){
        throw boom.notFound(NOTFOUNDROWS);
      }
      return productsDB;
    }


    async findOneDB(id)
    {
      const product = await ProductModel.findOne({
        _id: id
      });
      if(product==undefined || product==null)
       throw boom.notFound('No se encontró catalago');
       else if(product.length<=0)
       throw boom.notFound('No se encontró ningun registro');
      return product;
    }


    async createDB(data)
    {
     // let product= await ProductModel.find({name: filter.name});
     // if(product==undefined || product==null || product>0){
      const model = new ProductModel(data);
      await model.save();
      return data;
     // }else{
       // throw boom.notFound('Ya hay alguien registrado asi');
      //}
    }


  /*  async createDB(data)
    {
      const model = new UserModel(data);
      await model.save();
      return data;
    }
*/

    async updateDB(id, changes)
    {
      let product= await ProductModel.findOne({
        _id: id
      });
      let productOriginal= {
        name: product.Name,
        email: product.email,
        password: product.password
      };
      const {name, email, password} = changes;
      product.name=name;
      product.email=email;
      product.password=password;
      product.save();
      return{
         original: productOriginal,
         acualizado: product
      }
    }




    async deleteDB(id)
    {
      let product= await ProductModel.findOne({
        _id: id
      });

      const { deletedCount } = await ProductModel.deleteOne({
        _id: id
      });
     if(deletedCount <= 0)
       throw boom.notFound('El registro seleccionado no existe');
      return product;
    }


    async loginDB(filter)
    {
      let productsDB = await ProductModel.find({name: filter.name});
      productsDB = limit ? productsDB.filter(( item, index) => item && index < limit) : productsDB;
      if(!productsDB){
        throw boom.notFound(NOTFOUNDCATALOG);
      }else if(productsDB.length < 0){
        throw boom.notFound(NOTFOUNDROWS);
      }
      return productsDB;
    }

}
module.exports= ProductService;
