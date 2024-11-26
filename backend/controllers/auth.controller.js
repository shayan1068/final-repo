const mongoose = require('mongoose');
const config = require('../config/auth.config');
const Registration = require('../models/Registration');
var bcrypt = require("bcryptjs");
exports.signup = async(req,res,next) => {
    try{
        const files = [];

        for (const file of req.files) {
            files.push({url:'http://localhost:3000' + '/images/' + file.filename});
        }
        const registrationDate = new Date(); // Get the current date and time
        await Registration.create({
            fullName : req.body.fullName,
            userName : req.body.userName,
            email : req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            work:req.body.work,
            financial:req.body.financial,
            birthday:{
                day:req.body.day,
                month:req.body.month,
                year:req.body.year
            },
            gender:req.body.gender,
            phone:req.body.phone,
            address:req.body.address,
            occupation:req.body.occupation,
            qualification:req.body.occupation,
            image:files,
            registrationDate: registrationDate // Include the registration date in the database
        }).then((user) => {
            if(user){
                res.status(200).send({
                    success:true,
                    status:"success",
                    message:"User registered succefully"})
            }else{
                res.status(400).send({message:"something went wrong"})
            }
        })
    }catch(e){
        res.status(404).send({message:"duplicated username or email"});
    }
}


exports.updateDetials= async(req, res, next) => {
    const userId = req.params.userId;
    const dataToUpdate = req.body;
    try{
        const files = [];
        if (req.files) {
            for (const file of req.files) {
              files.push({ url: 'http://localhost:3000' + '/images/profile/' + file.filename });
            }
          }
        const user = await Registration.findById(userId);
        if(!user){
            res.status(400).json("userId not found");
        }
        const updateUser = await Registration.findByIdAndUpdate({_id:userId},
            {
                $set:{
                    fullName: dataToUpdate.fullName || user.fullName,
                    userName: dataToUpdate.userName || user.userName,
                    email: dataToUpdate.email || user.email,
                    work: dataToUpdate.work || user.work,
                    financial: dataToUpdate.financial || user.financial,
                    gender: dataToUpdate.gender || user.gender,
                    phone: dataToUpdate.phone || user.phone,
                    address: dataToUpdate.address || user.address,
                    occupation: dataToUpdate.occupation || user.occupation,
                    qualification: dataToUpdate.qualification || user.qualification,
                    image: files.length > 0 ? files : user.image,
                }
                
            })
            
            res.status(200).json("Details updated suucessfully");
    }catch(err){
        res.status(400).send(err.message);
    }
}

exports.deleteProfile = async(req, res ,next)=>{
    const userId = req.params.userId;
    try{
        const user = await Registration.findById(userId);
        if(!user){
            res.status(400).json("userId not found");
        }
        user.image=[];
        await user.save();
        res.status(200).json("profile Deleted Successfully");
    }catch(err){
        res.status(400).send(err.message);
    }
}