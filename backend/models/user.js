const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        passwordConfirm:{
          type:String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
       img:String
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
