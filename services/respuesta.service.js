const faker = require('faker');

const boom= require('@hapi/boom');

const RespuestaModel = require('../models/respuesta.model');



const NOTFOUNDCATALOG = 'No se encontró el catalago'

const NOTFOUNDROWS = 'No hay respuestas registrados aun'

class RespuestaService
{
  constructor()
    {
      this.respuestas =[];
      this.generate();
    }

    generate()
    {
      const limit=100;
      for (let index = 0; index < limit; index++) {
        this.respuestas.push({
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(),10),
          image: faker.image.imageUrl()
        });

      }
    }






    //DBS

    async findDB(limit, filter){
      let respuestasDB = await RespuestaModel.find(filter);
      respuestasDB = limit ? respuestasDB.filter(( item, index) => item && index < limit) : respuestasDB;
      if(!respuestasDB){
        throw boom.notFound(NOTFOUNDCATALOG);
      }else if(respuestasDB.length < 0){
        throw boom.notFound(NOTFOUNDROWS);
      }
      return respuestasDB;
    }



    async findOneDB(id)
    {
      const respuesta = await RespuestaModel.findOne({
        _id: id
      });
      if(respuesta==undefined || respuesta==null)
       throw boom.notFound('No se encontró catalago');
       else if(respuesta.length<=0)
       throw boom.notFound('No se encontró ningun registro');
      return respuesta;
    }


    async createDB(data)
    {
      const model = new RespuestaModel(data);
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
      let respuesta= await RespuestaModel.findOne({
        _id: id
      });
      let respuestaOriginal= {
        texto: respuesta.texto,

      };
      const {texto} = changes;
      respuesta.texto=texto;
      respuesta.save();
      return{
         original: respuestaOriginal,
         acualizado: respuesta
      }
    }




    async deleteDB(id)
    {
      let respuesta= await RespuestaModel.findOne({
        _id: id
      });

      const { deletedCount } = await RespuestaModel.deleteOne({
        _id: id
      });
     if(deletedCount <= 0)
       throw boom.notFound('El registro seleccionado no existe');
      return respuesta;
    }

}
module.exports= RespuestaService;
