import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[0-9+ ]{10,15}$/, 'Please provide a valid phone number'],
    },
    category: {
      type: String,
      trim: true,
      default: 'General Enquiry',
      maxlength: [80, 'Category cannot exceed 80 characters'],
    },
    product: {
      type: String,
      trim: true,
      default: '',
      maxlength: [120, 'Product name cannot exceed 120 characters'],
    },
    message: {
      type: String,
      trim: true,
      default: '',
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    source: {
      type: String,
      default: 'Website Contact Form',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;

