// import React, { useEffect, useState } from 'react';
// import { Box, Grid, Paper, Typography, Button, Container, Chip } from '@mui/material';
// import { motion } from 'framer-motion';
// import verifyToken from '../services/verifyToken';
// import api from '../services/api';

// const cardVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     hover: { scale: 1.03, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }
// };

// const sectionVariants = {
//     hide: { opacity: 0 },
//     show: { opacity: 1, transition: { staggerChildren: 0.2 } }
// };

// const InstructorDashboard = () => {
//     const [instructor, setInstructor] = useState(null);
//     const [pendingRequests, setPendingRequests] = useState([]);

//     useEffect(() => {
//         const fetchInstructorAndRequests = async () => {
//             const res = await verifyToken();
//             if (res) {
//                 setInstructor(res);
//                 console.log("THIS IS INSTRUCTOR ID", res.instructor_id);
//                 console.log("THIS IS INSTRUCTOR NAME", res.name);
//                 console.log("THIS IS INSTRUCTOR DEPARTMENT", res.department);

//                 try {
//                     const reqRes = await api.get(`/enrollments/?instructor_id=${1}`);
//                     setPendingRequests(reqRes.data);
//                     console.log("PENDING REQUESTSSSS", reqRes);
//                 } catch (error) {
//                     console.error("Failed to fetch pending requests:", error);
//                 }
//             }
//         };
//         fetchInstructorAndRequests();
//     }, []);

//     const handleApprove = async (enrollmentId) => {
//         try {
//             await api.patch(`/enrollments/${enrollmentId}/`, { status: 'A' });
//             alert('Enrollment approved!');
//             const updated = await api.get(`/enrollments/?instructor_id=${instructor.instructor_id}`);
//             setPendingRequests(updated.data);
//         } catch (error) {
//             console.error('Approval failed:', error);
//             alert('Approval failed. Please try again.');
//         }
//     };

//     return (
//         <Container sx={{ mt: 4, mb: 4 }}>
//             {/* Welcome Header */}
//             {instructor && (
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.6 }}
//                 >
//                     <Box
//                         sx={{
//                             background: 'linear-gradient(135deg, #667eea, #764ba2, #e66465)',
//                             color: 'white',
//                             py: 4,
//                             px: 3,
//                             borderRadius: 4,
//                             textAlign: 'center',
//                             mb: 5,
//                             boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
//                             backgroundSize: '400% 400%',
//                             animation: 'gradientShift 10s ease infinite'
//                         }}
//                     >
//                         <Typography variant="h4" fontWeight="bold" gutterBottom>
//                             Welcome, {instructor.name}!
//                         </Typography>
//                         <Typography variant="h6">
//                             Department: {instructor.department}
//                         </Typography>
//                     </Box>
//                 </motion.div>
//             )}

//             <style>
//                 {`
//                 @keyframes gradientShift {
//                     0% { background-position: 0% 50%; }
//                     50% { background-position: 100% 50%; }
//                     100% { background-position: 0% 50%; }
//                 }
//                 `}
//             </style>

//             {/* Enrollment Requests */}
//             <motion.div initial="hide" animate="show" variants={sectionVariants}>
//                 <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
//                     Pending Enrollment Requests
//                 </Typography>
//                 <Grid container spacing={4} justifyContent="center">
//                     {pendingRequests.length === 0 ? (
//                         <Typography variant="body1" color="text.secondary">
//                             No pending requests found.
//                         </Typography>
//                     ) : (
//                         pendingRequests.map((req) => (
//                             <Grid item xs={12} sm={8} md={6} key={req.enrollment_id || req.student + req.course}>
//                                 <motion.div
//                                     variants={cardVariants}
//                                     initial="initial"
//                                     animate="animate"
//                                     whileHover="hover"
//                                     transition={{ duration: 0.4 }}
//                                 >
//                                     <Paper
//                                         elevation={0}
//                                         sx={{
//                                             p: 4,
//                                             borderRadius: 4,
//                                             background: 'rgba(255, 255, 255, 0.6)',
//                                             backdropFilter: 'blur(8px)',
//                                             border: '1px solid rgba(255,255,255,0.3)',
//                                             display: 'flex',
//                                             flexDirection: 'column',
//                                             justifyContent: 'space-between',
//                                             height: '100%',
//                                             width: "300px"
//                                         }}
//                                     >
//                                         <Box mb={3}>
//                                             <Typography variant="h6" fontWeight={600}>
//                                                 Student Name - {req.student_name
//                                                 }
//                                             </Typography>
//                                             <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
//                                                 Course Name: {req.course_name}
//                                             </Typography>
//                                             <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
//                                                 Course Code: {req.course_code}
//                                             </Typography>
//                                             <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
//                                                 Enrollment Data: {req.enrollment_date}
//                                             </Typography>
//                                             <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
//                                                 Enrollment ID: {req.enrollment_id}
//                                             </Typography>
//                                             {/* <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
//                                                 Status: {req.status}
//                                             </Typography> */}
//                                             <Chip
//                                                 label={
//                                                     req.status === 'A'
//                                                         ? 'Active'
//                                                         : req.status === 'P'
//                                                             ? 'Pending'
//                                                             : req.status
//                                                 }
//                                                 color={
//                                                     req.status === 'A'
//                                                         ? 'success'
//                                                         : req.status === 'P'
//                                                             ? 'warning'
//                                                             : 'default'
//                                                 }
//                                                 // variant="outlined"
//                                                 sx={{ mt: 1, fontsize: 30, width: "50%", background: "#A35589", color: "white", fontWeight: "bold" }}
//                                             />
//                                         </Box>
//                                         <Box sx={{ display: 'flex', gap: 2 }}>
//                                             <Button
//                                                 onClick={() => handleApprove(req.enrollment_id)}
//                                                 variant="contained"
//                                                 size="medium"
//                                                 sx={{ flex: 1, borderRadius: 3, backgroundColor: '#1976d2', py: 1.2 }}
//                                             >
//                                                 Approve
//                                             </Button>
//                                             <Button
//                                                 variant="outlined"
//                                                 size="medium"
//                                                 sx={{ flex: 1, borderRadius: 3, borderColor: '#d32f2f', color: '#d32f2f', py: 1.2 }}
//                                             >
//                                                 Reject
//                                             </Button>
//                                         </Box>
//                                     </Paper>
//                                 </motion.div>
//                             </Grid>
//                         ))
//                     )}
//                 </Grid>
//             </motion.div>
//         </Container>
//     );
// };

// export default InstructorDashboard;


// import React, { useEffect, useState } from 'react';
// import { Box, Grid, Paper, Typography, Button, Container, Chip } from '@mui/material';
// import { motion } from 'framer-motion';
// import verifyToken from '../services/verifyToken';
// import api from '../services/api';

// const cardVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     hover: { scale: 1.03, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }
// };

// const sectionVariants = {
//     hide: { opacity: 0 },
//     show: { opacity: 1, transition: { staggerChildren: 0.2 } }
// };

// const InstructorDashboard = () => {
//     const [instructor, setInstructor] = useState(null);
//     const [pendingRequests, setPendingRequests] = useState([]);

//     useEffect(() => {
//         const fetchInstructorAndRequests = async () => {
//             const res = await verifyToken();
//             if (res) {
//                 setInstructor(res);
//                 try {
//                     const reqRes = await api.get(`/enrollments/?instructor_id=${2}`);
//                     console.log("approevededwesda", reqRes)
//                     setPendingRequests(reqRes.data);
//                 } catch (error) {
//                     console.error("Failed to fetch pending requests:", error);
//                 }
//             }
//         };
//         fetchInstructorAndRequests();
//     }, []);

//     const handleApprove = async (enrollmentId) => {
//         try {
//             await api.patch(`/enrollments/${enrollmentId}/`, { status: 'A' });
//             alert('Enrollment approved!');
//             const updated = await api.get(`/enrollments/?instructor_id=${instructor.instructor_id}`);
//             setPendingRequests(updated.data);
//         } catch (error) {
//             console.error('Approval failed:', error);
//             alert('Approval failed. Please try again.');
//         }
//     };

//     return (
//         <Container sx={{ mt: 4, mb: 4 }}>
//             {instructor && (
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.6 }}
//                 >
//                     <Box
//                         sx={{
//                             background: 'linear-gradient(135deg, #667eea, #764ba2, #e66465)',
//                             color: 'white',
//                             py: 4,
//                             px: 3,
//                             borderRadius: 4,
//                             textAlign: 'center',
//                             mb: 5,
//                             boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
//                             backgroundSize: '400% 400%',
//                             animation: 'gradientShift 10s ease infinite'
//                         }}
//                     >
//                         <Typography variant="h4" fontWeight="bold" gutterBottom>
//                             Welcome, {instructor.name}!
//                         </Typography>
//                         <Typography variant="h6">
//                             Department: {instructor.department}
//                         </Typography>
//                     </Box>
//                 </motion.div>
//             )}

//             <style>
//                 {`
//                 @keyframes gradientShift {
//                     0% { background-position: 0% 50%; }
//                     50% { background-position: 100% 50%; }
//                     100% { background-position: 0% 50%; }
//                 }
//                 `}
//             </style>

//             <motion.div initial="hide" animate="show" variants={sectionVariants}>
//                 <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
//                     Pending Enrollment Requests
//                 </Typography>
//                 <Grid container spacing={4} justifyContent="center">
//                     {pendingRequests.length === 0 ? (
//                         <Typography variant="body1" color="text.secondary">
//                             No pending requests found.
//                         </Typography>
//                     ) : (
//                         pendingRequests.map((req) => (
//                             <Grid item xs={12} sm={8} md={6} key={req.enrollment_id || req.student + req.course}>
//                                 <motion.div
//                                     variants={cardVariants}
//                                     initial="initial"
//                                     animate="animate"
//                                     whileHover="hover"
//                                     transition={{ duration: 0.4 }}
//                                 >
//                                     <Paper
//                                         elevation={0}
//                                         sx={{
//                                             p: 4,
//                                             borderRadius: 4,
//                                             background: 'rgba(255, 255, 255, 0.6)',
//                                             backdropFilter: 'blur(8px)',
//                                             border: '1px solid rgba(255,255,255,0.3)',
//                                             display: 'flex',
//                                             flexDirection: 'column',
//                                             justifyContent: 'space-between',
//                                             height: '100%'
//                                         }}
//                                     >
//                                         <Box mb={3}>
//                                             <Typography variant="h6" fontWeight={600}>
//                                                 Student ID: {req.student}
//                                             </Typography>
//                                             <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
//                                                 Course ID: {req.course}
//                                             </Typography>
//                                             <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
//                                                 Status: {req.status}
//                                             </Typography>
//                                             <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
//                                                 Enrollment ID: {req.enrollment_id}
//                                             </Typography>
//                                             <Chip
//                                                 label={
//                                                     req.status === 'A' ? 'Active' :
//                                                         req.status === 'P' ? 'Pending' :
//                                                             req.status
//                                                 }
//                                                 color={
//                                                     req.status === 'A' ? 'success' :
//                                                         req.status === 'P' ? 'warning' :
//                                                             'default'
//                                                 }
//                                                 sx={{ mt: 1, fontSize: 14, width: 'fit-content', background: '#A35589', color: 'white', fontWeight: 'bold' }}
//                                             />
//                                         </Box>
//                                         <Box sx={{ display: 'flex', gap: 2 }}>
//                                             <Button
//                                                 onClick={() => handleApprove(req.enrollment_id)}
//                                                 variant="contained"
//                                                 size="medium"
//                                                 sx={{ flex: 1, borderRadius: 3, backgroundColor: '#1976d2', py: 1.2 }}
//                                             >
//                                                 Approve
//                                             </Button>
//                                             <Button
//                                                 variant="outlined"
//                                                 size="medium"
//                                                 sx={{ flex: 1, borderRadius: 3, borderColor: '#d32f2f', color: '#d32f2f', py: 1.2 }}
//                                             >
//                                                 Reject
//                                             </Button>
//                                         </Box>
//                                     </Paper>
//                                 </motion.div>
//                             </Grid>
//                         ))
//                     )}
//                 </Grid>
//             </motion.div>
//         </Container>
//     );
// };

// export default InstructorDashboard;












import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Container, Chip, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import verifyToken from '../services/verifyToken';
import api from '../services/api';

const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.03, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }
};

const sectionVariants = {
    hide: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const InstructorDashboard = () => {
    const [instructor, setInstructor] = useState(null);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [teachingCourses, setTeachingCourses] = useState([]);
    const [showHeader, setShowHeader] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstructorAndData = async () => {
            const res = await verifyToken();
            if (res) {
                setInstructor(res);

                try {
                    const reqRes = await api.get(`/enrollments/?instructor_id=${res.instructor_id}`);
                    setPendingRequests(reqRes.data);
                    const justSignedUp = sessionStorage.getItem('just_signed_up');
                    if (justSignedUp === 'true') {
                        setShowHeader(false);
                        sessionStorage.removeItem('just_signed_up');
                    }
                } catch (error) {
                    console.error("Failed to fetch pending requests:", error);
                }

                try {
                    const courseRes = await api.get(`/course-offerings/instructor/${res.instructor_id}/`);
                    console.log("THESE SRE COURSE OFFEREINGSSS", courseRes)
                    setTeachingCourses(courseRes.data);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchInstructorAndData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleApprove = async (enrollmentId) => {
        try {
            await api.patch(`/enrollments/${enrollmentId}/`, { status: 'A' });
            alert('Enrollment approved!');
            const updated = await api.get(`/enrollments/?instructor_id=${instructor.instructor_id}`);
            setPendingRequests(updated.data);
        } catch (error) {
            console.error('Approval failed:', error);
            alert('Approval failed. Please try again.');
        }
    };

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            {instructor && showHeader && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <Box
                        sx={{
                            background: 'linear-gradient(135deg, #667eea, #764ba2, #e66465)',
                            color: 'white',
                            py: 4,
                            px: 3,
                            borderRadius: 4,
                            textAlign: 'center',
                            mb: 5,
                            boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                            backgroundSize: '400% 400%',
                            animation: 'gradientShift 10s ease infinite'
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Welcome, {instructor.name}!
                        </Typography>
                        <Typography variant="h6">
                            Department: {instructor.department}
                        </Typography>
                    </Box>
                </motion.div>
            )}

            <style>
                {`
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                `}
            </style>

            <motion.div initial="hide" animate="show" variants={sectionVariants}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                    Pending Enrollment Requests
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {pendingRequests.length === 0 ? (
                        <Typography variant="body1" color="text.secondary">
                            No pending requests found.
                        </Typography>
                    ) : (
                        pendingRequests.map((req) => (
                            <Grid item xs={12} sm={8} md={6} key={req.enrollment_id || req.student + req.course}>
                                <motion.div
                                    variants={cardVariants}
                                    initial="initial"
                                    animate="animate"
                                    whileHover="hover"
                                    transition={{ duration: 0.4 }}
                                >
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 4,
                                            borderRadius: 4,
                                            background: 'rgba(255, 255, 255, 0.6)',
                                            backdropFilter: 'blur(8px)',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            height: '100%',
                                            width: "300px"
                                        }}
                                    >
                                        <Box mb={3}>
                                            <Typography variant="h6" fontWeight={600}>
                                                Student Name - {req.student_name}
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                                                Course Name: {req.course_name}
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                                                Course Code: {req.course_code}
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                                                Enrollment Data: {req.enrollment_date}
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                                                Enrollment ID: {req.enrollment_id}
                                            </Typography>
                                            <Chip
                                                label={req.status === 'A' ? 'Active' : req.status === 'P' ? 'Pending' : req.status}
                                                color={req.status === 'A' ? 'success' : req.status === 'P' ? 'warning' : 'default'}
                                                sx={{ mt: 1, fontsize: 30, width: "50%", background: "#A35589", color: "white", fontWeight: "bold" }}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Button
                                                onClick={() => handleApprove(req.enrollment_id)}
                                                variant="contained"
                                                size="medium"
                                                sx={{ flex: 1, borderRadius: 3, backgroundColor: '#1976d2', py: 1.2 }}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="medium"
                                                sx={{ flex: 1, borderRadius: 3, borderColor: '#d32f2f', color: '#d32f2f', py: 1.2 }}
                                            >
                                                Reject
                                            </Button>
                                        </Box>
                                    </Paper>
                                </motion.div>
                            </Grid>
                        ))
                    )}
                </Grid>
            </motion.div>

            {/* Courses Taught Section */}
            <motion.div initial="hide" animate="show" variants={sectionVariants}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mt: 8, mb: 3 }}>
                    Courses You're Teaching
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {teachingCourses.length === 0 ? (
                        <Typography variant="body1" color="text.secondary">
                            No courses found.
                        </Typography>
                    ) : (
                        teachingCourses.map((course) => (
                            <Grid item xs={12} sm={8} md={6} key={course.course_detail_id}>
                                <motion.div
                                    variants={cardVariants}
                                    initial="initial"
                                    animate="animate"
                                    whileHover="hover"
                                    transition={{ duration: 0.4 }}
                                >
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 4,
                                            borderRadius: 4,
                                            background: 'rgba(255, 255, 255, 0.6)',
                                            backdropFilter: 'blur(8px)',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            height: '100%',
                                            width: "300px"
                                        }}
                                    >
                                        <Box mb={3}>
                                            <Typography variant="h6" fontWeight={600}>
                                                Course Name - {course.course_name} ({course.course})
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                                                Department: {course.department_name}
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                                                Instructor Name: {course.instructor_name}
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                                                Year: {course.year}, Semester: {course.semester}
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                                                Schedule: {course.schedule_info}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </motion.div>
                            </Grid>
                        ))
                    )}
                </Grid>
            </motion.div>
        </Container>
    );
};

export default InstructorDashboard;
