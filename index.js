const express = require('express');
const db = require('./db')
const { DBCONNECTION }= require('./consts.json')
const routerApi = require('./routes/index');
const { logErrors, boomErrorHandler, errorHandler } =require('./middlewares/error.handler')
require('dotenv').config({ path: 'ENV_FILENAME' });
db(DBCONNECTION);

const app = express();
const port = 3000;

app.get('/',(req, res) => {
    res.send('Hola first endpoint')
});

app.use(logErrors);
app.use(boomErrorHandler);

app.use(express.json());
routerApi(app);


app.listen(port, () => {
    console.log('el puerto es:' + port);
});
