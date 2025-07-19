

import React from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    Stack
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';  // <--- import API helper

const StudentSignup = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm();

    // Updated onSubmit to call real endpoint
    const onSubmit = async (data) => {
        try {
            await api.post('/student-signup/', {
                username: data.name,
                classYear: data.academicYear,
                email: data.email,
                password: data.password
            });
            // alert('Signup successful! Please log in.');
            console.log("this is dataaaa", data)
            sessionStorage.setItem("just_signed_up", "true");

            // navigate('/dashboard/student');
            navigate('/student/login');
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.detail || JSON.stringify(err.response?.data) || 'Signup failed';
            alert(msg);
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e3f2fd 0%, #f8bbd0 50%, #ffffff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            {/* Decorative blobs */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -100,
                    left: -80,
                    width: 280,
                    height: 280,
                    borderRadius: '50%',
                    background: 'rgba(25,118,210,0.2)',
                    filter: 'blur(80px)'
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -80,
                    right: -60,
                    width: 260,
                    height: 260,
                    borderRadius: '50%',
                    background: 'rgba(244,143,177,0.3)',
                    filter: 'blur(60px)'
                }}
            />

            <Container maxWidth="xs" sx={{ zIndex: 1 }}>
                <Paper
                    elevation={8}
                    sx={{
                        p: 4,
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(8px)'
                    }}
                >
                    <Stack spacing={2} alignItems="center" mb={2}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <SchoolIcon sx={{ fontSize: 56, color: '#1976d2' }} />
                        </motion.div>
                        <Typography variant="h5" fontWeight="bold">
                            Student Signup
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Create your account to get started
                        </Typography>
                    </Stack>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Full name is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Full Name"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                        sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 1 }}
                                    />
                                )}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Email is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 1 }}
                                    />
                                )}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Password is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 1 }}
                                    />
                                )}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <Controller
                                name="academicYear"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Academic year is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Academic Year"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.academicYear}
                                        helperText={errors.academicYear?.message}
                                        sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 1 }}
                                    />
                                )}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0, duration: 0.5 }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2, borderRadius: 3, py: 1.5 }}
                            >
                                Create Account
                            </Button>
                        </motion.div>
                    </Box>

                    <Typography mt={2} textAlign="center" variant="body2">
                        Already have an account?{' '}
                        <Box
                            component="span"
                            onClick={() => navigate('/student/login')}
                            sx={{ color: '#1976d2', cursor: 'pointer' }}
                        >
                            Login
                        </Box>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default StudentSignup;
