const Post = require('../models/Post');
//biblioteca para manipular imagens
const sharp = require('sharp');
const path = require('path');
//file system que já vem no nodejs
const fs = require('fs');

module.exports = {
    async index(req, res){
        //listando os post em ordes decrescente -createdAt = order by desc
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    async store(req, res){
        //pegando os dados da requisição
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        //redimencionar a imagem
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )
        
        //exclue a imagem não redimencionada
        fs.unlinkSync(req.file.path);

        //enviando para o banco de dados mongo
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        //socket avisando a todos os dispositivos que um post foi criado
        req.io.emit('post', post)

        return res.json(post);
    }
};