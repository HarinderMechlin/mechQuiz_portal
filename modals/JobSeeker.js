const monogoose = require("mongoose");

const JobSeekerSchema = monogoose.Schema({
  job_seeker_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  isQuizRequired: {
    type: Boolean,
    required: true
  },
  quizMailReceived: {
    type: Boolean,
    required: true
  },
  testGiven: {
    type: Boolean,
    required: true
  },
  resultMailReceived: {
    type: Boolean,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = monogoose.model("Job_seeker", JobSeekerSchema);
