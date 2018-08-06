const express = require('express');
const mongoose = require('mongoose');
const passport =  require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Load Validation
const validateProfileInput = require('../../validations/profile');

const router = express.Router();

//@route   GET api/profile/
//@desc    getting profile of current user
//@access  Private access

router.get('/', passport.authenticate('jwt', {session:false}),
 (req,res) => {

    let errors = {};

    Profile.findOne({user: req.user.id})
    .populate('user', ['handle', 'full_name', 'email', 'avatar'])
    .then( profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err =>res.status(404).json(err));
});

//@route  Post api/profile
//@desc   create or edit profile
//@access Private
router.post('/', passport.authenticate('jwt',{session: false}),
(req, res) =>{

    const {errors, isValid} = validateProfileInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    //get profile fields
    const profileField = {};
    profileField.user = req.user.id;
    /*if(req.body.handle) profileField.handle = req.body.handle;
    if(req.body.full_name) profileField.handle=req.body.full_name;*/
    if(req.body.website) profileField.website = req.body.website;
    if(req.body.bio) profileField.bio = req.body.bio;
    if(req.body.phoneNumber) profileField.phoneNumber = req.body.phoneNumber;
    if(req.body.gender) profileField.gender = req.body.gender;

    Profile.findOne({user:req.user.id})
    .then( profile =>{
        if(profile){
            //update
            Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileField },
                {new: true}
            )
            .populate('user', ['handle', 'full_name', 'email', 'avatar'])
            .then(profile => res.json(profile));
        }else{
            //create
            
            //check if handle exist
            Profile.findOne({handle: req.user.handle})
            .then(profile => {
                if(profile){
                    errors.handle = 'Handle already exists';
                    return res.status(400).json(errors);
                }
                //save profile
                new Profile(profileField)
                .save()
                .populate('user', ['handle', 'full_name', 'email', 'avatar'])
                .then(profile =>{
                    if(profile){
                        res.json(profile);
                    }else{
                        error.profile = 'Profile not created';
                        return res.status(400).json(errors);
                    }
                })
               
            })
            .catch(err => res.json(err));
        
        }
        
    })
    .catch(err => res.json(err));
}
)

//@route   GET api/profile/user/:user_id
//@desc    getting profile for user_id
//@access  Public access

router.get('/user/:user_id', (req, res) =>{

    Profile.findOne({user:req.params.user_id})
    .populate('user', ['handle', 'full_name', 'email', 'avatar'])
    .then(profile =>{
        if(!profile){
            errors = 'Profile not exist for this user';
            return res.status(404).json(errors)
        }
        res.json(profile);
    })
    .catch(err => res.status(400).json(err));
})

//@route   GET api/profile/handle/:handle_id
//@desc    getting profile for user_id
//@access  Public access

router.get('/handle/:handle_id', (req, res) =>{

    Profile.findOne({handle: req.params.handle_id})
    .populate('user', ['full_name', 'email', 'avatar'])
    .then(profile =>{
        if(!profile){
            errors = 'Profile not exist for this handle';
            return res.status(404).json(errors)
        }
        res.json(profile);
    })
    .catch(err => res.status(400).json(err));
})

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};
  
    Profile.find()
      .populate('user', ['handle', 'full_name', 'email', 'avatar'])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = 'There are no profiles';
          return res.status(404).json(errors);
        }
  
        res.json(profiles);
      })
      .catch(err => res.status(404).json(err));
  });


// @route   DELETE api/profile/
// @desc    delete the profile
// @access  Private
router.delete('/', passport.authenticate('jwt',{session: false}),
 (req, res) => {

    Profile.findOneAndRemove({user: req.user.id})
    .then(() =>{
        User.findOneAndRemove({_id: req.user.id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
 })


//export the router to be used by others
module.exports = router;