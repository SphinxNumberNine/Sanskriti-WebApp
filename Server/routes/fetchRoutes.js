const mongoose = require("mongoose");

const Student = mongoose.model("students");
const Class = mongoose.model("classes");
const User = mongoose.model("users");

module.exports = app => {
  app.post("/api/fetch/student", async (req, res) => {
    const id = req.body.id;
    Student.findById(id).then(student => {
      res.status(200).json({
        student: student,
        message: "found student"
      });
    });
  });

  app.post("/api/fetch/class", async (req, res) => {
    const id = req.body.id;
    Class.findById(id).then(danceClass => {
      res.status(200).json({
        danceClass: danceClass,
        message: "found class"
      });
    });
  });
};
