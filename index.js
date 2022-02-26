const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req, res) => {
    res.send('Hola first endpoint')
});

app.get('/users',(req, res) => {
    res.json([
        {
            user: 'Quintero',
            id: '1',
            password: 'Test123',
        },
        {
            user: 'Alberto',
            id: '2',
            password: 'pass123',
        },
        {
            user: 'Alex',
            id: '3',
            password: 'alex321',
        }
    ]);
});

app.get('/users/:id')

app.listen(port, () => {
    console.log('el puerto es:' + port);
});