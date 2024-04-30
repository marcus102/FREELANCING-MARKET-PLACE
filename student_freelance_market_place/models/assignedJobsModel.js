const mongoose = require('mongoose');

const assignedJobsSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, 'The job title is required!']
  },
  description: {
    type: String
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The client info is required to perform this action']
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The freelancer info is required to perform this action']
  },
  status: {
    type: String,
    enum: ['assigned', 'in_progress', 'completed', 'cancelled'],
    default: 'assigned'
  },
  assignedDate: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: null
  },
  deadline: {
    type: Date
  }
});

assignedJobsSchema.virtual('images', {
  ref: 'Image',
  localField: '_id',
  foreignField: 'jobAssignment'
});

assignedJobsSchema.virtual('payment', {
  ref: 'Payment',
  localField: '_id',
  foreignField: 'jobAssignment'
});

assignedJobsSchema.virtual('timeRemaining').get(function() {
  if (!this.deadline) return null;
  const now = new Date();
  return this.deadline - now;
});

assignedJobsSchema.pre('findOneAndUpdate', function(next) {
  this.getUpdate().updatedAt = Date.now();

  next();
});

const AssignedJobs = mongoose.model('AssignedJobs', assignedJobsSchema);

module.exports = AssignedJobs;
