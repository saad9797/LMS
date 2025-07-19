// import React, { useState } from 'react';
// import {
//     Box,
//     Button,
//     Container,
//     TextField,
//     Typography,
//     InputAdornment,
//     IconButton,
//     Paper,
//     Stack
// } from '@mui/material';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import SchoolIcon from '@mui/icons-material/School';
// import { useForm, Controller } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const StudentLogin = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const togglePassword = () => setShowPassword((prev) => !prev);
//     const navigate = useNavigate();

//     const {
//         control,
//         handleSubmit,
//         formState: { errors }
//     } = useForm();

//     const onSubmit = (data) => {
//         console.log('Login Data:', data);
//         // TODO: call API
//     };

//     return (
//         <Box
//             sx={{
//                 position: 'relative',
//                 minHeight: '100vh',
//                 background: 'linear-gradient(135deg, #e3f2fd 0%, #f8bbd0 50%, #ffffff 100%)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 overflow: 'hidden'
//             }}
//         >
//             {/* Blobs */}
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     top: -80,
//                     right: -60,
//                     width: 240,
//                     height: 240,
//                     borderRadius: '50%',
//                     background: 'rgba(244, 143, 177, 0.3)',
//                     filter: 'blur(70px)'
//                 }}
//             />
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     bottom: -80,
//                     left: -60,
//                     width: 260,
//                     height: 260,
//                     borderRadius: '50%',
//                     background: 'rgba(25, 118, 210, 0.2)',
//                     filter: 'blur(60px)'
//                 }}
//             />

//             <Container maxWidth="xs" sx={{ zIndex: 1 }}>
//                 <Paper
//                     elevation={8}
//                     sx={{
//                         p: 4,
//                         borderRadius: 4,
//                         background: 'rgba(255, 255, 255, 0.75)',
//                         backdropFilter: 'blur(8px)'
//                     }}
//                 >
//                     <Stack spacing={2} alignItems="center" mb={2}>
//                         <motion.div
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             transition={{ duration: 0.6, ease: 'easeOut' }}
//                         >
//                             <SchoolIcon sx={{ fontSize: 56, color: '#1976d2' }} />
//                         </motion.div>
//                         <Typography variant="h5" fontWeight="bold">
//                             Student Login
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Access your course dashboard
//                         </Typography>
//                     </Stack>

//                     <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//                         <motion.div
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: 0.2, duration: 0.5 }}
//                         >
//                             <Controller
//                                 name="email"
//                                 control={control}
//                                 defaultValue=""
//                                 rules={{ required: 'Email is required' }}
//                                 render={({ field }) => (
//                                     <TextField
//                                         {...field}
//                                         label="Email"
//                                         fullWidth
//                                         margin="normal"
//                                         error={!!errors.email}
//                                         helperText={errors.email?.message}
//                                         sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 1 }}
//                                     />
//                                 )}
//                             />
//                         </motion.div>

//                         <motion.div
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: 0.4, duration: 0.5 }}
//                         >
//                             <Controller
//                                 name="password"
//                                 control={control}
//                                 defaultValue=""
//                                 rules={{ required: 'Password is required' }}
//                                 render={({ field }) => (
//                                     <TextField
//                                         {...field}
//                                         label="Password"
//                                         type={showPassword ? 'text' : 'password'}
//                                         fullWidth
//                                         margin="normal"
//                                         error={!!errors.password}
//                                         helperText={errors.password?.message}
//                                         sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 1 }}
//                                         InputProps={{
//                                             endAdornment: (
//                                                 <InputAdornment position="end">
//                                                     <IconButton onClick={togglePassword} edge="end">
//                                                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                                                     </IconButton>
//                                                 </InputAdornment>
//                                             )
//                                         }}
//                                     />
//                                 )}
//                             />
//                         </motion.div>

//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: 0.6, duration: 0.5 }}
//                         >
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 fullWidth
//                                 sx={{ mt: 2, borderRadius: 3, py: 1.5 }}
//                             >
//                                 Sign In
//                             </Button>
//                         </motion.div>
//                     </Box>

//                     <Typography mt={2} textAlign="center" variant="body2">
//                         Don't have an account?{' '}
//                         <Box
//                             component="span"
//                             onClick={() => navigate('/student/signup')}
//                             sx={{ color: '#1976d2', cursor: 'pointer' }}
//                         >
//                             Sign up
//                         </Box>
//                     </Typography>
//                 </Paper>
//             </Container>
//         </Box>
//     );
// };

// export default StudentLogin;


import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Paper,
    Stack
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SchoolIcon from '@mui/icons-material/School';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import verifyToken from '../services/verifyToken';

const StudentLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prev) => !prev);
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await api.post('/login/', {
                email: data.email,
                password: data.password,
                role: 'student'
            });
            const { token, refresh } = response.data;
            sessionStorage.setItem('access_token', `Bearer ${token}`);
            sessionStorage.setItem('refresh_token', refresh);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Token verification
            const isValid = await verifyToken(`Bearer ${token}`);
            if (isValid) {
                // alert('Login successful!');
                navigate('/dashboard/student');
            } else {
                alert('Invalid token. Please log in again.');
                navigate('/student/login');
            }
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.detail || 'Login failed';
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
            <Box
                sx={{
                    position: 'absolute',
                    top: -80,
                    right: -60,
                    width: 240,
                    height: 240,
                    borderRadius: '50%',
                    background: 'rgba(244, 143, 177, 0.3)',
                    filter: 'blur(70px)'
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -80,
                    left: -60,
                    width: 260,
                    height: 260,
                    borderRadius: '50%',
                    background: 'rgba(25, 118, 210, 0.2)',
                    filter: 'blur(60px)'
                }}
            />

            <Container maxWidth="xs" sx={{ zIndex: 1 }}>
                <Paper
                    elevation={8}
                    sx={{
                        p: 4,
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.75)',
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
                            Student Login
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Access your course dashboard
                        </Typography>
                    </Stack>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
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
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
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
                                        type={showPassword ? 'text' : 'password'}
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 1 }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={togglePassword} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2, borderRadius: 3, py: 1.5 }}
                            >
                                Sign In
                            </Button>
                        </motion.div>
                    </Box>

                    <Typography mt={2} textAlign="center" variant="body2">
                        Don't have an account?{' '}
                        <Box
                            component="span"
                            onClick={() => navigate('/student/signup')}
                            sx={{ color: '#1976d2', cursor: 'pointer' }}
                        >
                            Sign up
                        </Box>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default StudentLogin;
