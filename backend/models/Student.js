// // // models/Student.js
// // const mongoose = require('mongoose');

// // const studentSchema = mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //   },
// //   class: {
// //     type: String,
// //     required: true,
// //   },
// //   rollNumber: {
// //     type: Number,
// //     required: true,
// //     unique: true,
// //   },
// //   results: [
// //     {
// //       subject: String,
// //       marks: Number,
// //       teacher: {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: 'Teacher', // Reference to the teacher who uploaded the marks
// //       },
// //     },
// //   ],
// // });

// // module.exports = mongoose.model('Student', studentSchema);
// // models/Student.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const studentSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   class: {
//     type: String,
//     required: true,
//   },
//   rollNumber: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   results: [
//     {
//       subject: String,
//       marks: Number,
//       teacher: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Teacher',
//       },
//     },
//   ],
// }, { timestamps: true });

// // Hash password before saving
// studentSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });
// const Student = mongoose.model('Student', studentSchema);
// module.exports = Student;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    results: [
      {
        subject: String,
        marks: Number,
        teacher: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Teacher',
        },
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
