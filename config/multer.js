const multer = require("multer");
const path = require("path");
//image upload
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
         cb(null, path.join(__dirname, "../files"));
    },

    filename: (req, file, cb) => {

        // cb(null, new Date().toISOString() + path.extname(file.originalname));
        const image = Date.now();
        cb(null, file.fieldname + '-' + date+".jpg")
    }
});
// checking file type
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.', 400), false);
    }
};
exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter
});