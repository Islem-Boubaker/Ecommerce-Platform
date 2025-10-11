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
      type: String, // e.g. "Women", "Men", "Kids"
      required: true,
    },

    style: {
      type: String, // e.g. "Casual", "Formal", "Party", "Gym"
    },

    size: {
      type: [String], // e.g. ["S", "M", "L", "XL"]
      default: [],
    },

    color: {
      type: [String], // e.g. ["Red", "Black", "White"]
      default: [],
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    promotion: {
      discountType: {
        type: String, // e.g. "percentage" or "flat"
        enum: ["percentage", "flat"],
      },
      discountValue: {
        type: Number, // e.g. 10 (means 10%)
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
      type: String, // e.g. "Cotton", "Polyester"
    },

    isFeatured: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true } 
);

export default mongoose.model("Product", product);
