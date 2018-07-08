let mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ProductSchema =  new mongoose.Schema({
    title: { type: String, required: [true, "Title is required"], minlength: [4, "Title must be 4 characters"] },
    description: { type: String, required: true},
    price: { type: Number, required: [true, "Price is required"] },
    image: { type: String },
    location: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true}) 
let Product = mongoose.model("Product", ProductSchema)
module.exports = Product