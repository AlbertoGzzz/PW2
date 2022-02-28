const express = require('express');
const routerApi = require('./routes/index');
const { logErrors, boomErrorHandler, errorHandler } =require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.get('/',(req, res) => {
    res.send('Hola first endpoint')
});

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use(express.json());
routerApi(app);


app.listen(port, () => {
    console.log('el puerto es:' + port);
});
