// // // // // // // const mongoose = require('mongoose');

// // // // // // // const resultSchema = mongoose.Schema({
// // // // // // //   student: {
// // // // // // //     type: mongoose.Schema.Types.ObjectId,
// // // // // // //     ref: 'Student',
// // // // // // //     required: true,
// // // // // // //   },
// // // // // // //   subject: {
// // // // // // //     type: String,
// // // // // // //     required: true,
// // // // // // //   },
// // // // // // //   marks: {
// // // // // // //     type: Number,
// // // // // // //     required: true,
// // // // // // //   },
// // // // // // //   className: { // New field to store the class information
// // // // // // //     type: String,
// // // // // // //     required: true,
// // // // // // //   },
// // // // // // // });

// // // // // // // const Result = mongoose.model('Result', resultSchema);

// // // // // // // module.exports = Result;
// // // // // // const mongoose = require('mongoose');

// // // // // // const resultSchema = mongoose.Schema({
// // // // // //   student: {
// // // // // //     type: mongoose.Schema.Types.ObjectId,
// // // // // //     ref: 'Student',
// // // // // //     required: true,
// // // // // //   },
// // // // // //   rollNumber: {
// // // // // //     type: String, // Assuming rollNumber is a string
// // // // // //     required: true,
// // // // // //   },
// // // // // //   subject: {
// // // // // //     type: String,
// // // // // //     required: true,
// // // // // //   },
// // // // // //   marks: {
// // // // // //     type: Number,
// // // // // //     required: true,
// // // // // //   },
// // // // // //   teacher: {
// // // // // //     type: mongoose.Schema.Types.ObjectId,
// // // // // //     ref: 'Teacher',
// // // // // //     required: true,
// // // // // //   },
// // // // // //   className: {
// // // // // //     type: String,
// // // // // //     required: true,
// // // // // //   },
// // // // // // }, {
// // // // // //   timestamps: true, // Adds createdAt and updatedAt timestamps
// // // // // // });

// // // // // // const Result = mongoose.model('Result', resultSchema);

// // // // // // module.exports = Result;
// // // // // const resultSchema = mongoose.Schema({
// // // // //   student: { // Reference to the Student collection
// // // // //     type: mongoose.Schema.Types.ObjectId,
// // // // //     ref: 'Student',
// // // // //     required: true,
// // // // //   },
// // // // //   rollNumber: {
// // // // //     type: String,
// // // // //     required: true,
// // // // //   },
// // // // //   subject: {
// // // // //     type: String,
// // // // //     required: true,
// // // // //   },
// // // // //   marks: {
// // // // //     type: Number,
// // // // //     required: true,
// // // // //   },
// // // // //   teacher: {
// // // // //     type: mongoose.Schema.Types.ObjectId,
// // // // //     ref: 'Teacher',
// // // // //     required: true,
// // // // //   },
// // // // //   className: {
// // // // //     type: String,
// // // // //     required: true,
// // // // //   },
// // // // // }, {
// // // // //   timestamps: true,
// // // // // });

// // // // // const Result = mongoose.model('Result', resultSchema);

// // // // // module.exports = Result;
// // // // const resultSchema = mongoose.Schema({
// // // //   student: {
// // // //     type: String,
// // // //     required: true,
// // // //   },
// // // //   rollNumber: {
// // // //     type: String,
// // // //     required: true,
// // // //   },
// // // //   subject: {
// // // //     type: String,
// // // //     required: true,
// // // //   },
// // // //   marks: {
// // // //     type: Number,
// // // //     required: true,
// // // //   },
// // // //   teacher: {
// // // //     type: mongoose.Schema.Types.ObjectId,
// // // //     ref: 'Teacher',
// // // //     required: true,
// // // //   },
// // // //   className: {
// // // //     type: String,
// // // //     required: true,
// // // //   },
// // // // }, {
// // // //   timestamps: true,
// // // // });

// // // // const Result = mongoose.model('Result', resultSchema);

// // // // module.exports = Result;
// // // const mongoose = require('mongoose'); 
// // // const resultSchema = mongoose.Schema({
// // //   student: {
// // //     type: mongoose.Schema.Types.ObjectId,
// // //     ref: 'Student', // Reference to the Student model
// // //     required: true,
// // //   },
// // //   rollNumber: {
// // //     type: String,
// // //     required: true,
// // //   },
// // //   subject: {
// // //     type: String,
// // //     required: true,
// // //   },
// // //   marks: {
// // //     type: Number,
// // //     required: true,
// // //   },
// // //   teacher: {
// // //     type: mongoose.Schema.Types.ObjectId,
// // //     ref: 'Teacher',
// // //     required: true,
// // //   },
// // //   className: {
// // //     type: String,
// // //     required: true,
// // //   },
// // // }, {
// // //   timestamps: true,
// // // });

// // // const Result = mongoose.model('Result', resultSchema);

// // // module.exports = Result;
// // const mongoose = require('mongoose');
// // const resultSchema = mongoose.Schema({
// //   student: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'Student', // Reference to the Student model
// //     required: true,
// //   },
// //   studentName: { // Add studentName to the schema
// //     type: String,
// //     required: true,
// //   },
// //   rollNumber: {
// //     type: String,
// //     required: true,
// //   },
// //   subject: {
// //     type: String,
// //     required: true,
// //   },
// //   marks: {
// //     type: Number,
// //     required: true,
// //   },
// //   teacher: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'Teacher',
// //     required: true,
// //   },
// //   className: {
// //     type: String,
// //     required: true,
// //   },
// // }, {
// //   timestamps: true,
// // });
// // const Result = mongoose.model('Result', resultSchema);
// // module.exports = Result;
// const mongoose = require('mongoose');
// const resultSchema = mongoose.Schema(
//   {
//     student: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Student', // Reference to the Student model
//       required: true,
//     },
//     studentName: { 
//       type: String,
//       required: true,
//     },
//     rollNumber: {
//       type: String,
//       required: true,
//     },
//     subject: {
//       type: String,
//       required: true,
//     },
//     marks: {
//       type: Number,
//       required: true,
//     },
//     teacher: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Teacher',
//       required: true,
//     },
//     className: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Result = mongoose.model('Result', resultSchema);

// module.exports = Result;
const mongoose = require('mongoose');
const resultSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  subject: { type: String, required: true },
  marks: { type: Number, required: true },
  className: { type: String, required: true },
  teacher: { type: String, required: true } // This field might be `teacherEmail` in your frontend
});
const Result = mongoose.model('Result', resultSchema);

module.exports = Result;