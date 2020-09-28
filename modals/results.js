const monogoose = require("mongoose");

const resultsSchema = monogoose.Schema({
  job_seeker_id: {
    type: String,
    required: true,
  },
  total_question: {
    type: String,
    required: true,
  },
  wrong_answer: {
    type: String,
    required: true,
  },
  correct_answer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = monogoose.model("results", resultsSchema);
