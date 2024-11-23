// // routes/TeacherRoutes.js

// const express = require('express');
// const Teacher = require('../models/Teacher');
// const router = express.Router();

// // Marks Submission Route
// router.post('/upload-marks', async (req, res) => {
//   const { className, students } = req.body;
  
//   try {
//     // Save marks to the database or perform any required action
//     res.status(201).json({ message: 'Marks uploaded successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error uploading marks' });
//   }
// });

// // Teacher login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       // Check if teacher exists
//       const teacher = await Teacher.findOne({ email });
//       if (!teacher) {
//         return res.status(400).json({ message: 'Invalid Email or Password' });
//       }
  
//       // Check if password matches
//       const isMatch = await bcrypt.compare(password, teacher.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid Email or Password' });
//       }
  
//       // If login is successful, return teacher details
//       res.status(200).json({
//         message: 'Login successful',
//         teacher: {
//           id: teacher._id,
//           name: teacher.name,
//           email: teacher.email,
//           subject: teacher.subject,
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   });

//   // Register a new teacher
// router.post('/register', async (req, res) => {
//     const { name, subject, email, password } = req.body;
  
//     try {
//       const teacherExists = await Teacher.findOne({ email });
//       if (teacherExists) {
//         return res.status(400).json({ message: 'Teacher already exists' });
//       }
  
//       const teacher = new Teacher({ name, subject, email, password });
//       await teacher.save();
//       res.status(201).json({ message: 'Teacher registered successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });

// module.exports = router;
// routes/TeacherRoutes.js
// routes/TeacherRoutes.js

const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Result = require('../models/Result');
const bcrypt = require('bcryptjs');

// Register a new teacher
router.post('/register', async (req, res) => {
  const { name, subject, email, password } = req.body;

  try {
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    const teacher = new Teacher({
      name,
      subject,
      email,
      password,
    });

    await teacher.save();
    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Teacher login route
// Teacher login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the teacher exists
      console.log(`Attempting to find teacher with email: ${email}`);
      const teacher = await Teacher.findOne({ email: email.trim() }); // Added `.trim()` to remove extra spaces
  
      if (!teacher) {
        console.log(`Teacher not found with email: ${email}`);
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      console.log(`Teacher found: ${JSON.stringify(teacher)}`);
  
      // Validate the password
      const isMatch = await bcrypt.compare(password, teacher.password);
      console.log(`Password comparison result for email ${email}: ${isMatch}`);
  
      if (!isMatch) {
        console.log(`Password does not match for email: ${email}`);
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // If login is successful, return teacher details (excluding the password)
      res.status(200).json({
        message: 'Login successful',
        teacher: {
          id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          subject: teacher.subject,
        },
      });
    } catch (error) {
      console.error('Server error during login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

router.get('/profile', async (req, res) => {
  const { email } = req.query;

  console.log(`Fetching profile for email: ${email}`); // Add this line

  if (!email) {
    console.error('No email provided');
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      console.error(`Teacher not found for email: ${email}`);
      return res.status(404).json({ message: 'Teacher not found' });
    }

    console.log(`Teacher found: ${teacher}`);
    res.json({
      name: teacher.name,
      email: teacher.email,
      subject: teacher.subject,
    });
  } catch (error) {
    console.error('Error fetching teacher profile:', error); // More detailed logging
    res.status(500).json({ message: 'Server error' });
  }
});
// Check if all required fields exist
router.post('/upload-marks', async (req, res) => {
  const { marksData, className, teacherEmail } = req.body;

  if (!marksData || !Array.isArray(marksData)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  try {
    const resultsPromises = marksData.map(async (data) => {
      const { studentName, rollNumber, subject, marks } = data;

      // Validation check
      if (!studentName || !rollNumber || !subject || typeof marks !== 'number') {
        console.error('Validation error:', { studentName, rollNumber, subject, marks });
        throw new Error('Missing required fields');
      }

      // Find student by roll number
      const student = await Student.findOne({ rollNumber });  // Ensure this works

      if (!student) {
        throw new Error(`Student with roll number ${rollNumber} not found`);
      }

      // Save result for this student
      const newResult = new Result({
        student: student._id,  // Reference student by _id
        rollNumber,
        subject,
        marks,
        className,
        teacherEmail          // Optionally save teacher email
      });

      return newResult.save();
    });

    await Promise.all(resultsPromises);

    res.status(200).json({ message: 'Marks uploaded successfully' });
  } catch (err) {
    console.error('Error saving marks:', err.message);
    res.status(500).json({ error: err.message || 'Server Error' });
  }
});



module.exports = router;