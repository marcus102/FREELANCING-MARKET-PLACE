const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: [true, 'Image URL not provided!']
    },
    privacy: {
      type: String,
      enum: ['public', 'private', 'shared'],
      default: 'public'
    },
    fileFormat: {
      type: String,
      validate: {
        validator: function(value) {
          // Define the accepted image formats (add or remove as needed)
          const acceptedFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

          // Extract the file extension from the value
          const fileExtension = this.imageUrl
            .toLowerCase()
            .split('.')
            .pop();

          // Check if the file extension is in the accepted formats
          return acceptedFormats.includes(fileExtension);
        },
        message: 'Invalid file format. Accepted formats: jpg, jpeg, png, gif, bmp'
      }
    },
    size: Number,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User must be provided!']
    },
    username: String,
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post'
    },
    comment: {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment'
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

imageSchema.pre('findOneAndUpdate', function(next) {
  this.getUpdate().updatedAt = Date.now();

  next();
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
