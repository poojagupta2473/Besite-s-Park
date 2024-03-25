import { Router } from "express";
const router = Router();
import multer, { memoryStorage } from "multer";
import {
  isAdmin,
  getProduct,
  AddProduct,
  UpdateProduct,
  deleteProduct,
  AllUsers,
  deleteUser,
  getCustomerOrders,
} from "../controller/AdminController.js";

const storage = memoryStorage();
const upload = multer({ storage: storage });

router.route("/admin/getProduct/:id").get(getProduct);
router
  .route("/admin/upload")
  .patch(isAdmin, upload.single("image"), AddProduct);
router
  .route("/admin/updateProduct/:id")
  .patch(upload.single("image"), UpdateProduct);
router.route("/admin/deleteProduct/:id").delete(deleteProduct);
router.route("/admin/allusers").get(isAdmin, AllUsers);
router.route("/admin/deleteUser/:userId").delete(deleteUser);
router.route("/admin/getCustomerOrders").get(isAdmin, getCustomerOrders);

export default router;
