const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
}, { timestamps: true });

module.exports = mongoose.models.Cart || mongoose.model('Cart', CartSchema);

