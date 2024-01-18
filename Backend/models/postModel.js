import mongoose from 'mongoose';

// Post schema
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
    type: String, // Image is stored as a URL or file path
    required: true
  }
},
  {
    timestamps: true
  }
);

// Post model
export const Post = mongoose.model('Post', postSchema);

