import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String },
    image: { type: String },
    category: {
      type: String,
      enum: [
        "WhatsApp Automation",
        "WhatsApp Chatbots",
        "WhatsApp for Marketing",
        "All Blogs",
      ],
      default: "All Blogs",
    },
    author: { type: String, default: "Guest Author" },
    authorImage: {
      type: String,
      default: "https://i.pravatar.cc/50", // dummy author round image
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
