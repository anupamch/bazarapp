import multer from 'multer'
import path from 'path'
let storage = multer.diskStorage({

    destination: (req, file, cb) => {
        //console.log(req)
        cb(null, 'public/uploads/bazar_slip')

    },

    filename: (req, file, cb) => {
        var filename=Date.now() + '-' + file.originalname
        cb(null, filename)

    }

}); 
let slipUpload = multer({

    storage,
    limits: { fileSize: 8 * 1024 * 1024 }

});

export default slipUpload;