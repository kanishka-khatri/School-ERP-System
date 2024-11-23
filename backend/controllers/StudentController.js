// const Student = require('../models/Student');
// const Result = require('../models/Result');

// // Create a new student
// exports.createStudent = async (req, res) => {
//   try {
//     const newStudent = new Student(req.body);
//     await newStudent.save();
//     res.status(201).json(newStudent);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all students
// exports.getStudents = async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.status(200).json(students);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update student logic
// exports.updateStudent = async (req, res) => {
//   const { id } = req.params; // Get ID from route parameters
//   const updateData = req.body; // Get the updated data from the body

//   try {
//     // Find the student by ID and update it
//     const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

//     // If student not found, send 404
//     if (!updatedStudent) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     // Return the updated student
//     res.status(200).json(updatedStudent);
//   } catch (error) {
//     console.error('Error updating student:', error);
//     res.status(400).json({ message: error.message });
//   }
// };

// // Bulk add students
// exports.createMultipleStudents = async (req, res) => {
//   try {
//     const students = req.body; // Expecting an array of student objects
//     const newStudents = await Student.insertMany(students); // Insert multiple students at once
//     res.status(201).json(newStudents); // Respond with the created students
//   } catch (error) {
//     res.status(400).json({ message: error.message }); // Handle errors
//   }
// };

// // Fetch student profile and their results
// exports.getStudentProfile = async (req, res) => {
//   const { rollNumber } = req.query;

//   if (!rollNumber) {
//     return res.status(400).json({ message: 'Roll number is required' });
//   }

//   try {
//     // Find the student by roll number
//     const student = await Student.findOne({ rollNumber });

//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     // Fetch all results for this student using their name and class
//     const results = await Result.find({ student: student.name, className: student.class });

//     // Respond with the student's profile and results
//     res.status(200).json({
//       profile: {
//         name: student.name,
//         class: student.class,
//         rollNumber: student.rollNumber,
//       },
//       results,
//     });
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// controllers/StudentController.js
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register a new student
exports.registerStudent = async (req, res) => {
  const { name, class: studentClass, rollNumber, email, password } = req.body;

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const student = new Student({ name, class: studentClass, rollNumber, email, password });
    await student.save();

    res.status(201).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      class: student.class,
      rollNumber: student.rollNumber,
      token: generateToken(student._id),
    });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

// Student login
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (student && (await bcrypt.compare(password, student.password))) {
      res.json({
        _id: student._id,
        name: student.name,
        email: student.email,
        class: student.class,
        rollNumber: student.rollNumber,
        token: generateToken(student._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

// Get student profile
exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-password');
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};
