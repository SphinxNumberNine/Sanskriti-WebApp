const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    phoneNumber: String,
    googleId: String,
    students: Array
});

mongoose.model("users", userSchema);