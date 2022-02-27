const express = require('express');
const routerApi = require('./routes/index');
const app = express();
const port = 3000;

app.get('/',(req, res) => {
    res.send('Hola first endpoint')
});
routerApi(app);
app.listen(port, () => {
    console.log('el puerto es:' + port);
});