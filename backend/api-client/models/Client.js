import { Schema, model } from "mongoose";

const ClientSchema = new Schema(
    {
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        email: { type: String, required: true, unique: true }
    });

export default model('client', ClientSchema)
