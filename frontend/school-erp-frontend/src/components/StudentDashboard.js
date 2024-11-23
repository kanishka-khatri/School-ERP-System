// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './StudentDashboard.css';

// const StudentDashboard = () => {
//   const [rollNumber, setRollNumber] = useState('');
//   const [studentData, setStudentData] = useState(null);
//   const [error, setError] = useState('');

//   const student = JSON.parse(localStorage.getItem('student'));

//   useEffect(() => {
//     if (student && student.rollNumber) {
//       setRollNumber(student.rollNumber);
//     }
//   }, [student]);

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (rollNumber) {
//         try {
//           const res = await axios.get(`http://localhost:5000/api/results/student/rollNumber/${rollNumber}`);
//           setStudentData(res.data);
//         } catch (err) {
//           console.error('Error fetching results:', err);
//           setError('Failed to load student marks');
//         }
//       }
//     };

//     fetchResults();
//   }, [rollNumber]);

//   if (error) {
//     return <p className="error">{error}</p>;
//   }

//   if (!studentData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="student-dashboard">
//       <h2>Name: {student.name}</h2>
//       <h3>Roll No.: {student.rollNumber}</h3>
//       <table className="subject-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Subject</th>
//             <th>Marks</th>
//             <th>Teacher</th>
//           </tr>
//         </thead>
//         <tbody>
//           {studentData.map((result, index) => (
//             <tr key={result._id}>
//               <td>{index + 1}</td>
//               <td>{result.subject}</td>
//               <td>{result.marks}</td>
//               <td>{result.teacher ? result.teacher.name : 'N/A'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentDashboard;
import React from 'react';
import './StudentDashboard.css';

const StudentDashboard = () => {
  // Sample student data (replace with actual data from API or state management)
  const studentData = {
    name: 'Aditi',
    rollNo: '1',
    status: 'Pass',
    subjects: [
      { id: 1, name: 'English', score: 90 },
      { id: 2, name: 'Mathmatics', score: 90 },
      { id: 3, name: 'Science', score: 90 },
      { id: 4, name: 'Social Studies', score: 90 },
      { id: 5, name: 'Hindi', score: 90 },
      { id: 6, name: 'Computer', score: 90 }
    ],
  };

  return (
    <div className="student-dashboard">
      <div className="student-info">
        <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG-Picture.png" alt="Profile Icon" className="profile-icon" />
        <h2>Name: {studentData.name}</h2>
        <h3>Roll No.: {studentData.rollNo}</h3>
      </div>

      <table className="subject-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Subject Name</th>
            <th>Score (/100)</th>
          </tr>
        </thead>
        <tbody>
          {studentData.subjects.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.id}</td>
              <td>{subject.name}</td>
              <td>{subject.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="status">
        <p>Status: <span className="status-pass">{studentData.status}</span></p>
      </div>
    </div>
  );
};

export default StudentDashboard;
