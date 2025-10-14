import mongoose from "mongoose";

const product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    images: {
      type: [String],
      default: [],
    },

    category: {
      type: String, 
      required: true,
    },

    type: {
      type: String, 
      required: true,
      trim: true,
    },

    style: {
      type: String, 
    },

    size: {
      type: [String], 
      default: [],
    },

    color: {
      type: [String], 
      default: [],
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    promotion: {
      discountType: {
        type: String, 
        enum: ["percentage", "flat"],
      },
      discountValue: {
        type: Number,
        min: 0,
      },
      active: {
        type: Boolean,
        default: false,
      },
    },

    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },

    brand: {
      type: String,
      trim: true,
    },

    material: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", product);
