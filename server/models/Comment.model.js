import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true, 
    },
    comment: {
      type: String,
      required: true,
    },
    Likes: {
      type: [Number],
      required: true,
      
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Comment", commentSchema);
