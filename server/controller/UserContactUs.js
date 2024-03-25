import User from "../model/userModel.js";
import Contact from "../model/userContactUsModel.js";

const getContactUs = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, mobile } = await User.findById({ _id: userId });
    const userObj = { name, email, mobile };
    res.status(200).json(userObj);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const contactUs = async (req, res) => {
  try {
    const { userId, name, email, mobile, text } = req.body;

    const isAdded = await Contact.create({
      userId,
      name,
      email,
      mobile,
      text,
    });

    if (isAdded) {
      res.status(200).json({
        success: "Thank you for your feedback. We will reach out to you soon.",
      });
    } else {
      res.status(500).json({
        error: "Something went wrong while adding contact information.",
      });
    }
  } catch (error) {
    console.error("Error processing contact information:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getContactUs, contactUs };
