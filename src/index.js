//importando o express para o meu projeto
//importando o express para o projeto
const express = require('express');
//importando drive do mongodb
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//criando o meu app que é uma variável dentro do js
const app = express();

//configuração para realtime e protocolo http
const server = require('http').Server(app);
const io = require('socket.io')(server);

//connectionstring
mongoose.connect('mongodb+srv://sa:_q7b7p3w4_@cluster0-j73eh.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

//criar um variável global para acessar acessada de qualquer lugar da aplicação
app.use((req, res, next) => {
    req.io = io;

    next();
});

//qualquer endereço pode acessar o backend
app.use(cors());
//endereco para acessar as imagens via url
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

//visualizar o arquivo de rotas
app.use(require('./routes'));

//acessar o app localhost pela porta configurada
server.listen(3333);



