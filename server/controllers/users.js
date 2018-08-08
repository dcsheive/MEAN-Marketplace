const User = require('../models/users.js')
const Product = require('../models/products.js')
const bcrypt = require('bcrypt')

class UserController {
    register(req,res){
        User.findOne({email:req.body.email}, (err,userEmail) => {
            if(userEmail){
                return res.json({message: "email Taken!"})
            }
            else if (req.body.password != req.body.password_confirm){
                return res.json({message: "Passwords must match!"})
            }
            else {
                let user = new User(req.body)
                bcrypt.hash(user.password, 10, (err, hash) => {
                    if(hash){
                        user.password = hash;
                        user.save(function(error){
                            if (error){
                                return res.json({message: "register failed", err:error})
                            }
                            else {
                                req.session.user_id = user._id
                                return res.json(user)
                            }
                        })
                    }
                    else {
                        return res.json({message: "register failed", err:err})
                    }
                })
            }
        })
    }
    login (req,res){
        User.findOne({email:req.body.email}, (err,user) => {
            if(user){
                bcrypt.compare(req.body.password, user.password, function(err,result){
                    if (result){
                        req.session.user_id = user._id
                        return res.json(user)
                    }
                    else {
                        
                        return res.json({message: "Could not log you in!", err:err})
                    }
                })
            }
            else {
                return res.json({message: "Please Register!", err:err})
            }
        })
    }
    logout(req,res){
        req.session.user_id = null;
        return res.json({message:"Logged out"})
    }
    getOne(req,res){
        User.findOne({_id:req.params.id})
        .populate({
            path:"listings",
            model:"Product"
        })
        .exec((err,user)=>{
            if(user){
                return res.json(user)
            }
            else{
                return res.json({message: "could not find user", err:err})
            }
        })
    }
    getAll(req,res){
        User.find({})
        .populate({
            path:"listings",
            model:"Product"
        })
        .exec((err,user)=>{
            if(user){
                return res.json(user)
            }
            else{
                return res.json({message: "could not find user", err:err})
            }
        })
    }
}
module.exports = new UserController()