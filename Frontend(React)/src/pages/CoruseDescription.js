import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Box, Paper, Typography, Divider, CircularProgress, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const CourseDescription = () => {
    const { id } = useParams();
    const [courseDetail, setCourseDetail] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await api.get(`/course-offerings/course/${id}`);
                setCourseDetail(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDetail();
    }, [id]);

    if (!courseDetail) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            sx={{ maxWidth: 800, mx: 'auto', mt: 4, px: 2 }}
        >
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                {/* Header with gradient background */}
                <Box
                    sx={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        color: '#fff',
                        p: 3
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Course Description
                    </Typography>
                    <Typography variant="h6">
                        {courseDetail.course_name}
                    </Typography>
                </Box>

                {/* Details Section */}
                <Box sx={{ p: 3, backgroundColor: "#FFEFF6" }}>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Instructor:</strong> {courseDetail.instructor_name}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Department:</strong> {courseDetail.department_name}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Schedule:</strong> {courseDetail.schedule_info}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Semester:</strong> {courseDetail.semester}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Year:</strong> {courseDetail.year}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default CourseDescription;