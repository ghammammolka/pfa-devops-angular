module.exports = (mongoose) => {

  const schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: String
  });

  return mongoose.model("Formateur", schema);
};