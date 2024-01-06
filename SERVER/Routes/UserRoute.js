const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user = require("../Models/RegisterModel");
const authmiddleware = require("../middlewares/authmiddleware");

router.post("/register",async(req,res) => {
    try{
        const userExist = await user.findOne({email : req.body.email});
        if(userExist)
        {
            res.status(403).send({
                success : false,
                message : "User Already Exists !!"
            })
            return;
        }
        const salt = await bcrypt.genSalt(10); // salt are just extra characters that bcrypt is  // 10 means 10 characters
        const hashedPassword = await bcrypt.hash(req.body.password,salt); // merging both salt and password to genreate a new one.
        req.body.password = hashedPassword;

        const newUser = new user(req.body);
        await newUser.save();
        res.status(200).send({
            success : true,
            message : "Registration Successful | Please Login"
        })

    }catch(err){
        console.log(err);
        res.status(500).send({
            success : false,
            message : "Something Went Wrong !! Try Again"
        })
    }
})

router.post("/login",async(req,res) => {
    const User = await user.findOne({email : req.body.email});
    if(!User){
        res.status(403).send({
            success : false,
            message : "User Does Not Exist !"
        })
        return;
    }
    const validPassword = await bcrypt.compare(req.body.password,User.password);
    if(!validPassword){
        res.status(401).send({
            success : false,
            message : "Invalid Credentials"
        })
        return;
    }
    const token = jwt.sign({ userId: User._id, emailId: User.email }, process.env.jwt_secret, { expiresIn: "1d" });
    res.status(200).send({
        success : true,
        message : "User Logged In",
        data : token
    })
})

router.get("/get-current-user",authmiddleware, async(req,res) => {
    try{
        const User = await user.findById(req.body.userId).select("-password");
        res.send({
            success : true,
            message : "Details Fetched Successfully", 
            data : User
        })

    }catch(err){
        res.status(500).send({
            success : false,
            message : err.message
        })
    }
})
module.exports = router;  // every file is a module in common JS ,and it is exporting router