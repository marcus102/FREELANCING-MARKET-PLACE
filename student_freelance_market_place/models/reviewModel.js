const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Please! provide a review']
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating.'],
      min: [1, 'Rating must be at least 1.'],
      max: [5, 'Rating must not exceed 5.']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: null
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'username image'
  });

  next();
});

reviewSchema.pre('findOneAndUpdate', function(next) {
  this.getUpdate().updatedAt = Date.now();
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
