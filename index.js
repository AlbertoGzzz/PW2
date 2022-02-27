const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req, res) => {
    res.send('Hola first endpoint')
});


// Get all users
app.get('/users',(req, res) => {
    res.json([
        {
            user: 'Quintero',
            password: 'Test123',
        },
        {
            user: 'Alberto',
            password: 'pass123',
        },
        {
            user: 'Alex',
            password: 'alex321',
        }
    ]);
});

// get users by id
app.get('/users/:id', function (req, res) {
    const { id } = req.params;
    res.json({
        id: id,
        user: 'Quintero',
        password: 'Test123',
    });
});

app.listen(port, () => {
    console.log('el puerto es:' + port);
});