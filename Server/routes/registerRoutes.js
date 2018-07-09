const mongoose = require('mongoose');

const Student = mongoose.model("students");

module.exports = app => {
  app.post('/register/student', async (req, res) => {

    const student = await new Student({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        parentUser: req.body.parentUser,
        classes: req.body.classes,
        totalFees: req.body.totalFees,
        paid: req.body.paid
    }).save();

    res.status(200).json({
        message: "student saved"
    })
  });

  app.post('/api/students', async (req, res) => {
    const parentId = req.body.parentId;
    const students = await Student.find({parentUser: parentId});
    //console.log(students);
    res.status(200).json({
        "students": students
    });
  });
};
