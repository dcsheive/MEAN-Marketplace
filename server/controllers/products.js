const Product = require('../models/products.js')
const User = require('../models/users.js')
class ProductController {
    all( req,res ){
        Product.find({})
        .populate({
            path:'user',
            model:'User'
        })
        .exec((err,products)=>{
            if (err){
                return res.json({message: "Could not find Products", error: err})
            }
            else {
                return res.json(products)
            }
        })
    }
    allMy( req,res ){
        Product.find({user:req.params.id})
        .populate({
            path:'user',
            model:'User'
        })
        .exec((err,products)=>{
            if (err){
                return res.json({message: "Could not find Products", error: err})
            }
            else {
                return res.json(products)
            }
        })
    }
    getOne(req,res){
        Product.findOne({_id:req.params.id})
        .populate({
            path:'user',
            model:'User'
        })
        .exec((err,product)=>{
            if (err){
                return res.json({message: "Could not find Product: "+req.params.id, error: err})
            }
            else{
                return res.json(product)
            }
        })
    }
    getRandom(req,res){
        Product.aggregate([{$sample:{size: 1}}], function(err,product){
            if (err){
                return res.json({message: "Could not find Product: "+req.params.id, error: err})
            }
            else{
                return res.json(product)
            }    
        })

    }
    update(req,res){
        Product.findById(req.params.id, function(err, product){
            if (err){
                return res.json({message: "Could not find Product: "+req.params.id, error: err})
            }
            else{
                product.title = req.body.title || product.title;
                product.description = req.body.description || product.description;
                product.location = req.body.location || product.location;
                product.price = req.body.price || product.price;
                product.image = req.body.image || product.image;
                product.save(function(err){
                    if (err){
                        return res.json({message: "Could not update Product: "+req.params.id, error: err})
                    }
                    else{
                        return res.json(product)
                    }
                })
            }
        })
    }
    delete(req,res){
        Product.findById(req.params.id, function (err,product){
            if (err){
                return res.json({message: "Could not find Product: "+req.params.id, error: err})
            }
            else {
                Product.remove({_id:req.params.id}, function(err){
                    if (err){
                        return res.json({message: "Could not remove Product"+req.params.id, error: err})
                    }
                    else{
                        return res.json(product)
                    }
                })
            }
        })
    }
    create(req,res){
        if(!req.session.user_id){
            return res.json({message:"You must be logged in!"})
        }
        else{
            var product = new Product(req.body)
            product.user = req.session.user_id
            product.save(function(err){
                if (err){
                    return res.json({message: "Could not create Product", error: err})
                }
                else{
                    User.findById(req.session.user_id,(err, user)=>{
                        if (user){
                            user.listings.push(product);
                            user.save(err=>{
                                if (err){
                                    return res.json({message: "Could add product to user", error: err})
                                }
                                else {
                                    return res.json(product)
                                }
                            })
                        }
                        else {
                            return res.json({message: "Could not find User", error: err})
                        }
                    })
                }
            })
        }
    }
}
module.exports = new ProductController()