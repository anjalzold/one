import mongoose, { Schema } from "mongoose";

const ReviewSchema =new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
}, { timestamps: true });


export const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);