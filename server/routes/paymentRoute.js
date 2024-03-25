import { Router } from "express";
const router = Router();
import {
  getKey,
  checkout,
  paymentVarification,
} from "../controller/PaymentController.js";

router.route("/getkey").get(getKey);
router.route("/checkout").post(checkout);
router.route("/paymentVarification").post(paymentVarification);

export default router;
