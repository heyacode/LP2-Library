import { Schema, model } from "mongoose";

const EmpruntSchema = new Schema(
    {
        code_livre: { type: String, ref: 'livre', required: true },
        id_client: { type: Schema.Types.ObjectId, ref: 'client', required: true },
        dateEmprunt: { type: Date, default: Date.now },
        dateRetour: { type: Date, default: null }
    });

export default model('emprunts', EmpruntSchema);

