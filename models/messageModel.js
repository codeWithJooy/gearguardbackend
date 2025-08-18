const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  first: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true
  },
  last: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  responseDate: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    required: [true, 'Message cannot be empty'],
    trim: true
  },
  lookingFor:{
    type:String,
  },
  buyingFor:{
    type:String,
  },
  who:{
    type:String,
  },
  frequency:{
    type:String,
  },
  status: {
    type: String,
    enum: ['unread', 'contacted', 'archived'],
    default: 'unread'
  }
});

module.exports = mongoose.model('Message', messageSchema);