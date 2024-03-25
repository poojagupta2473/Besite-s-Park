import User from "../model/userModel.js";

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, gender, age, mobile, dob, address } =
      await User.findById({
        _id: id,
      });
    const userDate = {
      name,
      email,
      gender,
      age,
      mobile,
      dob,
      address,
    };
    if (userDate) {
      res.status(200).json(userDate);
    } else {
      res.status(404).json({ message: "User Profile not found !!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, gender, mobile, age, dob } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      id,
      { name, email, age, mobile, gender, dob },
      { new: true }
    );

    if (updateUser) {
      res.status(200).json({ message: "Profile Updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      mobile,
      city,
      district,
      pincode,
      state,
      street,
      type,
    } = req.body;
    const updateUserAddress = await User.findByIdAndUpdate(
      id,
      {
        address: {
          name,
          email,
          mobile,
          city,
          district,
          pincode,
          state,
          street,
          type,
        },
      },
      { new: true }
    );
    if (updateUserAddress) {
      res.status(200).json({ message: "Address Updated Successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getUserById, updateUser, updateUserAddress };
