//register a user
//public access
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")
const User = require("../models/userModel");

const registerUser = asyncHandler(async(req, res)=>{
    const {username, email, password}=req.body
    if(!username || !email || !password) {
        res.status(400)
        throw new Error('Please provide all fields')
    }
    const userAvailable = await User.findOne({ email})
    if (userAvailable) {
        res.status(400)
        throw new Error('Email already registered')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log("Hashed Password",hashedPassword)
        const user= await User.create({
            username,
            email,
            password: hashedPassword })
        console.log(`User Created ${user}`)
        if(user){
            res.status(201).json({_id: user.id, email: user.email})
        }else{
            res.status(400)
            throw new Error('Invalid user creation')
        }
        res.json({message: "Register the user"})
    
})
const loginUser = asyncHandler(async(req, res)=>{
    const { email, password }=req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please provide email and password')
        }
        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                id:user.id,
                email: user.email

            }
        },process.env.ACCESS_TOKEN_SECRET,
        { expiresIn:'10m'})
        res.status(200).json({ accessToken})
        }else{
            res.status(401)
            throw new Error('Invalid Email or Password')


        }
        

    res.json({message:"Login User"})
})

const currentUser = asyncHandler(async(req, res)=>{
    res.json(req.user)
})


module.exports = {registerUser,loginUser,currentUser}