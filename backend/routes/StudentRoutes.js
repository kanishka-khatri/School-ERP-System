// const express = require('express');
// const {
//   createStudent,
//   getStudents,
//   updateStudent,
//   createMultipleStudents,
//   getStudentProfile
// } = require('../controllers/StudentController');

// const router = express.Router();

// // POST route to add a student
// router.post('/', createStudent);

// // GET route to fetch all students
// router.get('/', getStudents);

// // PUT route to update students
// router.put('/:id', updateStudent);

// // POST route for bulk student creation
// router.post('/bulk', createMultipleStudents);

// // GET route to fetch a student's profile and results
// router.get('/profile', getStudentProfile);

// module.exports = router;
// routes/StudentRoutes.js
const express = require('express');
const { registerStudent, loginStudent, getStudentProfile } = require('../controllers/StudentController');
const protect = require('../middleware/authMiddleware');
const Result = require('../models/Result'); // Adjust the path to your model
const Student = require('../models/Student'); 
const router = express.Router();

// Register a student
router.post('/register', registerStudent);

// Student login
router.post('/login', loginStudent);

// Get student profile (Protected route)
router.get('/profile', protect, getStudentProfile);

router.get('/student/rollNumber/:rollNumber', async (req, res) => {
    const { rollNumber } = req.params;
  
    try {
      // Find the student by roll number
      const student = await Student.findOne({ rollNumber });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Find all results for the found student
      const results = await Result.find({ student: student._id }).populate('teacher', 'name');
  
      if (!results || results.length === 0) {
        return res.status(404).json({ message: 'No results found for this student' });
      }
  
      res.status(200).json(results);
    } catch (error) {
      console.error('Error fetching student results:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
