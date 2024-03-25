import User from "../model/userModel.js";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordCorrect = password === user.password;
      if (isPasswordCorrect) {
        const { name, id } = user;
        res.status(200).json({ name, id });
      } else {
        res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
