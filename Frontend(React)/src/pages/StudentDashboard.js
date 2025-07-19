import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Container, Chip, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import verifyToken from '../services/verifyToken';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.03, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }
};

const sectionVariants = {
    hide: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const StudentDashboard = () => {
    const [student, setStudent] = useState(null);
    const [activeCourses, setActiveCourses] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [showHeader, setShowHeader] = useState(true);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    // useEffect(() => {
    //     const fetchStudentAndCourses = async () => {
    //         const res = await verifyToken();
    //         if (res) {
    //             setStudent(res);
    //             try {
    //                 const activeRes = await api.get(`/enrollments/active_courses/?student_id=${1}`);
    //                 console.log("THESE ARE THE ACTIVE COURSES", activeRes)
    //                 setActiveCourses(activeRes.data);

    //                 const availableRes = await api.get(`/courses/coursewithstatus/?student_id=${res.student_id}`);
    //                 console.log("THESE ARE FULL", availableRes)
    //                 // setAvailableCourses(availableRes.data.filter(course => course.status === 'available'));
    //                 setAvailableCourses(availableRes.data);

    //             } catch (error) {
    //                 console.error('Failed to fetch courses:', error);
    //             }
    //             if (sessionStorage.getItem("just_signed_up") === "true") {
    //                 setShowHeader(false); // Header mat dikhao
    //                 sessionStorage.removeItem("just_signed_up"); // Flag hata do, taake next time login pe dikhe
    //             } else {
    //                 setShowHeader(true); // Normal login hai, to header dikhao
    //             }

    //         }
    //     };
    //     fetchStudentAndCourses();
    // }, []);

    useEffect(() => {
        const fetchStudentAndCourses = async () => {
            try {
                const res = await verifyToken();
                if (res) {
                    setStudent(res);
                    const [activeRes, availableRes] = await Promise.all([
                        api.get(`/enrollments/active_courses/?student_id=${res.student_id}`),
                        api.get(`/courses/coursewithstatus/?student_id=${res.student_id}`)
                    ]);
                    setActiveCourses(activeRes.data);
                    setAvailableCourses(availableRes.data);

                    const justSignedUp = sessionStorage.getItem('just_signed_up');
                    if (justSignedUp === 'true') {
                        setShowHeader(false);
                        sessionStorage.removeItem('just_signed_up');
                    }
                }
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudentAndCourses();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleEnroll = async (courseId) => {
        try {
            await api.post('/enrollments/', {
                student: student.student_id,
                course: courseId
            });
            alert("Enrollment request sent!");

            // Refresh the list (optional but ideal UX)
            const refreshed = await api.get(`/courses/coursewithstatus/?student_id=${student.student_id}`);
            setAvailableCourses(refreshed.data);
        } catch (err) {
            console.error("Enrollment failed:", err);
            alert("Enrollment failed. Try again.");
        }
    };


    return (
        <Container sx={{ mt: 0, mb: 20 }}>
            {/* Welcome Header */}
            {student && showHeader && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <Box
                        sx={{
                            background: 'linear-gradient(135deg, #c471f5, #fa71cd, #fbc2eb)',
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
                            Welcome, {student.name}!
                        </Typography>
                        <Typography variant="h6">
                            Academic Year: {student.class_year}
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
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3, mt: 10 }}>
                    Enrolled Active Courses
                </Typography>
                <Grid container spacing={4} justifyContent="center" sx={{ mb: 5 }} marginTop={7}>
                    {activeCourses.length === 0 ? (
                        <Typography variant="body1" color="text.secondary">No active courses found.</Typography>
                    ) : (
                        activeCourses.map((course) => (
                            <Grid item xs={12} sm={8} md={6} key={course.id}>
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
                                            p: 0,
                                            paddingX: 5,
                                            // marginRight: 5,
                                            borderRadius: 4,
                                            background: 'rgba(255, 255, 255, 0.6)',
                                            backdropFilter: 'blur(8px)',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            display: 'flex',
                                            // flexDirection: 'column',
                                            // justifyContent: 'space-between',
                                            height: '100%',
                                            width: "210px"
                                        }}
                                    >
                                        <Box mb={3}>
                                            <Typography variant="h6" fontWeight={600} marginTop={3}>
                                                {course.course_title}
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                                                {course.course_code}
                                            </Typography>
                                        </Box>
                                        <Button
                                            onClick={() => navigate(`/courses/${course.course_id}`)}
                                            variant="contained"
                                            size="medium"
                                            sx={{ alignSelf: 'flex-start', borderRadius: 3, backgroundColor: '#1976d2', py: 1.2, marginLeft: 2, marginTop: 4 }}
                                        >
                                            View Details
                                        </Button>
                                    </Paper>
                                </motion.div>
                            </Grid>
                        ))
                    )}
                </Grid>
            </motion.div>



            <motion.div initial="hide" animate="show" variants={sectionVariants}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3, mt: 10 }}>
                    All Courses with Enrollment Status
                </Typography>
                <Grid container spacing={4} justifyContent="center" marginTop={7}>
                    {availableCourses.length === 0 ? (
                        <Typography variant="body1" color="text.secondary">No course data found.</Typography>
                    ) : (
                        availableCourses.map((course, index) => (
                            <Grid item xs={12} sm={8} md={6} key={index}>
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
                                            height: '190px',
                                            width: "220px"
                                        }}
                                    >
                                        <Box mb={3}>
                                            <Typography fontSize={24} fontWeight={600}>
                                                Course ID - {course.course}
                                            </Typography>
                                            {course.status !== 'NOT_ENROLLED' ? (
                                                <>
                                                    <Typography variant="subtitle2" sx={{ mt: 1, fontSize: 16 }}>
                                                        Enrollment Date: {course.enrollment_date || '—'}
                                                    </Typography>
                                                    <Typography variant="subtitle2" sx={{ mt: 1, fontSize: 16 }}>
                                                        Student ID: {course.student || '—'}
                                                    </Typography>
                                                    <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: "bold", fontSize: 17 }}>
                                                        Status of the Course:
                                                    </Typography>
                                                    <Chip
                                                        label={
                                                            course.status === 'A'
                                                                ? 'Active'
                                                                : course.status === 'P'
                                                                    ? 'Pending'
                                                                    : course.status
                                                        }
                                                        color={
                                                            course.status === 'A'
                                                                ? 'success'
                                                                : course.status === 'P'
                                                                    ? 'warning'
                                                                    : 'default'
                                                        }
                                                        variant="outlined"
                                                        sx={{ mt: 1, fontsize: 30, width: "50%", background: "#F7AC88", color: "white", fontWeight: "bold" }}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <Typography variant="subtitle2" sx={{ mt: 1, fontsize: 16 }}>
                                                        No Enrollment Date
                                                    </Typography>
                                                    <Typography variant="subtitle2" sx={{ mt: 1, fontsize: 16 }}>
                                                        Student ID: {course.student || '—'}
                                                    </Typography>
                                                    <Button
                                                        onClick={() => handleEnroll(course.course)}
                                                        variant="outlined"
                                                        size="medium"
                                                        sx={{ marginTop: 5, borderRadius: 3, borderColor: '#1976d2', color: '#1976d2', py: 1.2, width: "100%" }}
                                                    >
                                                        Enroll
                                                    </Button>

                                                </>

                                            )}
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

export default StudentDashboard;

