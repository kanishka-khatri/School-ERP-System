// // // // const Student = require('../../models/Student');
// // // // const Teacher = require('../../models/Teacher');
// // // // const Result = require('../../models/Result'); // Import the Result model

// // // // // Upload marks for multiple students
// // // // const uploadMarks = async (req, res) => {
// // // //   const { teacherId, subject, marksData } = req.body;

// // // //   try {
// // // //     // Check if the teacher exists
// // // //     const teacher = await Teacher.findById(teacherId);
// // // //     if (!teacher) {
// // // //       return res.status(404).json({ message: 'Teacher not found' });
// // // //     }

// // // //     // Iterate over the marksData array to create Result entries for each student
// // // //     for (const data of marksData) {
// // // //       const { studentId, marks } = data;

// // // //       // Check if the student exists
// // // //       const student = await Student.findById(studentId);
// // // //       if (!student) {
// // // //         return res.status(404).json({ message: `Student with ID ${studentId} not found` });
// // // //       }

// // // //       // Create a new Result entry for this student, subject, and teacher
// // // //       const result = new Result({
// // // //         student: studentId,
// // // //         subject,
// // // //         marks,
// // // //         teacher: teacherId,
// // // //       });

// // // //       // Save the Result document
// // // //       await result.save();
// // // //     }

// // // //     res.status(200).json({ message: 'Marks uploaded successfully' });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Error uploading marks', error });
// // // //   }
// // // // };

// // // // module.exports = { uploadMarks };
// // // // backend/controllers/ResultController.js

// // // const Student = require('../models/Student');
// // // const Teacher = require('../models/Teacher');
// // // const Result = require('../models/Result'); 
// // // // Upload marks for multiple students
// // // exports.uploadMarks = async (req, res) => {
// // //   const { className, marksData } = req.body;
// // //   if (!className || !marksData) {
// // //     return res.status(400).json({ error: 'Missing required fields' });
// // //   }

// // //   try {
// // //     const missingFields = marksData.some(
// // //       (data) => !data.rollNumber || !data.subject || typeof data.marks !== 'number'
// // //     );

// // //     if (missingFields) {
// // //       return res.status(400).json({ error: 'Marks data has missing required fields' });
// // //     }

// // //     await Result.insertMany(marksData.map((data) => ({ ...data, className })));
// // //     res.status(200).json({ message: 'Marks uploaded successfully' });
// // //   } catch (err) {
// // //     console.error('Error saving marks:', err);
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // };




// // // exports.uploadMarks = async (req, res) => {
// // //   const { className, marksData } = req.body;
  
// // //   if (!className || !marksData) {
// // //     return res.status(400).json({ error: 'Missing required fields' });
// // //   }

// // //   try {
// // //     // Validate each entry in marksData
// // //     for (const data of marksData) {
// // //       if (!data.rollNumber || !data.subject || typeof data.marks !== 'number') {
// // //         return res.status(400).json({ error: 'Marks data has missing required fields' });
// // //       }
      
// // //       // Fetch the student object ID using rollNumber
// // //       const student = await Student.findOne({ rollNumber: data.rollNumber });
// // //       if (!student) {
// // //         return res.status(404).json({ error: `Student with roll number ${data.rollNumber} not found` });
// // //       }
      
// // //       // Add the student ID to the marks data
// // //       data.student = student._id;
// // //     }

// // //     // Insert all marks data with the added student field
// // //     await Result.insertMany(marksData.map((data) => ({ ...data, className })));
    
// // //     res.status(200).json({ message: 'Marks uploaded successfully' });
// // //   } catch (err) {
// // //     console.error('Error saving marks:', err);
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // };

// // // exports.uploadMarks = async (req, res) => {
// // //   const { className, marksData } = req.body;

// // //   if (!className || !marksData || !Array.isArray(marksData)) {
// // //     return res.status(400).json({ error: 'Missing required fields or invalid marksData format' });
// // //   }

// // //   try {
// // //     const processedMarksData = await Promise.all(
// // //       marksData.map(async (data) => {
// // //         if (!data.rollNumber) {
// // //           throw new Error(`Missing rollNumber for a student in marksData`);
// // //         }

// // //         // Fetch student details
// // //         const student = await Student.findOne({ rollNumber: data.rollNumber });
// // //         if (!student) {
// // //           throw new Error(`Student with rollNumber ${data.rollNumber} not found`);
// // //         }

// // //         // Ensure studentName is fetched and added to the data
// // //         return {
// // //           ...data,
// // //           student: student._id,        // Link student ID
// // //           studentName: student.name,  // Include studentName
// // //           className,
// // //         };
// // //       })
// // //     );

// // //     await Result.insertMany(processedMarksData);
// // //     res.status(200).json({ message: 'Marks uploaded successfully' });
// // //   } catch (err) {
// // //     console.error('Error saving marks:', err.message);
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // };
// // const Student = require('../models/Student');
// // const Result = require('../models/Result');
// // exports.uploadMarks = async (req, res) => {
// //   const { className, marksData } = req.body;

// //   if (!className || !marksData || !Array.isArray(marksData)) {
// //     return res.status(400).json({ error: 'Missing required fields or invalid marksData format' });
// //   }
// //   if (!data.rollNumber) {
// //     console.error(`Validation error: Missing rollNumber for data:`, data);
// //     throw new Error(`Missing rollNumber for a student in marksData`);
// //   }
  
// //   if (!data.subject || !data.marks) {
// //     console.error(`Validation error: Missing subject or marks for data:`, data);
// //     throw new Error(`Missing subject or marks for a student in marksData`);
// //   }
  

// //   try {
// //     const processedMarksData = await Promise.all(
// //       marksData.map(async (data) => {
// //         if (!data.rollNumber) {
// //           console.error('Validation error: Missing rollNumber for data:', data);
// //           throw new Error('Missing rollNumber for a student in marksData');
// //         }
// //         const student = await Student.findOne({ rollNumber: data.rollNumber }); // Using Student
// //         if (!student) {
// //           throw new Error(`Student with rollNumber ${data.rollNumber} not found`);
// //         }
// //         return {
// //           ...data,
// //           student: student._id,
// //           studentName: student.name,
// //           className,
// //         };
// //       })
// //     );
    
    

// //     // Save all processed marks data to the database
// //     await Result.insertMany(processedMarksData);
// //     res.status(200).json({ message: 'Marks uploaded successfully' });
// //   } catch (err) {
// //     console.error('Error saving marks:', err.message);
// //     res.status(500).json({ error: err.message });
// //   }
// // };




// // // Fetch results by class name
// // // exports.getResultsByClass = async (req, res) => {
// // //   const { className } = req.params;

// // //   try {
// // //     // Ensure className is provided
// // //     if (!className) {
// // //       return res.status(400).json({ error: 'Class name is required' });
// // //     }

// // //     // Fetch results for the given class and populate student name and roll number
// // //     const results = await Result.find({ className }).populate('student', 'name rollNumber');

// // //     // Check if results exist
// // //     if (!results || results.length === 0) {
// // //       return res.status(404).json({ message: 'No results found for the given class' });
// // //     }

// // //     // Respond with the results
// // //     res.status(200).json(results);
// // //   } catch (error) {
// // //     console.error('Error fetching results:', error);
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // };
// const Student = require('../models/Student'); // Ensure this import is present
// const Result = require('../models/Result');
// console.log("Student model:", Student);
// exports.uploadMarks = async (req, res) => {
//   const { className, marksData } = req.body;

//   if (!className || !Array.isArray(marksData)) {
//     return res.status(400).json({ error: 'Invalid or missing input fields' });
//   }

//   try {
//     const processedMarksData = await Promise.all(
//       marksData.map(async (data) => {
//         if (!data.rollNumber || !data.subject || data.marks === undefined) {
//           throw new Error('Invalid marksData: Missing rollNumber, subject, or marks');
//         }

//         const student = await Student.findOne({ rollNumber: data.rollNumber });
//         if (!student) {
//           throw new Error(`Student with rollNumber ${data.rollNumber} not found`);
//         }

//         return {
//           ...data,
//           student: student._id,
//           studentName: student.name,
//           className,
//         };
//       })
//     );

//     await Result.insertMany(processedMarksData);
//     res.status(200).json({ message: 'Marks uploaded successfully' });
//   } catch (err) {
//     console.error('Error during marks upload:', err);  // Log the error for debugging
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.uploadMarks = async (req, res) => {
//   const { className, marksData, teacherEmail } = req.body;

//   if (!className || !Array.isArray(marksData)) {
//     return res.status(400).json({ error: 'Invalid or missing input fields' });
//   }

//   try {
//     // Find the teacher using email
//     const teacher = await Teacher.findOne({ email: teacherEmail });
//     if (!teacher) {
//       return res.status(404).json({ error: 'Teacher not found' });
//     }

//     const processedMarksData = await Promise.all(
//       marksData.map(async (data) => {
//         const { studentName, rollNumber, subject, marks } = data;

//         if (!studentName || !rollNumber || !subject || typeof marks !== 'number') {
//           throw new Error('Invalid marksData: Missing or incorrect fields');
//         }

//         const student = await Student.findOne({ rollNumber });
//         if (!student) {
//           throw new Error(`Student with rollNumber ${rollNumber} not found`);
//         }

//         return {
//           student: student._id,
//           studentName,
//           rollNumber,
//           subject,
//           marks,
//           className,
//           teacher: teacher._id, // Include teacher ID
//         };
//       })
//     );

//     await Result.insertMany(processedMarksData);
//     res.status(200).json({ message: 'Marks uploaded successfully' });
//   } catch (error) {
//     console.error('Error processing marks:', error.message, error.stack); // Add detailed logs
//     res.status(500).json({
//       message: 'Internal server error',
//       details: error.message,
//     });
  
//   }
// };

// const uploadMarks = async (req, res) => {
//   const { className, marksData, teacher } = req.body;

//   if (!teacher) {
//       return res.status(400).json({ error: "Teacher field is required." });
//   }

//   try {
//       // Save each student's marks
//       for (const marks of marksData) {
//           const student = await Student.findOne({ 
//               rollNumber: marks.rollNumber, 
//               class: className 
//           });

//           if (!student) {
//               return res.status(400).json({ 
//                   error: `Student with roll number ${marks.rollNumber} not found.` 
//               });
//           }

//           // Save the result
//           const result = new Result({
//               studentName: marks.studentName,
//               rollNumber: marks.rollNumber,
//               subject: marks.subject,
//               marks: marks.marks,
//               teacher, // Use teacher from the payload
//               class: className,
//           });

//           await result.save();
//       }

//       res.status(200).json({ message: "Marks saved successfully." });
//   } catch (err) {
//       console.error("Error saving marks:", err.message);
//       res.status(500).json({ error: err.message });
//   }
// };
const Student = require('../models/Student');
const Result = require('../models/Result');
const uploadMarks = async (req, res) => {
    const { className, marksData, teacherEmail } = req.body;
  
    if (!teacherEmail) {
        return res.status(400).json({ error: "Teacher email is required." });
    }
  
    try {
        // Save each student's marks
        for (const marks of marksData) {
            const student = await Student.findOne({ 
                rollNumber: marks.rollNumber, 
                class: className 
            });
  
            if (!student) {
                return res.status(400).json({ 
                    error: `Student with roll number ${marks.rollNumber} not found.` 
                });
            }
  
            // Save the result
            const result = new Result({
                studentName: marks.studentName,
                rollNumber: marks.rollNumber,
                subject: marks.subject,
                marks: marks.marks,
                teacherEmail, // Store teacher email instead of teacher object ID
                className, // Store className directly
            });
  
            await result.save();
        }
  
        res.status(200).json({ message: "Marks saved successfully." });
    } catch (err) {
        console.error("Error saving marks:", err.message);
        res.status(500).json({ error: err.message });
    }
  };
  module.exports = {
    uploadMarks,
};