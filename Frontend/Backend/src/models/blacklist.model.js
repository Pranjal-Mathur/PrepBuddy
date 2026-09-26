const mongoose = require("mongoose")
const { applyTimestamps } = require("./user.model")

const blaclisttokenschema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token required to be blacklisted"]
    }
},{
    timestamps:true
})

const blaclisttokenModel = mongoose.model("blacklisttokenModel",blaclisttokenschema);

module.exports = blaclisttokenModel;