// importer express
const express = require('express');

// importer dotenv (pour lire .env)
require('dotenv').config();

// importer cors
const cors = require('cors');

// créer app
const app = express();

// middleware (important)
app.use(cors());
app.use(express.json());

// route test
app.get('/', (req, res) => {
  res.send("Serveur fonctionne ✅");
});

// lancer serveur
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
// importer database
const db = require('./src/database/db.config');

// connexion MongoDB
db.mongoose.connect(db.url)
.then(() => {
  console.log("✅ MongoDB connecté");
})
.catch(err => {
  console.log("❌ erreur connexion MongoDB", err);
});

require('./src/api/routes/routes')(app);

//ajout depuis pc
const multer = require('multer');
const path = require('path');

// stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// rendre dossier public
app.use('/uploads', express.static('uploads'));