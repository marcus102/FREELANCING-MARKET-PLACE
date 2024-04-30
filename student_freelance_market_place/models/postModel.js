const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    stack: {
      type: [String],
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    availability: {
      type: Boolean,
      default: true
    },
    status: {
      type: String,
      enum: ['draft', 'pending', 'rejected', 'published'],
      default: 'draft'
    },
    flagged: {
      type: Boolean,
      default: false
    },
    likeCount: {
      type: Number,
      default: 0
    },
    created_at: {
      type: Date,
      default: Date.now()
    },
    updated_at: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

postSchema.virtual('image', {
  ref: 'Image',
  localField: '_id',
  foreignField: 'post'
});

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});

postSchema.virtual('categories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'post'
});

postSchema.virtual('contributors', {
  ref: 'Contributor',
  localField: '_id',
  foreignField: 'post'
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
