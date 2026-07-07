
const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blaclisttokenmodel = require("../models/blacklist.model")


// console.log(userModel);
// console.log(typeof userModel);


async function registerUser(req,res){
    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message : "Please provide userame,email and password"
        })
    }

    const isUserExists = await userModel.findOne({
        $or : [{username},{email}]
    })

    if(isUserExists){
        return res.status(400).json({
            message : "Account with this username or email already exists !"
        })
    }

    const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign(
        {id:user._id ,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token);

    res.status(201).json({
        message:"User registered !",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }

    })


}

async function loginUser(req,res){

    const {email,password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Invalid credentials !"
        })
    }

    console.log("req.body:", req.body);
    console.log("email:", email);
    console.log("password:", password);
    console.log("user:", user);
    
    
    const isPasswordvalid = await bcrypt.compare(password,user.password)
    if(!isPasswordvalid){
        return res.status(400).json({
            message:"Invalid email or password !"
        })
    }

    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)
    res.status(200).json({
        message:"User login successful",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })


}

async function logoutUser(req,res){

    // console.log("Cookies:", req.cookies);
    const token = req.cookies.token

    if(token){
        await blaclisttokenmodel.create({token})
    }
    res.clearCookie("token")

    res.status(200).json({
        message : "User logged out "
    })
    
}

async function getUser(req,res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "Üser fetched",
        user:{
            id : user._id,
            username:user.username,
            email:user.email
        }
    })

}


module.exports = {registerUser,loginUser,logoutUser,getUser}