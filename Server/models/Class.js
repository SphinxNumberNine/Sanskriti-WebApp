const mongoose = require("mongoose");
const { Schema } = mongoose;

const classSchema = new Schema({
  name: String,
  dayOfWeek: String,
  time: String,
  students: Array,
  users: Array,
  fee: String
});

mongoose.model("classes", classSchema);
