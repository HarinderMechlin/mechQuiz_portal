const monogoose = require("mongoose");

const questionSchema = monogoose.Schema({
  question_id: {
    type: String,
    required: true,
  },
  dificulty: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isMutipleSelection: {
    type: String,
    required: true,
  },
  question_content: {
    type: String,
    required: true,
  },
  ans1: {
    type: String,
    required: true,
  },
  ans2: {
    type: String,
    required: true,
  },
  ans3: {
    type: String,
    required: true,
  },
  ans4: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = monogoose.model("question", questionSchema);
