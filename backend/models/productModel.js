import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {type:String, required:true},
    description : {type:String, required:true},
    price : {type:Number, required:true},
    images : {type:Array, required:true},
    category : {type:String, required:true},
    subCategory : {type:String, required:true},
    sizes : {type:Array, required:true},
    bestseller : {type:Boolean, required:true},
    date : {type:Number, required:true},
})

// || used for if there is alr model then use the first else then use the create schema
// For not always calling the schema and creating the new schema
const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel