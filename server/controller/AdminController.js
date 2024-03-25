import Products from "../model/productModel.js";
import User from "../model/userModel.js";
import Purchase from "../model/userPurchaseModel.js";

export const isAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email, password);
  if (email === "er.rajeev.mca@gmail.com" && password === "R@jeevoo7") {
    // console.log("if");
    return res.redirect("/admin");
  } else {
    // console.log("Else");
    next();
  }
};

// export const AddProduct = async (req, res) => {
//   try {
//     const {
//       title,
//       brand,
//       model,
//       price,
//       camera,
//       ram,
//       processor,
//       screen,
//       storage,
//       color,
//       about,
//       quantity,
//     } = req.body;
//     const imgBuffer = req?.file?.buffer;
//     const imgContentType = req?.file?.mimetype;

//     // console.log("Received Data:", req?.file?.buffer);

//     const newProduct = new Products({
//       title,
//       brand,
//       model,
//       price,
//       ram,
//       processor,
//       camera,
//       screen,
//       storage,
//       color,
//       about,
//       image: {
//         data: imgBuffer,
//         contentType: imgContentType,
//       },
//       quantity,
//     });

//     const isUploaded = await newProduct.save();
//     if (isUploaded) {
//       res.status(201).json({ message: "Image uploaded successfully" });
//     } else {
//       res.status(400).json({ error: "Somthing went Wrong" });
//     }
//   } catch (error) {
//     console.error("Error adding product:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const getProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).json({ message: "Please send Product Id" });
    }
    const product = await Products.findById(_id);
    if (!product) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const AddProduct = async (req, res) => {
  try {
    const productData = { ...req.body };

    if (req.file) {
      productData.image = {
        data: req?.file.buffer,
        contentType: req?.file.mimetype,
      };
    }

    const newProduct = new Products(productData);

    const isUploaded = await newProduct.save();
    if (isUploaded) {
      res.status(201).json({ message: "Product added successfully" });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = {
      ...req.body,
    };
    if (req.file) {
      const imageData = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
      updateData.image = imageData;
    }
    await Products.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    res.status(204).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Products.deleteOne({ _id: id });
    if (deleted) {
      return res.status(204).json({ message: "Product deleted successfully" });
    }
    res.status(404).json({ message: "Product not found" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const AllUsers = async (req, res) => {
  try {
    const response = await User.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) {
      return res.status(404).json("User Not Found");
    }
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCustomerOrders = async (req, res) => {
  try {
    const orders = await Purchase.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
};
