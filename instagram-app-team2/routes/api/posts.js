const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Post = require("../../models/Post");
// Profile model
const Profile = require('../../models/Profile');

//Validation
const validatePostInput = require("../../validations/post");

//@route GET api/posts/test
//@desc Tests post route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

//@route GET api/posts
//@desc Get post
//@access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

//@route GET api/posts/:id
//@desc Get post by id
//@access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that id" })
    );
});

//@route POST api/posts
//@desc Create post
//@access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //Check Validation
    if (!isValid) {
      res.status(400).json(errors);
    }

    const newPost = new Post({
      image: req.body.image,
      caption: req.body.caption,
      username: req.body.username,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//@route DELETE api/posts/:id
//@desc Delete post
//@access Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
      .then(post => {
        //Check for post owner
        if(post.user.toString() != req.user.id) {
          res.status(401).json({unauthorized: "User not authorized"})
        }
        //Delete post
        post.remove().then(()=> res.json({success: true}));
      })
      .catch(err => res.status(404).json({postnotfound: "No post found"}))
    })
  }
);

//@route POST api/posts/likes/:id
//@desc Like post 
//@access Private

router.post(
  "like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
      .then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length >0){
          res.status(400).json({ alreadyliked: "User already liked this post" });
        }

        //Add user id to likes array
        post.likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({postnotfound: "No post found"}));
    })
  }
);



module.exports = router;
