const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product');




const createProduct = async (req, res) => {
    const {name,description,price,inventory} = req.body

    try{
        let imageUrl = ""
        if(req.file){
            const b64 = Buffer.from(req.file.buffer).toString('base64')
            let dataURI = `data:${req.file.mimetype};base64,${b64}`
            const result = await cloudinary.uploader.upload(dataURI,{
                folder:"products",
                timeout: 15000
            })

            imageUrl = result.secure_url
        }
  
        const product = await Product.create({
            name,
            description,
            price,
            imageUrl:imageUrl,
            inventory
        })
        if(product){
            res.send(product)
        }
        else{
            res.send("Product not created")
        }
       
}catch(error){
    console.log(error)
}
}
const getProduct = async (req,res)=>{
    try {
        const products = await Product.find();
        res.send(products)
        
    } catch (error) {
        res.send(error)
    }
}

const getProductById = async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id)

        if(product){
            res.send(product)
        }
        else{
            res.send("Product not found")
        }

    }catch(error){
        return res.send(error)
    }
}



const deleteProduct = async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id)

        if(product){
            await Product.findByIdAndDelete(req.params.id)
        }
        else{
            res.send("Product not found")
        }

    }catch(error){  
        res.send(error)

    }
}

const updateProduct = async (req,res)=>{
    const {
        name,
        description,
        price,
        imageUrl,
        category,
        inventory
    } = req.body
    try{
        const product = await Product.findById(req.params.id)

        if(product){
            product.name = name
            product.description = description
            product.price = price
            product.imageUrl = imageUrl
            product.category = category
            product.inventory = inventory
            await product.save()
            res.send(product)
        }
        else{
            res.send("Product not found")
        }
    }catch(error){
        res.send(error)
    }
}


module.exports = {createProduct,getProduct,getProductById}