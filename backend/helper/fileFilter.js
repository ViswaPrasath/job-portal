module.exports = function fileFiltering(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only pdf and documents are allowed!'), false);
    }
    cb(null, true);
}