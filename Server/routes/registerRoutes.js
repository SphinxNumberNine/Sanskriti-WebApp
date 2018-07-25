const mongoose = require("mongoose");

const Student = mongoose.model("students");
const Class = mongoose.model("classes");

module.exports = app => {

  app.post("/register/student", async (req, res) => {
    const student = await new Student({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      parentUser: req.body.parentUser,
      classes: req.body.classes,
      classesIds: req.body.classesIds,
      totalFees: req.body.totalFees,
      paid: req.body.paid
    }).save();

    res.status(200).json({
      student: student,
      message: "student saved"
    });
  });

  app.post("/register/class", async (req, res) => {
    const danceClass = await new Class({
      name: req.body.name,
      dayOfWeek: req.body.dayOfWeek,
      time: req.body.time,
      students: req.body.students,
      users: req.body.users,
      fee: req.body.fee
    }).save();

    res.status(200).json({
      message: "class saved"
    })
  });

  app.post("/api/students", async (req, res) => {
    const parentId = req.body.parentId;
    const students = await Student.find({ parentUser: parentId });
    //console.log(students);
    res.status(200).json({
      students: students
    });
  });

  app.get("/api/classes", async (req, res) => {
    const classes = await Class.find({});

    res.status(200).json({
      classes: classes
    });
  })
};
