import { Schema, model } from "mongoose";

const comicSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Referencia al usuario
});

const comicModel = model("Comic", comicSchema);
export default comicModel;
