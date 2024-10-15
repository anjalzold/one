const Cart = require("../models/Cart");
const Order = require("../models/Order");
const khaltiBaseUrl ={
    sandbox: "https://a.khalti.com/api/v2/",
    production: "https://khalti.com/api/v2/"
}
const generateKhaltiAccessToken = async()=>{
    try {   
        return process.env.KHALTI_LIVE_SECRET_KEY
        
    } catch (error) {
        throw new Error("Error while generating Khalti auth token")
        
    }
}

const khaltiApi = async (endpoint,body={})=>{
    const accessToken = await generateKhaltiAccessToken();
    const url = `${khaltiBaseUrl.sandbox}${endpoint}`;
    console.log("Access Token:", process.env.KHALTI_LIVE_SECRET_KEY);

    const response = await fetch(`${khaltiBaseUrl.sandbox}${endpoint}`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Key ${accessToken}`
        },
        body:JSON.stringify(body)
    })
    if(!response.ok){
        const errorText = await response.text();
        console.error("Khalti API error:",errorText);
        throw new Error(`Khalti API error: ${response.status} ${errorText}`)
    }
    return response
}

const generateKhaltiOrder = async (req,res)=>{
    // const {street, city, state, country, zipCode} = req.body

    // if(!street || !city || !state || !country || !zipCode){
    //     return res.status(400).send("All fields are required")
    // }
    try{
        const cart = await Cart.findOne({userId:req.user._id});
        if(!cart) throw new Error("Cart not found");
        const orderitems = cart.items;
        const totalPrice = cart.cartTotal || 0;

        const response = await fetch("https://a.khalti.com/api/v2/epayment/initiate/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Key 8d036b709b5f41ba8fae580e48116e6d`
            },
            body: JSON.stringify({
                "return_url": "http://localhost:4000/api/orders/callback",
                "website_url": "http://localhost:4000/api/orders/callback",
                "amount": 100000,
                "purchase_order_id": "order-12345678ss9",
                "purchase_order_name": "Test Ordssser",
                "customer_info": {
                    "name": "Test User",
                    "email": "test@khalti.com",
                    "phone": "9800000001"
                }
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Khalti API error:", errorText);
            throw new Error(`Khalti API error: ${response.status} ${errorText}`);
        }
        
        
        const khaltiOrder = await response.json();
        // return res.send(khaltiOrder)
        console.log(khaltiOrder)

        res.json(khaltiOrder);

        // if(khaltiOrder?.pidx){
        //     const unpaidOrder = await Order.create({
        //         user:req.user._id,
        //         items:orderitems,
        //         shippingAddress:{
        //             street,
        //             city,
        //             state,
        //             country,
        //             zipCode
        //         },
        //         totalAmount:totalPrice,
        //         status:"PENDING",
        //         paymentMethod:"KHALTI",
        //         trackingNumber:khaltiOrder.pidx,
        //         notes:"Order created using Khalti"
        //     })

        //     if(unpaidOrder){
        //         return res.json({ payment_url: khaltiOrder.payment_url });            }
        //     else{
        //         throw new Error("Order not created")
        //     }
        // }
        // else{
        //     throw new Error("Khalti order not created")
        // }
    }catch(error){
        throw new Error(error.message)
    }

}

const verifyKhaltiPayment = async (req, res) => {
    return res.redirect("/orders");
    res.json({ message: "Payment verified successfully" });
    // try {

    //     const { token, amount } = req.body; // Get data from req.body only

    //     console.log("Received payment verification request with body:", req.body);


    //     if (!token || !amount) {
    //       return res.status(400).json({ error: "Missing required parameters" });
    //     }
   

    //     const response = await fetch("https://a.khalti.com/api/v2/payment/verify/", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Key ${process.env.KHALTI_LIVE_SECRET_KEY}`
    //         },
    //         body: JSON.stringify({
    //             token,
    //             amount
    //         })
    //     });

    //     if (!response.ok) {
    //         const errorText = await response.text();
    //         console.error("Khalti verification error:", errorText);
    //         return res.status(500).json({ error: `Payment verification failed: ${errorText}` });
    //     }

    //     const paymentStatus = await response.json();

    //     if (paymentStatus.status === true) {
    //         const order = await Order.findOneAndUpdate(
    //             { trackingNumber: paymentStatus.idx }, // Assuming idx is the tracking number
    //             { paymentStatus: "PAID" },
    //             { new: true }
    //         );

    //         if (!order) {
    //             return res.status(404).json({ error: "Order not found" });
    //         }

    //         return res.redirect("http://localhost:3000/product");
    //     } else {
    //         return res.status(400).json({ error: "Payment verification failed" });
    //     }
    // } catch (error) {
    //     console.error("Error in verifyKhaltiPayment:", error);
    //     return res.status(500).json({ error: "Internal server error" });
    // }
};

module.exports = {
    generateKhaltiOrder,
    verifyKhaltiPayment
}


// Initiating the payment
