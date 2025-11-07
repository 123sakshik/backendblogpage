import Blog from "../models/blogModel.js";

// GET all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST add blog
export const createBlog = async (req, res) => {
  const { title, description, category, image, content } = req.body;
  const newBlog = new Blog({ title, description, category, image, content });
  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
