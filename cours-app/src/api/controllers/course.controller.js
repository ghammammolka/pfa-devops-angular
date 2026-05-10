const db = require('../../database/db.config');
const Course = db.courses;

exports.create = (req, res) => {

  const { title, description, level, formateur } = req.body;

  // 🔥 gérer image fichier OU URL
  const image = req.file
    ? req.file.filename
    : req.body.image;

  const newCourse = new Course({
    title,
    description,
    level,
    formateur,
    image
  });


  newCourse.save()
    .then(() => res.status(200).send({
      message: "Cours ajouté avec succès"
    }))
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: "Erreur serveur" });
    });
};


// GET ALL
exports.findAll = (req, res) => {
  Course.find()
    .then(data => res.status(200).send(data))
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: "Erreur serveur" });
    });
};


// GET ONE
exports.findOne = (req, res) => {
  const id = req.params.id;

  Course.findById(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "Cours non trouvé" });
      }
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: "Erreur serveur" });
    });
};


// DELETE
exports.delete = (req, res) => {
  const id = req.params.id;

  Course.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "Cours non trouvé" });
      }
      res.send({ message: "Cours supprimé" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: "Erreur serveur" });
    });
};


// UPDATE
exports.update = (req, res) => {

  const id = req.params.id;

  // 🔥 gérer image fichier OU URL
  const image = req.file
    ? req.file.filename
    : req.body.image;

  const updatedData = {
    ...req.body,
    image
  };

  Course.findByIdAndUpdate(id, updatedData, { new: true })
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "Cours non trouvé" });
      }
      res.send({ message: "Cours modifié", data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: "Erreur serveur" });
    });
};