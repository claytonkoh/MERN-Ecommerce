import validator from "validator"
import userModel from "../models/userModel.js"
import bycrpyt from "bcrypt"
import jwt from "jsonwebtoken"

// Make token
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


// User Login
const loginUser = async(req, res) =>{
    try {
        const {email,password} = req.body

        const user = await userModel.findOne({email})

        if (!user){
            return res.json({success:false, message:'User Not Exist'})
        }
        
        const isMatch = await bycrpyt.compare(password, user.password)

        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"Wrong Password"})
        }
        


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})        
    }
}

// User Register
const RegisUser = async(req,res) =>{
    try {
        const {name, email, password} = req.body

        const exixst = await userModel.findOne({email})
        if (exixst){
            return res.json({success:false, message:"User Already Exist"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false, message:"Please enter strong passwrod > 8"})
        }

        // Hash password if already condition met
        const salt = await bycrpyt.genSalt(10)
        const hashPassword = await bycrpyt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashPassword
        })

        const user = await newUser.save()

        const token = createToken(user._idid)

        res.json({success:true, token:token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// Admin Login
const adminLogin = async(req,res) =>{
    try {
        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"Invalid Email or Password"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {loginUser, RegisUser, adminLogin}