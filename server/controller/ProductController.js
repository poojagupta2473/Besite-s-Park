import Product from "../model/productModelGet.js";
import Review from "../model/productReview.js";

export const getAllProducts = async (req, res) => {
  try {
    const data = await Product.find().select(
      "image title brand model ram camera price screen storage color about processor"
    );
    if (!data || data.length === 0) {
      res.status(404).json({ error: "Data is not there" });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).json({ message: "Please send Product Id" });
    }

    const productData = await Product.findById(_id);
    if (!productData) {
      return res.status(404).json({ error: "Data not found" });
    }

    const {
      image,
      title,
      brand,
      model,
      ram,
      camera,
      price,
      screen,
      storage,
      color,
      about,
      processor,
    } = productData;

    const product = {
      _id,
      image,
      title,
      brand,
      model,
      ram,
      camera,
      screen,
      storage,
      color,
      price,
      about,
      processor,
    };

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.find({ productId: id });
    if (!review) {
      return res.status(404).json({ message: "Please give review" });
    }
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postReview = async (req, res) => {
  try {
    const { id } = req.params;
    const reviewData = { ...req.body };
    if (req.file) {
      reviewData.image = {
        data: req?.file.buffer,
        contentType: req?.file.mimetype,
      };
    }

    const existingReview = await Review.findOne({
      userId: reviewData.userId,
      productId: id,
    });
    if (existingReview) {
      return res.status(200).json({ message: "Review aready exists" });
    }

    const newReview = new Review(reviewData);
    const isUploaded = await newReview.save();
    if (!isUploaded) {
      return res.status(200).json({ message: "Something went wrong" });
    } else {
      return res.status(201).json({ message: "Thank you for feedback" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
