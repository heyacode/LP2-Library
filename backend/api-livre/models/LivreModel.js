import { Schema, model } from "mongoose";

const LivreSchema = Schema({
  Code: {
    type: String,
    required: true,
    unique: true
  },
  Titre: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Auteur: {
    type: String,
    required: true
  },
});

export default model('livre', LivreSchema);



