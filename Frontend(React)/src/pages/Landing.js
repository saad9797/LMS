// import React from 'react';
// import { Box, Button, Typography, Container, Stack } from '@mui/material';
// import SchoolIcon from '@mui/icons-material/School';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const Landing = () => {
//     const navigate = useNavigate();

//     return (
//         <Box
//             sx={{
//                 minHeight: '100vh',
//                 background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
//                 display: 'flex',
//                 alignItems: 'center',
//             }}
//         >
//             <Container maxWidth="md">
//                 <Stack spacing={4} textAlign="center" alignItems="center">
//                     <motion.div
//                         initial={{ scale: 0, rotate: 180 }}
//                         animate={{ scale: 1, rotate: 0 }}
//                         transition={{ duration: 0.8, ease: 'easeOut' }}
//                     >
//                         <SchoolIcon sx={{ fontSize: 80, color: '#1976d2' }} />
//                     </motion.div>

//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.3, duration: 0.6 }}
//                     >
//                         <Typography variant="h3" fontWeight="bold">
//                             NED Course Registration
//                         </Typography>
//                     </motion.div>

//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.6, duration: 0.6 }}
//                     >
//                         <Typography variant="h6" color="text.secondary">
//                             Sign in to register for courses, view assignments, and more.
//                         </Typography>
//                     </motion.div>

//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.9, duration: 0.6 }}
//                     >
//                         <Stack direction="row" spacing={2} justifyContent="center">
//                             <Button
//                                 variant="contained"
//                                 size="large"
//                                 onClick={() => navigate('/student/login')}
//                             >
//                                 Student Login
//                             </Button>
//                             <Button
//                                 variant="outlined"
//                                 size="large"
//                                 onClick={() => navigate('/instructor/login')}
//                             >
//                                 Instructor Login
//                             </Button>
//                         </Stack>
//                     </motion.div>
//                 </Stack>
//             </Container>
//         </Box>
//     );
// };

// export default Landing;

import React from 'react';
import { Box, Button, Typography, Container, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 50%, #ffffff 100%)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {/* Decorative Floating Blobs */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'rgba(25,118,210,0.2)',
                    top: -100,
                    left: -100,
                    filter: 'blur(80px)',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(244, 143, 177, 0.3)',
                    bottom: -50,
                    right: -50,
                    filter: 'blur(60px)',
                }}
            />

            <Container maxWidth="sm" sx={{ zIndex: 1 }}>
                <Stack spacing={4} textAlign="center" alignItems="center">
                    <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <SchoolIcon sx={{ fontSize: 80, color: '#1976d2' }} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <Typography variant="h3" fontWeight="bold" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                            NED Course Registration
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 400 }}>
                            Sign in to register for courses, view assignments, and more.
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                    >
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/student/login')}
                                sx={{ borderRadius: 3, px: 4, py: 1.5 }}
                            >
                                Student Login
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/instructor/login')}
                                sx={{ borderRadius: 3, px: 4, py: 1.5, borderColor: '#1976d2', color: '#1976d2' }}
                            >
                                Instructor Login
                            </Button>
                        </Stack>
                    </motion.div>
                </Stack>
            </Container>
        </Box>
    );
};

export default Landing;
