const User = require("../models/User");

const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
    try{
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);

        const user = await User.findById(decodedToken._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    
    }catch(error){
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({ message: "Token expired" });
        }
        if(error.name === "JsonWebTokenError"){
            return res.status(401).json({ message: "Invalid token" });
        }
        return res.status(500).json({ message: "Internal server error" });  
    }


    
   
}

module.exports = authenticateUser;