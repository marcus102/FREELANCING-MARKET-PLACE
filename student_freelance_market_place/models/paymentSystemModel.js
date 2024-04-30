const mongoose = require('mongoose');

// Define the Payment schema
const paymentSchema = new mongoose.Schema(
  {
    jobAssignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AssignedJobs'
    },
    soldProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'N'],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'cancelled', 'failed'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'paypal', 'bank_transfer', 'crypto'],
      required: true
    },
    paymentDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
