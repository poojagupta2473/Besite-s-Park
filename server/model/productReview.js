import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    headline: {
      type: String,
    },
    comment: {
      type: String,
    },
    image: {
      data: {
        type: Buffer,
      },
      contentType: {
        type: String,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const Review = model("Review", reviewSchema);
export default Review;
