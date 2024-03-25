import User from "../model/userModel.js";
import speakeasy from "speakeasy";
import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

const AdminEmail = process.env.AdminEmail;
const AdminPassword = process.env.AdminPassword;

const users = {};
let _name, _password, _email;

const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    _name = name;
    _password = password;
    _email = email;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const secret = speakeasy.generateSecret({
      length: 4,
      name: "Node-Mail-Service",
      symbols: false,
    });

    users[email] = {
      secret: secret.base32,
      encoding: "base32",
      verified: false,
    };

    const otp = speakeasy.totp({
      secret: users[email].secret.base32,
      encoding: "base32",
    });

    await sendOTPEmail(email, otp);

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: AdminEmail,
      pass: AdminPassword,
    },
  });

  const mailOptions = {
    from: "poojakumaribth0604@gmail.com",
    to: email,
    subject: "Welcome to Besite's Park! Your OTP Verification",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hello ${_name},</h2>
        
        <p>We're absolutely thrilled to have you join us at <strong>Besite's Park Shopping!</strong> Your adventure into a world of exclusive shopping begins here. To ensure the utmost security of your account and a seamless experience, we need to verify your email address.</p>
  
        <p>Here's your <strong>one-time verification code:</strong></p>
        <div style="background-color: #f9f9f9; border-left: 5px solid #007bff; margin: 20px 0; padding: 10px 15px;">
          <h3>🌟 <span style="color: #007bff;">${otp}</span></h3>
        </div>
  
        <p>Enter this code on the verification page to activate your account and embark on your Besite's Park journey. This code is valid for only <strong>10 minutes</strong>, so please use it right away.</p>
  
        <p>If you encounter any issues or have questions, please don't hesitate to reach out to our customer support. We're here to help you every step of the way!</p>
  
        <p>Thank you for choosing Besite's Park. We can't wait for you to discover all the amazing things we have in store.</p>
  
        <p>Warmest regards,<br>
        <strong>Pooja Kumari</strong><br>
        The Besite's Park Team</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

const otpVerification = async (req, res) => {
  try {
    const { email, token } = req.body;

    const user = users[email];
    if (!user) {
      return res.status(404).json({ error: "User Profile not found !!" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.secret.base32,
      encoding: "base32",
      token,
      window: 2,
    });

    if (verified) {
      user.verified = true;
      try {
        await User.create({
          name: _name,
          email: _email,
          password: _password,
        });
        res
          .status(200)
          .json({ message: `OTP verification successful. ${_name} Added!` });
      } catch (error) {
        res.status(500).json({ error: "Can't Create Account" });
      }
    } else {
      res.status(401).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error during verification" });
  }
};

export { Signup, otpVerification };
