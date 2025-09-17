import Orders from "../models/Orders.model.js";

export const getordersbyuser = (user) => {
    Orders.find({userId:user._id})
    .then((orders)=>{
        if(!orders){
            return res.status(404).json({message:"Orders not found"})
        }
        res.status(200).json({message:"Orders found successfully",orders})
    })
}
export const updateorders=(order,req,res)=>{
    Orders.findByIdAndUpdate(order._id,req.body,{new:true})
    .then((order)=>{
        if(!order){
            return res.status(404).json({message:"Order not found"})
        }
        res.status(200).json({message:"Order updated successfully",order})
    })
}

  
export const getallorders=(req,res)=>{
    Orders.find()
    .then((orders)=>{
        if(!orders){
            return res.status(404).json({message:"Orders not found"})
        }
        res.status(200).json({message:"Orders found successfully",orders})
    })
}
export const deleteorders=(order,req,res)=>{
    Orders.findByIdAndDelete(order._id)
    .then((order)=>{
        if(!order){
            return res.status(404).json({message:"Order not found"})
        }
        res.status(200).json({message:"Order deleted successfully",order})
    })
}