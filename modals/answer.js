const monogoose = require("mongoose");

const answerSchema = monogoose.Schema({
  question_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = monogoose.model("answer", answerSchema);
