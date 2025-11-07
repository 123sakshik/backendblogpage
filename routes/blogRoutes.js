import express from "express";
import multer from "multer";
import path from "path";
import Blog from "../models/blogModel.js";

const router = express.Router();

// 🧩 Configure Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// ✅ GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    // Attach full image URL dynamically
    const updatedBlogs = blogs.map((b) => ({
      ...b._doc,
      image: b.image ? `${req.protocol}://${req.get("host")}${b.image}` : "",
    }));

    res.json(updatedBlogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ POST new blog (with file upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, content, category, author } = req.body;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const newBlog = new Blog({
      title,
      description,
      content,
      category,
      author,
      image: imagePath,
      authorImage: "https://i.pravatar.cc/50",
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({
      ...savedBlog._doc,
      image: `${req.protocol}://${req.get("host")}${imagePath}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
