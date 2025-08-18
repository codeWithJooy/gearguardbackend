const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  rate: {  // Changed from 'price' to 'rate' to match UI
    type: Number,
    required: [true, 'Rate is required'],
    min: [0, 'Rate cannot be negative']
  },
  images: [{
    type: String,
    required: [true, 'At least one image is required']
  }],
  details: [{  // Added details array
    title: {
      type: String,
      required: [true, 'Detail title is required']
    },
    value: {
      type: String,
      required: [true, 'Detail value is required']
    }
  }],
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  count:{
    type:Number,
    default:0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);