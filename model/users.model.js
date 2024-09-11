const mongoose = require('mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    fullName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    },
})

const userModel = mongoose.model("redUser",userSchema); 
module.exports = userModel;