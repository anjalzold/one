const User = require('../models/User')


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error(
            "Something went wrong while generating the access token"
        );
    }
}
const createUser = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;
    try {
        
        const user = await User.findOne(
        {email}
        )
        if(user){
            return res.send("User already exists")
        }
        const response = await User.create({
            email,
            password,
            firstName,
            lastName
        })
        if(response){
           return res.send(response)
        }
        else{
           return res.send("User not created")
        }
    } catch (error) {
        return res.send(error)
        
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    console.log("Received login request with body:", req.body);
    try {
        const user = await User.findOne({email})
        if(!user){
            console.log("User not found");
            return res.status(404).json({message: "User not found"});
        }

        const isPasswordValid = await user.comparePassword(password)
        if(!isPasswordValid){
            console.log("Password incorrect");
            return res.status(401).json({message: "Password incorrect"});
        }

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" // use secure cookies in production
        }
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
        
        // Set cookies
        res.cookie("accessToken", accessToken, options);
        res.cookie("refreshToken", refreshToken, options);

        // Prepare response data
        const responseData = {
            message: "Login successful",
            user: {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            accessToken,
            refreshToken
        };

        console.log("Sending response:", responseData);

        // Send response
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({message: "An error occurred", error: error.message});
    }
}

const getUser = async (req,res)=>{
    try {
        const users = await User.find();
        res.send(users)
        
    } catch (error) {
        res.send(error)
    }
}


module.exports = {createUser, loginUser, getUser}