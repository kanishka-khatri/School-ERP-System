import React, { useState, useEffect, useRef } from 'react';
import './TeacherDashboard.css';
import { FaUser, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';

const TeacherDashboard = () => {
  const [profileInfo, setProfileInfo] = useState({});
  const [activeSection, setActiveSection] = useState('profile');
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [speechActive, setSpeechActive] = useState(false);
  const recognitionRef = useRef(null);
  const inputRefs = useRef({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const email = localStorage.getItem('email'); // Retrieve email from localStorage

    if (email) {
      // Fetch teacher profile info from the backend
      axios.get(`http://127.0.0.1:5000/api/teachers/profile?email=${email}`)

        .then((response) => {
          // Log the response to check if it contains the data
          console.log('Profile data:', response.data);

          if (response.data.name) {
            setProfileInfo(response.data); // Set profile data if it exists
          } else {
            setError('No profile found for the given email');
          }
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
          setError('Error fetching profile information');
        });
    } else {
      setError('No email found in localStorage');
    }

    // Set up speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;  // Single recognition per student
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript.trim();  // Get the spoken text
        const digitMappedText = mapSpokenDigits(spokenText);  // Convert digit words to numbers
        const currentInput = inputRefs.current.activeInput;  // Target the correct input field

        if (!isNaN(digitMappedText) && currentInput) {
          currentInput.value = digitMappedText;  // Set the value to the corresponding student's input field
        }
      };

      recognition.onend = () => {
        setSpeechActive(false);
      };

      recognitionRef.current = recognition;
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  }, []);

  // Function to map spoken digits to numbers
  const mapSpokenDigits = (spokenText) => {
    const digitWordsToNumbers = {
      'zero': '0',
      'one': '1',
      'two': '2',
      'three': '3',
      'four': '4',
      'five': '5',
      'six': '6',
      'seven': '7',
      'eight': '8',
      'nine': '9',
    };

    const words = spokenText.split(' ');
    const mappedWords = words.map(word => digitWordsToNumbers[word.toLowerCase()] || word);

    return mappedWords.join('');
  };

  const classData = {
    'Class 6th': [{ id: 1, name: 'Aditi ', rollNumber: '101' }, { id: 2, name: 'Divya Jain', rollNumber: '102' }, { id: 3, name: 'Tina Sharma', rollNumber: '103' }, { id: 4, name: 'Reena Meena', rollNumber: '104' }, { id: 5, name: 'Tiya Rathore', rollNumber: '105' }],
    'Class 7th': [{ id: 1, name: 'Reeta', rollNumber: '101' }, { id: 2, name: 'Sarita' , rollNumber: '102'}, { id: 3, name: 'Kanishka', rollNumber: '103' }, { id: 4, name: 'Priya' , rollNumber: '104' }, { id: 5, name: 'Monal' , rollNumber: '105' }],
    'Class 8th': [{ id: 1, name: 'Alisha' , rollNumber: '101'}, { id: 2, name: 'Sakshi', rollNumber: '102' }, { id: 3, name: 'Jheel', rollNumber: '103' }, { id: 4, name: 'Anjali' , rollNumber: '104' }, { id: 5, name: 'Ronak', rollNumber: '105'  }],
    'Class 9th': [{ id: 1, name: 'Bhumika', rollNumber: '101' }, { id: 2, name: 'Harshita' , rollNumber: '102'}, { id: 3, name: 'Krishvi' , rollNumber: '103'}, { id: 4, name: 'Krishna' , rollNumber: '104' }, { id: 5, name: 'Vanishka', rollNumber: '105'  }],
    'Class 11th': [{ id: 1, name: 'Sneha' , rollNumber: '101'}, { id: 2, name: 'Tisha', rollNumber: '102' }, { id: 3, name: 'Pukar', rollNumber: '103' }, { id: 4, name: 'Sapna' , rollNumber: '104' }, { id: 5, name: 'Radhika', rollNumber: '105'  }],
  };

  const handleClassSelection = (className) => {
    setSelectedClass(className);
    setStudents(classData[className]);
  };

  // const handleMarksSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (!profileInfo.subject) {
  //     alert('Subject information is missing.');
  //     return;
  //   }
  
  //   try {
  //     // Prepare marks data to send to the backend
  //     const marksData = students.map((student) => ({
  //       studentName: student.name,
  //       subject: profileInfo.subject,
  //       rollNumber: student.rollNumber,
  //       marks: parseInt(inputRefs.current[student.id]?.value || 0), // Convert to integer
  //     }));
  
  //     // Send the data to the backend API including className
  //     await axios.post('http://localhost:5000/api/teachers/upload-marks', {
  //       className: selectedClass, // Include the selected class
  //       marksData,
  //     });
  
  //     alert('Marks submitted successfully');
  //   } catch (err) {
  //     console.error('Error submitting marks:', err);
  //     alert('Failed to submit marks');
  //   }
  // };
  // const handleMarksSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);  // Show loading state
    
  //   let errors = {};
  
  //   if (!profileInfo.subject) {
  //     errors.subject = "Subject information is missing.";
  //   }
  
  //   students.forEach((student) => {
  //     if (isNaN(inputRefs.current[student.id]?.value)) {
  //       errors[student.id] = "Please enter a valid number for marks.";
  //     }
  //   });
  
  //   if (Object.keys(errors).length > 0) {
  //     setFormErrors(errors);
  //     setLoading(false);  // Hide loading state
  //     return;
  //   }
    
    
  //   try {
  //     const marksData = students.map((student) => ({
  //       studentName: student.name,
  //       rollNumber: student.rollNumber,
  //       subject: profileInfo.subject,
  //       marks: parseInt(inputRefs.current[student.id]?.value || 0),
  //     }));
  
  //     await axios.post('http://localhost:5000/api/teachers/upload-marks', {
  //       className: selectedClass,
  //       marksData,
  //       teacherEmail: profileInfo.email, // Include teacher email
  //     });
      
  
  //     alert('Marks submitted successfully');
  //   } catch (err) {
  //     console.error('Error submitting marks:', err.response?.data || err.message);
  //     alert(`Failed to submit marks: ${err.response?.data?.message || 'Unknown error'}`);
  //   } finally {
  //     setLoading(false);  // Hide loading state after submission
  //   }
    
  // };
  // const handleMarksSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true); // Show loading state
  
  //   let errors = {};
  
  //   if (!profileInfo.subject) {
  //     errors.subject = "Subject information is missing.";
  //   }
  
  //   students.forEach((student) => {
  //     if (isNaN(inputRefs.current[student.id]?.value)) {
  //       errors[student.id] = "Please enter a valid number for marks.";
  //     }
  //   });
  
  //   if (Object.keys(errors).length > 0) {
  //     setFormErrors(errors);
  //     setLoading(false); // Hide loading state
  //     return;
  //   }
  
  //   // Prepare marks data
  //   const marksData = students.map((student) => ({
  //     studentName: student.name,
  //     rollNumber: student.rollNumber,
  //     subject: profileInfo.subject,
  //     marks: parseInt(inputRefs.current[student.id]?.value || 0),
  //   }));
  
  //   console.log('Submitting marks payload:', {
  //     className: selectedClass,
  //     marksData,
  //   });
  
  //   try {
  //     await axios.post('http://localhost:5000/api/teachers/upload-marks', {
  //       className: selectedClass,
  //       marksData,
  //       teacherEmail: profileInfo.email, // Include teacher email
  //     });
  
  //     alert('Marks submitted successfully');
  //   } catch (err) {
  //     console.error('Error submitting marks:', err.response?.data || err.message);
  //     alert(`Failed to submit marks: ${err.response?.data?.message || 'Unknown error'}`);
  //   } finally {
  //     setLoading(false); // Hide loading state after submission
  //   }
  // };
  // const handleMarksSubmit = async (e) => {
  //   e.preventDefault();
  
  //   const marksData = students.map((student) => ({
  //     studentName: student.name,
  //     rollNumber: student.rollNumber,
  //     subject: profileInfo.subject,
  //     marks: parseInt(inputRefs.current[student.id]?.value || 0),
  //   }));
  
  //   console.log('Submitting payload:', {
  //     className: selectedClass,
  //     marksData,
  //     teacherEmail: profileInfo.email,
  //   });
  
  //   try {
  //     await axios.post('http://localhost:5000/api/teachers/upload-marks', {
  //       className: selectedClass,
  //       marksData,
  //       teacherEmail: profileInfo.email,
  //     });
  //     alert('Marks submitted successfully');
  //   } catch (err) {
  //     console.error('Error submitting marks:', err.response?.data || err.message);
  //     alert(`Failed to submit marks: ${err.response?.data?.message || 'Unknown error'}`);
  //   }
  // };
  
//   const handleMarksSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare the marks data payload
//     const marksData = students.map((student) => ({
//         studentName: student.name,
//         rollNumber: student.rollNumber,
//         subject: profileInfo.subject,
//         marks: parseInt(inputRefs.current[student.id]?.value || 0, 10), // Ensure marks are integers
//     }));

//     // Prepare the full payload
//     const payload = {
//         className: selectedClass,
//         marksData,
//         teacher: profileInfo.email, // Use 'teacher' if this matches backend schema
//     };

//     // Log the payload for debugging
//     console.log('Submitting payload:', payload);

//     try {
//         // Make the API request
//         const response = await axios.post('http://localhost:5000/api/teachers/upload-marks', payload);

//         // Handle successful submission
//         alert('Marks submitted successfully');
//         console.log('Server Response:', response.data); // Optional: log server response for debugging
//     } catch (err) {
//         // Handle errors during submission
//         console.error('Error submitting marks:', err.response?.data || err.message);
//         alert(
//             `Failed to submit marks: ${err.response?.data?.message || err.response?.data || 'Unknown error'}`
//         );
//     }
// };
const handleMarksSubmit = async (e) => {
  e.preventDefault();

  try {
      // Prepare the marks data payload
      const marksData = students.map((student) => ({
          studentName: student.name, // Ensure studentName matches backend requirements
          rollNumber: student.rollNumber.toString(), // Ensure rollNumber is sent as a string
          subject: profileInfo.subject, // The subject taught by the teacher
          marks: parseInt(inputRefs.current[student.id]?.value || 0, 10), // Parse marks as integers
      }));
      marksData.forEach((data) => {
        if (!data.studentName || !data.rollNumber || !data.subject) {
            throw new Error('Validation error: Missing required fields in marksData');
        }
    });
      // Prepare the full payload
      const payload = {
          className: selectedClass, // Handle class naming consistency
          marksData,
          teacher: profileInfo.email, // Match key name to backend schema
      };

      // Log the payload for debugging
      console.log('Submitting payload:', JSON.stringify(payload, null, 2));

      // Make the API request
      const response = await axios.post('http://localhost:5000/api/teachers/upload-marks', payload);

      // Handle successful submission
      alert('Marks submitted successfully');
      console.log('Server Response:', response.data); // Optional: log server response for debugging
  } catch (err) {
      // Handle errors during submission
      const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          'Unknown error occurred';
      
      console.error('Error submitting marks:', errorMessage);
      alert(`Failed to submit marks: ${errorMessage}`);
  }
  

};

  
  const startSpeechRecognition = (studentId) => {
    const currentInput = inputRefs.current[studentId];
    if (currentInput) {
      inputRefs.current.activeInput = currentInput;
      setSpeechActive(true);
      recognitionRef.current.start();
    }
  };

  console.log('Profile Info:', profileInfo);

  return (
    <div className="teacher-dashboard">
      <h1>Teacher Dashboard</h1>

      <div className="dashboard-icons">
        <div
          className={`icon ${activeSection === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveSection('profile')}
        >
          <FaUser size={50} />
          <p>Profile Info</p>
        </div>
        <div
          className={`icon ${activeSection === 'result' ? 'active' : ''}`}
          onClick={() => setActiveSection('result')}
        >
          <FaClipboardList size={50} />
          <p>Result Entry</p>
        </div>
      </div>

      {activeSection === 'profile' && (
        <div className="profile-info">
          <h2>Profile Info</h2>
          <p>Name: {profileInfo.name || 'N/A'}</p>
          <p>Email: {profileInfo.email || 'N/A'}</p>
          <p>Subject: {profileInfo.subject || 'N/A'}</p>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}

      {activeSection === 'result' && !selectedClass && (
        <div className="class-selection">
          <h2>Select a Class</h2>
          <ul>
            {Object.keys(classData).map((className) => (
              <li key={className} onClick={() => handleClassSelection(className)}>
                {className}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeSection === 'result' && selectedClass && (
        <div className="student-list">
          <h2>{selectedClass} - Enter Marks</h2>
          <form onSubmit={handleMarksSubmit}>
            {students.map((student) => (
              <div key={student.id} className="form-group">
                <label>{student.name}:</label>
                <input
                  type="number"
                  placeholder="Enter marks"
                  ref={(input) => (inputRefs.current[student.id] = input)}
                  required
                />
                <button
                  type="button"
                  onClick={() => startSpeechRecognition(student.id)}
                  disabled={speechActive}
                >
                  🎤 Speak
                </button>
              </div>
            ))}
            <button type="submit">Submit Marks</button>
          </form>
          <br></br>
          <button onClick={() => setSelectedClass(null)}>Back to Class Selection</button>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;