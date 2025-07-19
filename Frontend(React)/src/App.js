import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import StudentLogin from './pages/StudentLogin';
import StudentSignup from './pages/StudentSignup';
import InstructorLogin from './pages/InstructorLogin';
import InstructorSignup from './pages/InstructorSignup';
import DashboardLayout from './layouts/DashboardLayout';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import CourseDetails from './pages/CourseDetails';
import AssignmentSubmission from './pages/AssignmentSubmission';
import AssignmentDetails from './pages/AssignmentDetails';
import CourseDescription from './pages/CoruseDescription';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing + Auth */}
        <Route path="/" element={<Landing />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignup />} />
        <Route path="/instructor/login" element={<InstructorLogin />} />
        <Route path="/instructor/signup" element={<InstructorSignup />} />

        {/* Student Dashboard */}
        <Route
          path="/dashboard/student"
          element={
            <DashboardLayout>
              <StudentDashboard />
            </DashboardLayout>
          }
        />

        {/* Instructor Dashboard */}
        <Route
          path="/dashboard/instructor"
          element={
            <DashboardLayout>
              <InstructorDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/courses"
          element={
            <DashboardLayout>
              <CourseDetails />
            </DashboardLayout>
          }
        />
        <Route
          path="/courses/:id"
          element={
            <DashboardLayout>
              <CourseDescription />
            </DashboardLayout>
          }
        />

        <Route
          path="/assignments"
          element={
            <DashboardLayout>
              <AssignmentDetails />
            </DashboardLayout>
          }
        />
        <Route
          path="/assignments/:id/submit"
          element={
            <DashboardLayout>
              <AssignmentSubmission />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
