import { Router } from "express";
import multer, { memoryStorage } from "multer";
const router = Router();

import {
  getAllProducts,
  getProduct,
  postReview,
  getAllReviews,
} from "../controller/ProductController.js";

const storage = memoryStorage();
const upload = multer({ storage: storage });

router.route("/products").get(getAllProducts);
router.route("/product/reviews/:id").get(getAllReviews);
router.route("/product/:id").get(getProduct);

router.route("/product/review/:id").post(upload.single("image"), postReview);

export default router;
