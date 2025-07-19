// import React, { useEffect, useState } from 'react';
// import {
//     Box,
//     Typography,
//     Container,
//     Grid,
//     Paper,
//     Button,
//     Chip,
//     CircularProgress
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import api from '../services/api';

// const cardVariants = {
//     initial: { opacity: 0, y: 30 },
//     animate: { opacity: 1, y: 0 },
//     hover: { scale: 1.03 }
// };

// const AssignmentDetails = () => {
//     const [assignments, setAssignments] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchAssignments = async () => {
//             try {
//                 const res = await api.get('/assignments/');
//                 setAssignments(res.data);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAssignments();
//     }, []);

//     if (loading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     return (
//         <Container sx={{ mt: 4, mb: 8 }}>
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//             >
//                 <Typography variant="h4" fontWeight="bold" gutterBottom>
//                     📚 Assignments Overview
//                 </Typography>
//             </motion.div>

//             {assignments.length === 0 ? (
//                 <Typography variant="h6" color="text.secondary" mt={5}>
//                     No assignments found.
//                 </Typography>
//             ) : (
//                 <Grid container spacing={4} mt={3}>
//                     {assignments.map((a) => (
//                         <Grid item xs={12} sm={6} md={4} key={a.assignment_id}>
//                             <motion.div
//                                 variants={cardVariants}
//                                 initial="initial"
//                                 animate="animate"
//                                 whileHover="hover"
//                                 transition={{ duration: 0.4 }}
//                             >
//                                 <Paper
//                                     elevation={0}
//                                     sx={{
//                                         p: 4,
//                                         borderRadius: 4,
//                                         background: 'rgba(255,255,255,0.7)',
//                                         backdropFilter: 'blur(10px)',
//                                         boxShadow: '0 10px 24px rgba(0,0,0,0.15)',
//                                         height: '100%',
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         justifyContent: 'space-between'
//                                     }}
//                                 >
//                                     <Box mb={2}>
//                                         <Typography variant="h6" fontWeight="bold" gutterBottom>
//                                             {a.title || 'Untitled Assignment'}
//                                         </Typography>
//                                         <Typography variant="body2" color="text.secondary">
//                                             {/* {a.description || 'No description available.'} */}
//                                             No description available.
//                                         </Typography>
//                                     </Box>

//                                     <Box mt={2}>
//                                         <Chip
//                                             label={`Due: ${a.due_date ? new Date(a.due_date).toLocaleDateString() : 'TBD'}`}
//                                             color="warning"
//                                             variant="outlined"
//                                             sx={{ mr: 1 }}
//                                         />
//                                         <Chip
//                                             label={`Points: ${a.total_points ?? 'N/A'}`}
//                                             color="info"
//                                             variant="outlined"
//                                         />
//                                     </Box>

//                                     <Button
//                                         variant="outlined"
//                                         size="medium"
//                                         sx={{ mt: 3, borderRadius: 3, fontWeight: 'bold' }}
//                                     >
//                                         View / Submit
//                                     </Button>
//                                 </Paper>
//                             </motion.div>
//                         </Grid>
//                     ))}
//                 </Grid>
//             )}
//         </Container>
//     );
// };

// export default AssignmentDetails;


import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    Button,
    Chip,
    CircularProgress,
    useTheme,
    alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import api from '../services/api';

const cardVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.04, boxShadow: '0 16px 32px rgba(0,0,0,0.2)' }
};

const AssignmentDetails = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await api.get('/assignments/');
                setAssignments(res.data);
            } finally {
                setLoading(false);
            }
        };
        fetchAssignments();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Container sx={{ mt: 6, mb: 10 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Assignments Overview                </Typography>
            </motion.div>

            {assignments.length === 0 ? (
                <Typography variant="h6" color="text.secondary" align="center" mt={8}>
                    No assignments found.
                </Typography>
            ) : (
                <Grid container spacing={6} mt={7} align="center" >
                    {assignments.map((a, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={a.assignment_id}>
                            <motion.div
                                variants={cardVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <Paper
                                    elevation={4}
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        background: alpha(theme.palette.background.paper, 0.8),
                                        backdropFilter: 'blur(12px)',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Box>
                                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                                            {a.title || 'Untitled Assignment'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {a.description || 'No description available.'}
                                        </Typography>
                                    </Box>

                                    <Box mt={3}>
                                        <Chip
                                            label={`Due: ${a.due_date ? new Date(a.due_date).toLocaleDateString() : 'TBD'}`}
                                            color="secondary"
                                            variant="outlined"
                                            sx={{ mr: 1, fontWeight: 600 }}
                                        />
                                        <Chip
                                            label={`Points: ${a.total_points ?? 'N/A'}`}
                                            color="primary"
                                            variant="outlined"
                                            sx={{ fontWeight: 600 }}
                                        />
                                    </Box>

                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            mt: 3,
                                            borderRadius: 3,
                                            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                                            color: '#fff',
                                            py: 1.5,
                                            fontWeight: 700,
                                            alignSelf: 'center'
                                        }}
                                    >
                                        View / Submit
                                    </Button>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default AssignmentDetails;