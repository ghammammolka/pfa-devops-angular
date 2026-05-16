const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../config/cloudinary');

// stockage cloudinary
const storage = new CloudinaryStorage({
cloudinary: cloudinary,
params: {
folder: 'cours-app',
allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
}
});

const upload = multer({ storage });

module.exports = app => {

const router = require('express').Router();
const courseController = require('../controllers/course.controller');

// CREATE
router.post('/courses', upload.single('image'), courseController.create);

// GET
router.get('/courses', courseController.findAll);
router.get('/courses/:id', courseController.findOne);

// UPDATE
router.put('/courses/:id', upload.single('image'), courseController.update);

// DELETE
router.delete('/courses/:id', courseController.delete);

app.use('/api', router);
};
