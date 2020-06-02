import express from 'express';

const app = express();

app.get('/users', (req, res) => {
    console.log('Listagem de usuários');

    res.send('Hello World');
});

app.listen(3333);