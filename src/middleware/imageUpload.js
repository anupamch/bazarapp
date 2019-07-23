import multer from 'multer'
import path from 'path'
let storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'public/uploads/pimages')

    },

    filename: (req, file, cb) => {
        var filename=Date.now() + '-' + file.originalname
        cb(null, filename)

    }

}); 
let upload = multer({

    storage

});

export default upload;