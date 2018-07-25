const mongoose = require("mongoose");

const Student = mongoose.model("students");
const Class = mongoose.model("classes");
const User = mongoose.model("user");

module.exports = app => {
  app.post("/update/student", async (req, res) => {
    const id = req.body.id;
    Student.findById(id).then((err, student) => {
      if (err) {
        return res.status(501).json({
          message: "error"
        });
      }

      student.name = req.body.name;
      student.email = req.body.email;
      student.phoneNumber = req.body.phoneNumber;
      student.parentUser = req.body.parentUser;
      student.classes = req.body.classes;
      student.classesIds = req.body.classesIds;
      student.totalFees = req.body.totalFees;
      student.paid = req.body.paid;
      student.save();

      res.status(200).json({
        student: student,
        message: "student updated"
      });
    });
  });

  app.post("/update/class", async (req, res) => {
    const id = req.body.id;
    Class.findById(id).then((err, danceClass) => {
      if (err) {
        return res.status(501).json({
          message: "error"
        });
      }

      danceClass.name = req.body.name;
      danceClass.dayOfWeek = req.body.dayOfWeek;
      danceClass.time = req.body.time;
      danceClass.students = req.body.students;
      danceClass.users = req.body.users;
      danceClass.fee = req.body.fee;
      danceClass.save();

      res.status(200).json({
        class: danceClass,
        message: "class updated"
      });
    });
  });

  app.post("/update/user", async (req, res) => {
    const id = req.body.id;
    User.findById(id).then((err, user) => {
      if (err) {
        return res.status(501).json({
          message: "error"
        });
      }

      user.name = req.body.name;
      user.email = req.body.email;
      user.students = req.body.students;
      user.save()

      res.status(200).json({
          user: user,
          message: "user updated"
      })
    });
  });
};
