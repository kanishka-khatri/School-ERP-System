// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const studentRoutes = require('./routes/StudentRoutes');
// const teacherRoutes = require('./routes/TeacherRoutes');
// const resultRoutes = require('./routes/ResultRoutes');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // API routes
// app.use('/api/students', studentRoutes);
// app.use('/api/teachers', teacherRoutes);
// app.use('/api/results', resultRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Server Error' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/StudentRoutes');
const teacherRoutes = require('./routes/TeacherRoutes');
const resultRoutes = require('./routes/ResultRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/results', resultRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));