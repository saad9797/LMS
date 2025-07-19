import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
    Box, Container, Grid, Card, CardContent,
    Typography, Button, CircularProgress, useTheme, alpha
} from '@mui/material';
import { motion } from 'framer-motion';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await api.get('/courses/');
                setCourses(res.data);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, mb: 9 }}>
                Available Courses
            </Typography>

            <Grid container spacing={12} justifyContent="center">
                {courses.map(course => (
                    <Grid item xs={12} sm={6} md={4} key={course.course_id}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: course.course_id * 0.1 }}
                        >
                            <Card
                                sx={{
                                    borderRadius: 4, overflow: 'hidden',
                                    boxShadow: theme.shadows[4], minHeight: 260,
                                    display: 'flex', flexDirection: 'column',
                                    '&:hover': { transform: 'translateY(-8px)', boxShadow: theme.shadows[16] },
                                    transition: 'transform 0.4s'
                                }}
                            >
                                <Box
                                    sx={{
                                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.8)} 0%, ${alpha(theme.palette.secondary.light, 0.8)} 100%)`,
                                        color: '#fff', p: 3
                                    }}
                                >
                                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                        {course.course_name}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ opacity: 0.85, mt: 1 }}>
                                        {course.course_code}
                                    </Typography>
                                </Box>

                                <CardContent sx={{ flexGrow: 1, p: 4, background: theme.palette.background.paper }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        sx={{ borderRadius: 3, py: 1.8, backgroundColor: "#E6C2EC", fontWeight: "bolder" }}
                                        onClick={() => navigate(`/courses/${course.course_id}`)}  // ← here!
                                    >
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CourseList;
