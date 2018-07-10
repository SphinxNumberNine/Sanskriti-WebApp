const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: String,
  email: String,
  phoneNumber: String,
  parentUser: String,
  totalFees: String,
  paid: Boolean,
  classes: Array
});

mongoose.model("students", studentSchema);
