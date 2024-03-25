import { Schema, model } from "mongoose";

const contactUsModel = Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  text: {
    type: String,
  },
});

const Contact = model("ContactUs", contactUsModel);
export default Contact;
