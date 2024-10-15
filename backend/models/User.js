const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;


const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    // address: {
    //   street: String,
    //   city: String,
    //   state: String,
    //   country: String,
    //   zipCode: String,
    // },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.methods.generateAccessToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1d" }
    );
  } catch (error) {
    console.log(error);
  }
};
  

UserSchema.methods.generateRefreshToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );
  } catch (error) {
    console.log(error);
  }
};
 

UserSchema.methods.comparePassword = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};






module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
