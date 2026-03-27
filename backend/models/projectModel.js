import mongoose from 'mongoose'

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }],

  startDate: {
    type: Date,
    default: null
  },

  deadline: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    enum: ['active', 'completed', 'on-hold'],
    default: 'active'
  },

  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },

  aiSummary: {
    type: String,
    default: null
  }

}, { timestamps: true })

const projectModel = mongoose.model('projects', projectSchema)

export default projectModel
