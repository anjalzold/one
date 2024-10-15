const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const connectDb = require('./db/connectDb');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const cartRoute = require('./routes/cartRoutes');
const orderRoute = require('./routes/orderRoutes');
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use("/api/products",productRoute);
app.use("/api/users",userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);


const port = process.env.PORT || 5000;
try{
    connectDb().then(()=>{
        app.listen(port, () => {
        console.log(`Server started at port ${port}`);
    })
 
    })

   
}
catch(error){
    console.log(error);
}
