const express = require('express');
//usado para trabalhar com arquivos(uploads)
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = express.Router();
const upload = multer(uploadConfig);

//criar uma rota pelo caminho raíz, utilizando o middleware node req(requisicao),
//res(resposta da requisitao)
routes.post('/posts', upload.single('image'), PostController.store);
//lista os posts
routes.get('/posts', PostController.index);
//rota para like no post
routes.post('/posts/:id/like', LikeController.store);
//exporta as rotas para serem visíveis pelas outras pastas do projeto
module.exports = routes;