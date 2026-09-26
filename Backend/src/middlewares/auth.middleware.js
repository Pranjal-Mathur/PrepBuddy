const jwt = require("jsonwebtoken")
const blaclisttokenModel = require("../models/blacklist.model")


async function authUser(req,res,next){

    const authHeader = req.headers.authorization;
    const bearerToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    const token = req.cookies.token || bearerToken;

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