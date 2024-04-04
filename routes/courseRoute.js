const express = require('express');
const Course = require('../models/couseModel.js');
const User = require('../models/userModel.js');
const {jwtAuthMiddleware,generateToken} = require('../utils/jwt.js');
const  logger = require('../utils/logger.js');

const router = express.Router();

// GET  ROUTES TO GET DATA
router.get('/',async(req,res)=>{
    try{
        // BULD QUERY
        const queryObj = { ...req.query};
        const excludefields =['page','sort','limit','fields'];
        excludefields.forEach(el => delete queryObj[el]);

      const query =  Course.find(queryObj);
      const data  = await query;
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

// POST ROUTES TO CREATE DATA
router.post('/',jwtAuthMiddleware, async(req,res)=>{

    // get user data 
  const userData = await User.findById(req.user.id);
      if(userData.role!='superAdmin'){
       return res.status(400).json({
          status:"fail",
          error:"you do not perform this operation"
       })
          }
  try{
              
     // create course data 
    const data = req.body ;
    const newCourse = new Course(data);
    const response = await newCourse.save();
    console.log('data saved');
    res.status(201).json({
      status:"success",
      response
    });  


  }catch(err){
    logger.error(err.stack);
      res.status(500).json({
      error:"internal server Error"
      })
     }
})

// PUT ROUTES TO UPDATE DATA
router.put('/:id',jwtAuthMiddleware, async(req,res)=>{

  // get user data 
  const userData = await User.findById(req.user.id);
    if(userData.role!='superAdmin'){
     return res.status(400).json({
        status:"fail",
        error:"you do not perform this operation"
     })
        }
  try{
            
      const courseId  = req.params.id;
       const courseData = req.body;
       
       const response = await Course.findByIdAndUpdate(courseId,courseData,{
         new:true,
         runValidators:true
       })

       if(!response){
        return res.status(404).json({
            status:"fail",
            error:"Course not found"
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


// DETELE ROUTES TO DETELE THE DATA
router.delete('/:id',jwtAuthMiddleware, async(req,res)=>{

  // get user data 
const userData = await User.findById(req.user.id);
    if(userData.role!='superAdmin'){
     return res.status(400).json({
        status:"fail",
        error:"you do not perform this operation"
     })
        }
try{
            
   // create course data 
   const courseId = req.params.id;
    await Course.findByIdAndDelete(courseId)
  console.log('data saved');
  res.status(201).json({
    status:"success",
  });  


}catch(err){
  logger.error(err.stack);
    res.status(500).json({
    error:"internal server Error"
    })
   }
})

module.exports =router;






