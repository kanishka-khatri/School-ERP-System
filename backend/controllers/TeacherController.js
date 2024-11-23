// backend/controllers/teacherController.js
const Teacher = require('../models/Teacher');
exports.createTeacher = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getTeacherProfile = async (req, res) => {
  try {
    const email = req.query.email;
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Return full teacher profile (name, email, subject)
    res.json({
      name: teacher.name,
      email: teacher.email,
      subject: teacher.subject,
    });
  } catch (error) {
    console.error('Error fetching teacher profile:', error);
    res.status(500).send({ message: 'Error fetching profile' });
  }
};