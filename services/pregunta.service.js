const faker = require('faker');

const boom= require('@hapi/boom');

const PreguntaModel = require('../models/pregunta.model');



const NOTFOUNDCATALOG = 'No se encontró el catalago'

const NOTFOUNDROWS = 'No hay preguntas registrados aun'

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

  //ESTE ES EL QUE ESTOY USANDO PARA BUSCAR POR USUARIO PERO NO FUNCIONA
    async findUserDB(limit, filter){
      let preguntasDB = await PreguntaModel.find({usuario: filter.usuario});

      preguntasDB = limit ? preguntasDB.filter(( item, index) => item && index < limit) : preguntasDB;
      if(!preguntasDB){
        throw boom.notFound(NOTFOUNDCATALOG);
      }else if(preguntasDB.length < 0){
        throw boom.notFound(NOTFOUNDROWS);
      }
      return preguntasDB;
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
        texto: pregunta.texto,
        descripcion: pregunta.descripcion
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
