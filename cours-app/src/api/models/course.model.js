module.exports = (mongoose) => {

  // définir structure du cours
  const schema = mongoose.Schema({
    title: {
      type: String,
      required: true   // obligatoire
    },
    description: String,
    level: String,
    formateur: String,
    image: String
  });

  // créer modèle "Course"
  return mongoose.model("Course", schema);
};