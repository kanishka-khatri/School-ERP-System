// // //ResultRoutes.js

// // const express = require('express');
// // const router = express.Router();
// // const Result = require('../models/Result'); // Assuming you have a Result model
// // const Student = require('../models/Student');

// // // Add a route for teachers to upload marks for a student
// // router.post('/:studentId/upload', async (req, res) => {
// //     const { studentId } = req.params;
// //     const { subject, marks, teacherId } = req.body;

// //     try {
// //         // Find the student by ID
// //         const student = await Student.findById(studentId);

// //         // Add the result to the student's results array
// //         student.results.push({ subject, marks, teacher: teacherId });
// //         await student.save();

// //         res.status(201).json({ message: 'Marks uploaded successfully' });
// //     } catch (error) {
// //         res.status(500).json({ message: 'Error uploading marks', error });
// //     }
// // });

// // router.get('/student/rollNumber/:rollNumber', async (req, res) => {
// //     const { rollNumber } = req.params;
  
// //     try {
// //       // Find the student by roll number
// //       const student = await Student.findOne({ rollNumber });
  
// //       // Check if the student exists
// //       if (!student) {
// //         return res.status(404).json({ message: 'Student not found' });
// //       }
  
// //       // Find all results for the given student ID
// //       const results = await Result.find({ student: student._id }).populate('teacher', 'name');
  
// //       // Check if there are any results
// //       if (results.length === 0) {
// //         return res.status(404).json({ message: 'No results found for this student' });
// //       }
  
// //       // Respond with the results
// //       res.status(200).json(results);
// //     } catch (error) {
// //       console.error('Error fetching student results:', error);
// //       res.status(500).json({ message: 'Server error' });
// //     }
// //   });
  
// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const Result = require('../models/Result');
// const Student = require('../models/Student');
// const { uploadMarks } = require('../controllers/ResultController');
// router.post('/upload-marks', uploadMarks);
// router.get('/student/rollNumber/:rollNumber', async (req, res) => {
//   const { rollNumber } = req.params;

//   try {
//     // Find the student by roll number
//     const student = await Student.findOne({ rollNumber });

//     // Check if the student exists
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     // Find all results for the given student ID
//     const results = await Result.find({ student: student._id }).populate('teacher', 'name');

//     // Check if there are any results
//     if (results.length === 0) {
//       return res.status(404).json({ message: 'No results found for this student' });
//     }

//     // Respond with the results
//     res.status(200).json(results);
//   } catch (error) {
//     console.error('Error fetching student results:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// module.exports = router;
// Example for Result Routes (routes/ResultRoutes.js)
const Result = require('../models/Result');
const Student = require('../models/Student');
const express = require('express');
const router = express.Router();
const { uploadMarks } = require('../controllers/ResultController');

router.post('/upload-marks', uploadMarks);

module.exports = router;
