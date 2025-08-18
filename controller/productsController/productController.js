const Product = require('../../models/productModel');
const { uploadMultipleFilesToS3 } = require('../../utils/awsUtil');

// @desc    Create new product
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const { files, body } = req;
    console.log("Body is ",body)
    console.log("Files are ",files)
    // Validate required fields
    if (!files|| files.length === 0) {
      return res.status(400).json({ success: false, error: 'At least one image is required' });
    }

    // Upload all images
    const imageUrls = await uploadMultipleFilesToS3(files);

    // Parse product details from JSON string
    const parsedDetails = body.details ? JSON.parse(body.details) : [];

    // Create product with parsed data
    const product = await Product.create({
      name: body.name,
      category: body.category,
      rate: parseFloat(body.rate),
      description: body.description,
      images: imageUrls,
      details: parsedDetails
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ code: 200, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
const getProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { count: 1 } }, // Atomic increment operation
      { new: true } // Return the updated document
    );
    if (!product) {
      return res.status(404).json({ code:404, error: 'Product not found' });
    }
    res.status(200).json({ code:200,success: true, data: product });
  } catch (error) {
    res.status(500).json({ code:500,success: false, error: 'Server Error' });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { files, body } = req;
    const updates = {};
    
    // Handle file uploads
    if (files?.images) {
      const newImages = await uploadMultipleFilesToS3(files.images);
      updates.$push = { images: { $each: newImages } };
    }

    // Handle text updates
    const allowedFields = ['name', 'category', 'rate', 'description', 'details', 'status'];
    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        if (field === 'rate') {
          updates[field] = parseFloat(body[field]);
        } else if (field === 'details') {
          updates[field] = JSON.parse(body[field]);
        } else {
          updates[field] = body[field];
        }
      }
    });

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct
};