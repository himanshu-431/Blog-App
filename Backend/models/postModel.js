import mongoose from 'mongoose';

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  image: {
    type: String, // Assuming the image is stored as a URL or file path
    required: true
  }
},
  {
    timestamps: true
  }
);

// Create the Post model
export const Post = mongoose.model('Post', postSchema);

