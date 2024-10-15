const mongoose = require('mongoose');
const { Schema } = mongoose;



const ProductSchema =new Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    inventory: { type: Number, required: true },

})





module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);






// import mongoose from 'mongoose';

// // User Schema
// const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   address: {
//     street: String,
//     city: String,
//     state: String,
//     country: String,
//     zipCode: String
//   },
// }, { timestamps: true });

// // Product Schema
// const ProductSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   imageUrl: { type: String, required: true },
//   category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
//   inventory: { type: Number, required: true },
// }, { timestamps: true });

// // Category Schema
// const CategorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
// });

// // Cart Schema
// const CartSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   items: [{
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//     quantity: { type: Number, required: true },
//     price: { type: Number, required: true }
//   }],
// }, { timestamps: true });

// // Order Schema
// const OrderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   items: [{
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//     quantity: { type: Number, required: true },
//     price: { type: Number, required: true }
//   }],
//   totalAmount: { type: Number, required: true },
//   status: { 
//     type: String, 
//     enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
//     default: 'PENDING'
//   },
//   shippingAddress: {
//     street: String,
//     city: String,
//     state: String,
//     country: String,
//     zipCode: String
//   },
// }, { timestamps: true });

// // Review Schema
// const ReviewSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//   rating: { type: Number, required: true, min: 1, max: 5 },
//   comment: { type: String },
// }, { timestamps: true });

// // Create models
// export const User = mongoose.models.User || mongoose.model('User', UserSchema);
// export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
// export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
// export const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
// export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
// export const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);