import mongoose from "mongoose";

let Product=mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    images: [String],
    category:String
})

export default mongoose.model("Product", Product);