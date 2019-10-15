const multer = require('multer');
//biblioteca do node para resolver caminhos
const path = require('path');


//fazendo o upload do arquivo
module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
    })
};

