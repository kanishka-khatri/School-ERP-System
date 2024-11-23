import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './WelcomePage.css';
import { FaHome, FaInfoCircle, FaPhone, FaBars } from 'react-icons/fa';

const WelcomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="welcome-page-body">
      <div className="welcome-page">
        <nav className={isSidebarOpen ? 'sidebar open' : 'sidebar'}>
          <div className="sidebar-header">
            {/* Toggle sidebar button */}
            <FaBars className="toggle-icon" onClick={toggleSidebar} />
            <h1 className="sidebar-logo">School ERP</h1>
          </div>
          <ul className="sidebar-links">
            <li className={location.pathname === '/home' ? 'active' : ''}>
              <Link to="/home" title="Home">
                <FaHome /> &nbsp;Home
              </Link>
            </li>
            <li className={location.pathname === '/about' ? 'active' : ''}>
              <Link to="/about" title="About">
                <FaInfoCircle /> &nbsp;About
              </Link>
            </li>
            <li className={location.pathname === '/contact' ? 'active' : ''}>
              <Link to="/contact" title="Contact">
                <FaPhone /> &nbsp;Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="content">
          <header className="welcome-header">
            <h2>Welcome to Your School ERP Portal</h2>
            <p>Access administrative functions, teacher resources, and student portals easily.</p>
          </header>
          <div className="dashboard-blocks">
            {/* Admin Login Block */}
            <Link to="/login" className="dashboard-link">
              <div className="dashboard-block admin-block">
                <h3>Admin</h3>
                <p>Manage students, teachers, and results.</p>
              </div>
            </Link>

            {/* Teacher Login Block */}
            <Link to="/login" className="dashboard-link">
              <div className="dashboard-block teacher-block">
                <h3>Teacher</h3>
                <p>Manage classes, students, and enter results.</p>
              </div>
            </Link>

            {/* Student Login Block (Updated Route) */}
            <Link to="/student-login" className="dashboard-link">
              <div className="dashboard-block student-block">
                <h3>Student</h3>
                <p>View your results and access resources.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
