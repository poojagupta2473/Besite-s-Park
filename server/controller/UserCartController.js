import Cart from "../model/userCartModel.js";
import User from "../model/userModel.js";
import Product from "../model/productModelGet.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (userId && productId) {
      const { name, email, mobile } = await User.findById(userId);

      let userCart = await Cart.findOne({ "user.userId": userId });

      if (!userCart) {
        userCart = await Cart.create({ user: { userId, name, email, mobile } });
      }
      const existingProductIndex = userCart.cartProduct.findIndex(
        (product) => product.productId === productId
      );

      if (existingProductIndex !== -1) {
        userCart.cartProduct[existingProductIndex].quantity += 1;
      } else {
        userCart.cartProduct.push({ productId, quantity: 1 });
      }
      await userCart.save();

      res
        .status(200)
        .json({ success: "Your Product has been Added Successfully" });
    } else {
      res.status(400).json({ error: "Invalid User or Product Id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCartDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Invalid User ID" });
    }

    const cartData = await Cart.findOne({ "user.userId": userId });

    if (!cartData || !cartData.cartProduct) {
      return res.status(204).json({ error: "Cart not found for the user" });
    }

    let allProductCost = 0;
    const productDetailsMap = {};

    for (const { productId, quantity = 1 } of cartData.cartProduct) {
      const productData = await getProductDataById(productId);

      if (productData && !productData.error) {
        const price = Number(productData.price) || 0;
        const totalCost = quantity * price;
        allProductCost += totalCost;

        if (productDetailsMap[productId]) {
          productDetailsMap[productId].quantity += quantity;
          productDetailsMap[productId].totalCost += totalCost;
        } else {
          productDetailsMap[productId] = { quantity, totalCost };
        }
      }
    }

    const aggregatedCartProducts = Object.entries(productDetailsMap).map(
      ([productId, details]) => ({
        productId,
        quantity: details.quantity,
        totalCost: details.totalCost,
      })
    );

    res
      .status(200)
      .json({ cartProducts: aggregatedCartProducts, allProductCost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductDataById = async (productId) => {
  try {
    const productData = await Product.findById(productId);
    return productData || { error: "Data is not there" };
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (!userId || !productId || quantity === undefined) {
      return res
        .status(400)
        .json({ error: "Invalid User, Product ID, or Quantity" });
    }

    const userCart = await Cart.findOne({ "user.userId": userId });

    if (!userCart || !userCart.cartProduct) {
      return res.status(404).json({ error: "Cart not found for the user" });
    }

    const updatedCartProducts = userCart.cartProduct.filter(
      (product) => product.productId !== productId
    );

    if (quantity > 0) {
      const productToUpdate = userCart.cartProduct.find(
        (product) => product.productId === productId
      );
      if (!productToUpdate) {
        return res.status(404).json({ error: "Product not found in the cart" });
      }
      productToUpdate.quantity = quantity;
      updatedCartProducts.push(productToUpdate);
    }

    userCart.cartProduct = updatedCartProducts;

    await userCart.save();

    if (quantity === 0) {
      await Cart.updateOne(
        { "user.userId": userId },
        { $pull: { cartProduct: { productId } } }
      );
      return res.status(200).json({ success: "Product removed from the cart" });
    } else {
      return res.status(200).json({ success: "Quantity updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCartNumber = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(404).json({ error: "User Not Found" });
    }

    const data = await Cart.findOne({ "user.userId": userId });
    if (data === null) {
      return res.status(200).json(0);
    }
    const item = data.cartProduct.length;
    return res.status(200).json({ item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
