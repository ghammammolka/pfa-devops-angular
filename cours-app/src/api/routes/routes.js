const multer = require('multer');
const path = require('path');

// config upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = app => {

  const router = require('express').Router();
  const courseController = require('../controllers/course.controller');

  // ✅ CREATE avec upload
  router.post('/courses', upload.single('image'), courseController.create);

  // GET
  router.get('/courses', courseController.findAll);
  router.get('/courses/:id', courseController.findOne);

  // ✅ UPDATE avec upload
  router.put('/courses/:id', upload.single('image'), courseController.update);

  // DELETE
  router.delete('/courses/:id', courseController.delete);

  app.use('/api', router);
};