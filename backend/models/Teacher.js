// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const teacherSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   subject: {
//     type: String,
//     required: true,
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
// });
// // Pre-save hook to hash the password before saving
// teacherSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     console.log(`Password hashed for email: ${this.email}`);
//     next();
//   } catch (error) {
//     console.error('Error hashing password:', error);
//     next(error);
//   }
// });
// // Method to compare entered password with hashed password in DB
// teacherSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };
// module.exports = mongoose.model('Teacher', teacherSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
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
});

// Pre-save hook to hash the password before saving
teacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(`Password hashed for email: ${this.email}`);
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

// Method to compare entered password with hashed password in DB
teacherSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Teacher', teacherSchema);
