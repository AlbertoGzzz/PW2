const faker = require('faker');

const boom= require('@hapi/boom');

const PreguntaModel = require('../models/pregunta.model');



const NOTFOUNDCATALOG = 'No se encontró el catalago'

const NOTFOUNDROWS = 'No hay productos registrados aun'

class PreguntaService
{
  constructor()
    {
      this.preguntas =[];
      this.generate();
    }

    generate()
    {
      const limit=100;
      for (let index = 0; index < limit; index++) {
        this.preguntas.push({
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
      let preguntasDB = await PreguntaModel.find(filter);
      preguntasDB = limit ? preguntasDB.filter(( item, index) => item && index < limit) : preguntasDB;
      if(!preguntasDB){
        throw boom.notFound(NOTFOUNDCATALOG);
      }else if(preguntasDB.length < 0){
        throw boom.notFound(NOTFOUNDROWS);
      }
      return preguntasDB;
    }


    async findOneDB(id)
    {
      const pregunta = await PreguntaModel.findOne({
        _id: id
      });
      if(pregunta==undefined || pregunta==null)
       throw boom.notFound('No se encontró catalago');
       else if(pregunta.length<=0)
       throw boom.notFound('No se encontró ningun registro');
      return pregunta;
    }


    async createDB(data)
    {
      const model = new PreguntaModel(data);
      await model.save();
      return data;
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
      let pregunta= await PreguntaModel.findOne({
        _id: id
      });
      let preguntaOriginal= {
        texto: pregunta.Name,
        descripcion: pregunta.age
      };
      const {texto, descripcion} = changes;
      pregunta.texto=texto;
      pregunta.descripcion=descripcion;
      pregunta.save();
      return{
         original: preguntaOriginal,
         acualizado: pregunta
      }
    }




    async deleteDB(id)
    {
      let pregunta= await PreguntaModel.findOne({
        _id: id
      });

      const { deletedCount } = await PreguntaModel.deleteOne({
        _id: id
      });
     if(deletedCount <= 0)
       throw boom.notFound('El registro seleccionado no existe');
      return pregunta;
    }

}
module.exports= PreguntaService;
