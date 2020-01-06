import multer from 'multer'
import path from 'path'
let storage = multer.diskStorage({

    destination: (req, file, cb) => {
        //console.log(req)
        cb(null, 'public/uploads/category_image')

    },

    filename: (req, file, cb) => {
        var filename=Date.now() + '-' + file.originalname
        cb(null, filename)

    }

}); 
let categoryImage = multer({

    storage

});

export default categoryImage;