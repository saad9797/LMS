import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import DataCard from '../components/DataCard';

const dummyData = [
    { id: 1, title: 'React', description: 'A JavaScript library for building UI' },
    { id: 2, title: 'Material UI', description: 'React components for faster web development' },
    { id: 3, title: 'Axios', description: 'Promise-based HTTP client for the browser and Node.js' }
];

const Dashboard = () => {
    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={2}>
                {dummyData.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <DataCard title={item.title} description={item.description} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Dashboard;
