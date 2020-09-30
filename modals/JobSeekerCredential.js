const monogoose = require("mongoose");

const jscSchema = monogoose.Schema({
  job_seeker_id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  expireOn: {
    type: String,
    required: true
  },
  isExpired: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = monogoose.model("job_seeker_credential", jscSchema);
