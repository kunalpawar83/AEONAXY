const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const {jwtAuthMiddleware,generateToken} = require('../utils/jwt.js');
const  logger = require('../utils/logger.js');
const Course = require('../models/couseModel.js');
const { sendEmail }= require('../utils/email.js');

router.post('/Registration', async(req,res)=>{
    try{
        // create user data 
         const data = req.body ;
         const newUser = new User(data);
         const response = await newUser.save();
         console.log('data saved');

        // create pauload 
        const payload ={
          id:response.id,
          role:response.role
        }
         console.log(newUser.email);
        sendEmail(newUser.email,'Welcome to our website', 'Thank you for registering with us!');
        // create token  
        const token  = generateToken(payload);
         res.status(201).json({
           status:"success",
           token:token,
           response
         });
    }catch(err){
      logger.error(err.stack);
     res.status(500).json({
        error:"internal server Error"
     })
    }
});

// login Route

router.post('/login',async(req,res)=>{
    try{
      
      // Extract email or passowrd form reqest body
      const {email, password} = req.body;
      const user  = await User.findOne({email:email});

      // if email does not exist or pasword does not match , return error 
      if(!user || !(await user.comparePassword(password))){
        return res.status(400).json({
           status:"fail",
           error:"Invalid  email or password"
        })
      }

      const payload ={
        id:user.id
      }
      const token = generateToken(payload);
      
      res.status(201).json({
           status:"success",
           token
      })

    }catch(err){
      logger.error(err.stack);
       res.status(500).json({
        status:"fail",
        error:"Internal server error"
       })
    }
})

// COURSE BUY 

router.post('/buy/:id',jwtAuthMiddleware,async(req,res)=>{
     const userdata =  await User.findById(req.user.id);
     console.log(userdata.course._id);
     const courseid   = await req.params.id;
     console.log(courseid);
     if(userdata.course.id === courseid){
       return res.status(400).json({
        status:"fail",
        error:"you have already buy  this course"
       })
     }
     try{
      sendEmail(userdata.email,'Welcome to our website', 'Thank you for registering with us!');
          res.status(201).status({
            status:"success",
            message:"thank you to buy this couirse"
          })
     }catch(err){
      logger.error(err.stack);
      res.status(500).json({
       status:"fail",
       error:"Internal server error"
      })
     }
})


router.get('/',async(req,res)=>{
    try{
      const data = await User.find();
      console.log('data fetched');
      res.status(200).json({
          status:"success",
          result:data.length,
          data:data
      })
    }catch(err){
      logger.error(err.stack);
      res.status(500).json({
      error:"internal server Error"
   })
    }
})

router.put('/:id',jwtAuthMiddleware,async(req,res)=>{
    try{
       const userId  = req.params.id;
       const userData = req.body;
       
       const response = await User.findByIdAndUpdate(userId,userData,{
         new:true,
         runValidators:true
       })
       
       sendEmail(userdata.email,'Welcome to our website', 'Thank you for registering with us!');
       if(!response){
        return res.status(404).json({
            status:"fail",
            error:"User not found"
        })
       }

       console.log('data updated');
       res.status(200).json({
        status:"success",
        data:response
    })
    }catch(err){
      logger.error(err.stack);
      res.status(500).json({
      error:"internal server Error"
   })
    }
})

module.exports =router;
