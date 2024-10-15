
const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderItemSchema = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product'},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true, min:0}
})

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
        default: 'PENDING'
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'PAYPAL', 'STRIPE', 'RAZORPAY',"KHALTI"],
        default: 'COD'
    },
    paymentStatus: {
        type: String,
        enum: ['PENDING', 'PAID', 'FAILED'],
        default: 'PENDING'
    },
    paymentId:{type:String},
    trackingNumber: String,
    notes: String,
    

}, { timestamps: true });

OrderSchema.pre('save', async function (next) {
    this.totalAmount = this.items.reduce((acc,item)=>acc+item.price*item.quantity,0)
    next()
})

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);
