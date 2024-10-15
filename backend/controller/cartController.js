const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (userId)=>{
    const cartAggregation = await Cart.aggregate([
        {$match :{ userId : userId}},
        {$unwind : "$items"},
        {$lookup:{
            from : "products",
            localField : "items.productId",
            foreignField : "_id",
            as : "productInfo"
        }},
        {$project:{
            product:{ $first :"$productInfo"},
            quantity : "$items.quantity",
        }},
        {$group:{
            _id: "$_id",
            items:{$push:{product:"$product",quantity:"$quantity"}},
            cartTotal:{$sum :{$multiply:["$products.price","$quantity"]}},
        }}
    ])

    return cartAggregation[0] ?? {_id:null,items:[],cartTotal:0};
}

const getUserCart = async (req,res)=>{
    let cart = await getCart(req.user._id);
    return res
    .status(200)
    .json({
        message:"Cart fetched successfully",
        cart
    })
}

const addItemOrUpdateItemQuantity = async (req,res)=>{
    const {productId} = req.params;
    const {quantity = 1} = req.body;
    let cart = await Cart.findOne({userId:req.user._id});
    
    const product = await Product.findById(productId);
    if(!product) throw new Error("Product does not exist");

    if(product.inventory === 0) throw new Error("Product is out of stock");

    if(quantity > product.inventory) throw new Error(`Only ${product.inventory} products are remaining. But you are adding ${quantity}`);

    if(!cart){
        cart = await Cart.create({userId:req.user._id,items:[{productId,quantity,price:product.price}]});
    }else{
        const addedProduct = cart.items.find((item)=>item.productId.toString() === productId);
        if(addedProduct){
            addedProduct.quantity = quantity;

        }else{
            cart.items.push({productId,quantity,price:product.price});
        }
        await cart.save({validateBeforeSave:true});
    }

    const newCart = await getCart(req.user._id);
    return res
    .status(200)
    .json({
        message:"Item added successfully",
        newCart
    })
}

const deleteItemFromCart = async (req,res)=>{
    const {productId} = req.params;
    const cart = await Cart.findOne({userId:req.user._id});
    if(!cart) throw new Error("Cart not found");

    cart.items = cart.items.filter((item)=>item.productId.toString() !== productId);
    await cart.save({validateBeforeSave:true});
    const updatedCart = await getCart(req.user._id);
    return res
    .status(200)
    .json({
        message:"Item removed from cart successfully",
        updatedCart
    })
}

module.exports = {getUserCart,addItemOrUpdateItemQuantity,deleteItemFromCart}