const jwtStrategy=require('passport-jwt').Strategy;
const extractJWT=require('passport-jwt').ExtractJwt;
const mongoose=require('mongoose');
const User=mongoose.model('users')
const keys=require('./keys');

const options={};

options.jwtFromRequest=extractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey=keys.secretOrKey;


module.exports=passport=>{
  passport.use(new jwtStrategy(options,(jwt_payload,done)=>{
    User.findById(jwt_payload.id)
    .then(user=>{
      if(user){
        return done(null,user);
      }
      else{
        return done(null,false);
      }
    })
    .catch(err=>console.log(err));
  }));
}