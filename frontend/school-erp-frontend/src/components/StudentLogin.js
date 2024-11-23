// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';

// const StudentLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isForgotPassword, setIsForgotPassword] = useState(false);
//   const [resetMessage, setResetMessage] = useState('');
//   const navigate = useNavigate();

//   // Handle login form submission
//   const handleLogin = async (e) => {
//     e.preventDefault();
  
//     try {
//       // Make a POST request to the student login API (change the endpoint)
//       const res = await axios.post('http://localhost:5000/api/students/login', {
//         email,
//         password,
//       });
  
//       if (res.status === 200) {
//         // Store student details and token in localStorage
//         localStorage.setItem('token', res.data.token); // Store actual token from the response
//         localStorage.setItem('student', JSON.stringify(res.data.student)); // Store student data
//         localStorage.setItem('email', email); // Store the email for further use
  
//         // Redirect to the student dashboard
//         navigate('/student');
//       } else {
//         setError(res.data.message || 'Login failed');
//       }
//     } catch (err) {
//       // Handle errors
//       console.error('Login error:', err);
//       if (err.response && err.response.data && err.response.data.message) {
//         setError(err.response.data.message);
//       } else {
//         setError('Something went wrong. Please try again.');
//       }
//     }
//   };
  

//   // Handle forgot password functionality
//   const handleForgotPassword = (e) => {
//     e.preventDefault();
//     // Logic for resetting password (backend integration can be added later)
//     if (email) {
//       setResetMessage('A password reset link has been sent to your email.');
//     } else {
//       setResetMessage('Please enter a valid email address.');
//     }
//   };

//   return (
//     <div className="login-page-body">
//       <div className="login-page">
//         <h1>{isForgotPassword ? 'Forgot Password' : 'Login'}</h1>
//         {!isForgotPassword ? (
//           <form onSubmit={handleLogin}>
//             <div className="form-group" style={{ textAlign: 'left' }}>
//               <label>Email:</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div className="form-group" style={{ textAlign: 'left' }}>
//               <label>Password:</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>
//             {error && <p className="error">{error}</p>}
//             <button type="submit" className="login-button">Login</button>
//             <div className="forgot-password-link">
//               <p onClick={() => setIsForgotPassword(true)}>Forgot Password?</p>
//             </div>
//           </form>
//         ) : (
//           <form onSubmit={handleForgotPassword}>
//             <div className="form-group" style={{ textAlign: 'left' }}>
//               <label>Enter your email to reset password:</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your registered email"
//                 required
//               />
//             </div>
//             <button type="submit" className="reset-button">Send Reset Link</button>
//             <div className="back-to-login">
//               <p onClick={() => setIsForgotPassword(false)}>Back to Login</p>
//             </div>
//             {resetMessage && <p className="reset-message">{resetMessage}</p>}
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentLogin;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the student login API
      const res = await axios.post('http://localhost:5000/api/students/login', {
        email,
        password,
      });

      if (res.status === 200 && res.data.token) {
        // Store student details and token in localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('student', JSON.stringify(res.data));
        localStorage.setItem('email', email);

        // Redirect to the student dashboard
        navigate('/student');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  // Handle forgot password functionality
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (email) {
      setResetMessage('A password reset link has been sent to your email.');
    } else {
      setResetMessage('Please enter a valid email address.');
    }
  };

  return (
    <div className="login-page-body">
      <div className="login-page">
        <h1>{isForgotPassword ? 'Forgot Password' : 'Student Login'}</h1>
        {!isForgotPassword ? (
          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="login-button">Login</button>
            <div className="forgot-password-link">
              <p onClick={() => setIsForgotPassword(true)}>Forgot Password?</p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label>Enter your email to reset password:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
              />
            </div>
            <button type="submit" className="reset-button">Send Reset Link</button>
            <div className="back-to-login">
              <p onClick={() => setIsForgotPassword(false)}>Back to Login</p>
            </div>
            {resetMessage && <p className="reset-message">{resetMessage}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default StudentLogin;
