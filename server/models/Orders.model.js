import mongoose from "mongoose";

const Orders = mongoose.Schema(
    {
     
        userId: mongoose.Schema.Types.ObjectId,
        items: [
          {
            productId: mongoose.Schema.Types.ObjectId,
            name: String,
            quantity: Number,
            price: Number
          }
        ],
        totalPrice: Number,
        shippingAddress: String,
        location: String,
        paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'] },
        orderStatus: { type: String, enum: ['pending','processing','shipped','delivered','cancelled'] },
        createdAt: Date,
        updatedAt: Date
    }
)

export default mongoose.model("Orders", Orders);