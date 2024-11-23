// import React from 'react';
// import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AdminDashboard from './components/AdminDashboard';
// import TeacherDashboard from './components/TeacherDashboard';
// import StudentDashboard from './components/StudentDashboard';
// import WelcomePage from './components/WelcomePage';
// import Login from './components/Login'; // Import Login component
// import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Welcome page route */}
//           <Route path="/" element={<WelcomePage />} />

//           {/* Login page route */}
//           <Route path="/login" element={<Login />} />

//           {/* Protected routes for Admin, Teacher, and Student Dashboard */}
//           <Route 
//             path="/admin" 
//             element={
//               <ProtectedRoute component={AdminDashboard} /> // Protect Admin Dashboard
//             } 
//           />
//            <Route path="/teacher" element={<TeacherDashboard />} />
//           <Route 
//             path="/student" 
//             element={
//               <ProtectedRoute component={StudentDashboard} /> // Protect Student Dashboard
//             } 
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import WelcomePage from './components/WelcomePage';
import Login from './components/Login'; // Import Login component
import StudentLogin from './components/StudentLogin'; // Import StudentLogin component
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Welcome page route */}
          <Route path="/" element={<WelcomePage />} />

          {/* Login page routes */}
          <Route path="/login" element={<Login />} /> {/* Teacher/Admin Login */}
          <Route path="/student-login" element={<StudentLogin />} /> {/* Student Login */}

          {/* Protected routes for Admin, Teacher, and Student Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute component={AdminDashboard} /> // Protect Admin Dashboard
            }
          />
          <Route
            path="/teacher"
            element={<ProtectedRoute component={TeacherDashboard} />} // Protect Teacher Dashboard
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute component={StudentDashboard} /> // Protect Student Dashboard
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
