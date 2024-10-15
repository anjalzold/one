import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
})

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);