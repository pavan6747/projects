const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "please Add the user name"],
    },
    email:{
        type: String,
        unique: [true,"Email address already taken"],
        required: [true, 'Please provide an Email address'],
    },
    password:{
        type: String,
        required: [true, 'A Password is required to create an account'],
    },
},
    {
        timestamps: true 

    })
    module.exports = mongoose.model("User",userSchema)