const express=require('express');
const User=require('../../models/User');
const bcrypt=require('bcrypt');


const router=express.Router();
//@route GET api/users/test
//@desc Testing the user path
//@access Public access
router.get('/test',(req,res)=>
  res.json({
    msg:"User works!"
  }));

//@route POST api/users/register
//@desc Registering the user
//@access Public access
router.post('/register',(req,res)=>{
  User.findOne({email:req.body.email})
  .then(user=>{
    if(user){
      return res.status(400).json({
        email:'Email already exists'
      });
    }
    else{
      const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
      });

      bcrypt.genSalt(10,(err,salt)=>{
        if(err) throw err;
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
          if(err) throw err;  //failed hashing
          newUser.password=hash;
          newUser.save()
          .then(user=>res.json(user))
          .catch(err=>console.log(err));
        })
      })
    }
  })

})


  module.exports=router;