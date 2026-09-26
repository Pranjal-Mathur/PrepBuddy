const jwt = require("jsonwebtoken")
const blaclisttokenModel = require("../models/blacklist.model")


async function authUser(req,res,next){

    console.log(req.cookies)

    const token =  req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Token not found"
        })
    }

    const istokenblacklisted = await blaclisttokenModel.findOne({token})
    if(istokenblacklisted){
        return res.status(401).json({
            message : "Invalid token"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded
        
        next()

    }
    catch(err){

        return res.status(401).json({
            message:"Invalid token"
        })
    }
    
}
module.exports = {authUser}