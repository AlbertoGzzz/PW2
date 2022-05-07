const express = require('express');
const usersRouter  = require('./users.router');
const preguntasRouter = require('./preguntas.router');
const respuestasRouter = require('./respuestas.router');

const routerApi=(app) => {
    const router=express.Router();
    app.use('/api/v1', router);

    router.use('/users', usersRouter);
    router.use('/question', preguntasRouter);
    router.use('/respuesta', respuestasRouter);
}
module.exports = routerApi;

a=screen;
