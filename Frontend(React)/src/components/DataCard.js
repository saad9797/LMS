import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const DataCard = ({ title, description }) => {
    return (
        <Card sx={{ minHeight: 150 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DataCard;
