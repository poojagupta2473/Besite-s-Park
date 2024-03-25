import { Router } from "express";
const router = Router();
import { Login } from "../controller/UserLoginController.js";
import { Signup, otpVerification } from "../controller/UserSignupController.js";
import {
  getUserById,
  updateUser,
  updateUserAddress,
} from "../controller/UserProfileController.js";
import { getContactUs, contactUs } from "../controller/UserContactUs.js";
import {
  addToCart,
  getCartDetails,
  updateQuantity,
  getCartNumber,
} from "../controller/UserCartController.js";
import { getOrders } from "../controller/UserOrdersController.js";

router.route("/login").post(Login);
router.route("/reg").post(Signup);
router.route("/otp-verify").post(otpVerification);
router.route("/profile/:id").get(getUserById);
router.route("/profile/:id").patch(updateUser);
router.route("/profile/address/:id").patch(updateUserAddress);
router.route("/getcontactus/:userId").get(getContactUs);
router.route("/contactus").post(contactUs);
router.route("/addtocart").patch(addToCart);
router.route("/getCardDetails/:userId").get(getCartDetails);
router.route("/updateQuantity/:userId/:productId").put(updateQuantity);
router.route("/getCartNumber/:userId").get(getCartNumber);
router.route("/orders/:userId").get(getOrders);

export default router;
