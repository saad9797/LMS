import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    LinearProgress
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { motion } from 'framer-motion';

const dummySubmissions = [
    { id: 1, file: 'Homework1.pdf', date: '2025-05-01', status: 'Graded' },
    { id: 2, file: 'Homework2.docx', date: '2025-05-05', status: 'Pending' }
];

const AssignmentSubmission = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) return;
        // simulate upload
        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            setUploadProgress(progress);
            if (progress >= 100) clearInterval(interval);
        }, 300);
    };

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #f8bbd0 50%, #ffffff 100%)' }}>
            {/* Background blobs */}
            <Box sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(25,118,210,0.2)', top: -100, left: -100, filter: 'blur(80px)' }} />
            <Box sx={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', background: 'rgba(244,143,177,0.3)', bottom: -80, right: -60, filter: 'blur(60px)' }} />

            <Container maxWidth="sm" sx={{ pt: 8, pb: 4, zIndex: 1 }}>
                {/* Assignment Info Card */}
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Paper sx={{ p: 4, mb: 4, borderRadius: 3, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Assignment: Homework 3
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Due Date: 2025-06-01
                        </Typography>
                        <Typography variant="body1">
                            Please upload your solution file in PDF or Word format below.
                        </Typography>
                    </Paper>
                </motion.div>

                {/* File Upload Area */}
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 4,
                            border: '2px dashed rgba(0,0,0,0.2)',
                            textAlign: 'center',
                            mb: 2,
                            background: 'rgba(255,255,255,0.9)',
                            borderRadius: 3
                        }}
                    >
                        <UploadFileIcon sx={{ fontSize: 48, color: '#1976d2' }} />
                        <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
                            {selectedFile ? selectedFile.name : 'Drag & drop file here or click to select'}
                        </Typography>
                        <input
                            hidden
                            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            type="file"
                            id="upload-input"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="upload-input">
                            <Button variant="contained" component="span" sx={{ borderRadius: 3 }}>
                                Choose File
                            </Button>
                        </label>
                    </Paper>
                </motion.div>

                {/* Upload Button & Progress */}
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mb: 2, borderRadius: 3, py: 1.5 }}
                        onClick={handleUpload}
                        disabled={!selectedFile}
                    >
                        Submit Assignment
                    </Button>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <LinearProgress variant="determinate" value={uploadProgress} sx={{ mb: 2 }} />
                    )}
                </motion.div>

                {/* Submission History */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Submission History
                    </Typography>
                    <List>
                        {dummySubmissions.map((sub) => (
                            <ListItem key={sub.id} divider>
                                <ListItemText
                                    primary={sub.file}
                                    secondary={`${sub.date} • ${sub.status}`}
                                />
                                <Button size="small" variant="outlined">
                                    Download
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </motion.div>
            </Container>
        </Box>
    );
};

export default AssignmentSubmission;
