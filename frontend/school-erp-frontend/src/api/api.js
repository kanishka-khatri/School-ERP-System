// //frontend/src/api/api.js

// import axios from 'axios';

// // Base URL for all API requests
// const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// // Students API
// export const fetchStudents = () => API.get('/students');           // Get all students
// export const addStudent = (student) => API.post('/students', student);  // Add a student

// // PUT to update students (adjust the endpoint and data accordingly)
// export const updateStudent = (id, updatedData) => API.put(`/students/:id`, { id, ...updatedData });

// frontend/src/api/api.js

import axios from 'axios';

// Base URL for all API requests
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Students API
export const fetchStudents = () => API.get('/students');           // Get all students
export const addStudent = (student) => API.post('/students', student);  // Add a student
export const updateStudent = (id, updatedData) => API.put(`/students/${id}`, updatedData); // Update student

// Results API
export const uploadMarks = (data) => API.post('/results/upload', data); // Upload marks