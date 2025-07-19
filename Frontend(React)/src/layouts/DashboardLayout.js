import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import BookIcon from '@mui/icons-material/MenuBookOutlined';
import AssignmentIcon from '@mui/icons-material/AssignmentOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import verifyToken from '../services/verifyToken';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';


const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userRole, setUserRole] = useState(null);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);


    useEffect(() => {
        const fetchUserRole = async () => {
            const res = await verifyToken();
            if (res?.student_id) setUserRole('student');
            else if (res?.instructor_id) setUserRole('instructor');
        };
        fetchUserRole();
    }, []);

    const navItems = [
        {
            text: 'Dashboard',
            icon: <DashboardIcon />,
            paths: ['/dashboard/student', '/dashboard/instructor'],
            path: userRole === 'student' ? '/dashboard/student' : '/dashboard/instructor'
        },
        { text: 'Courses', icon: <BookIcon />, path: '/courses' },
        { text: 'Assignments', icon: <AssignmentIcon />, path: '/assignments' },
        // { text: 'Profile', icon: <PersonIcon /> },
        { text: 'Logout', icon: <LogoutIcon /> }
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'transparent', position: 'relative' }}>
            {/* Background */}
            <Box sx={{ position: 'absolute', width: '100%', height: '100%', background: 'linear-gradient(135deg, #e3f2fd 0%, #f8bbd0 50%, #ffffff 100%)', zIndex: -2 }} />
            <Box sx={{ position: 'absolute', top: -100, left: -100, width: 300, height: 300, borderRadius: '50%', background: 'rgba(25,118,210,0.2)', filter: 'blur(80px)', zIndex: -1 }} />
            <Box sx={{ position: 'absolute', bottom: -80, right: -80, width: 260, height: 260, borderRadius: '50%', background: 'rgba(244,143,177,0.3)', filter: 'blur(60px)', zIndex: -1 }} />

            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        CourseReg
                    </Typography>
                </Toolbar>
                {/* <List>
                    {navItems.map((item) => {
                        const isActive = item.paths
                            ? item.paths.includes(location.pathname)
                            : item.path === location.pathname;

                        const isNavigable = item.path || (item.paths && item.paths.length);
                        const handleClick = () => {
                            if (item.path) navigate(item.path);
                            else if (item.paths) navigate(item.paths[0]);
                        };

                        return (
                            <ListItem
                                button
                                key={item.text}
                                onClick={isNavigable ? handleClick : undefined}
                                sx={{
                                    backgroundColor: isActive ? '#f8bbd0' : 'transparent',
                                    borderRadius: 2,
                                    mx: 1,
                                    my: 0.5,
                                    '&:hover': { backgroundColor: '#fce4ec' }
                                }}
                            >
                                <ListItemIcon sx={{ color: isActive ? '#c2185b' : 'inherit' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} sx={{ color: isActive ? '#c2185b' : 'inherit' }} />
                            </ListItem>
                        );
                    })}
                </List> */}
                <List>
                    {navItems.map((item) => {
                        const isActive = item.paths
                            ? item.paths.includes(location.pathname)
                            : item.path === location.pathname;

                        const isLogout = item.text === 'Logout';

                        const handleClick = () => {
                            if (isLogout) {
                                setLogoutDialogOpen(true); // open dialog
                            } else if (item.path) {
                                navigate(item.path);
                            } else if (item.paths) {
                                navigate(item.paths[0]);
                            }
                        };


                        return (
                            <ListItem
                                button
                                key={item.text}
                                onClick={handleClick}
                                sx={{
                                    backgroundColor: isActive ? '#f8bbd0' : 'transparent',
                                    borderRadius: 2,
                                    mx: 1,
                                    my: 0.5,
                                    '&:hover': { backgroundColor: '#fce4ec' }
                                }}
                            >
                                <ListItemIcon sx={{ color: isActive ? '#c2185b' : 'inherit' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} sx={{ color: isActive ? '#c2185b' : 'inherit' }} />
                            </ListItem>
                        );
                    })}
                </List>

            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
            {/* <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLogoutDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            localStorage.clear();
                            navigate('/');
                        }}
                        color="error"
                        variant="contained"
                    >
                        Logout
                    </Button>
                </DialogActions>
            </Dialog> */}
            <Dialog
                open={logoutDialogOpen}
                onClose={() => setLogoutDialogOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        p: 2,
                        background: 'linear-gradient(135deg, #f8bbd0 0%, #fce4ec 100%)',
                        boxShadow: 12,
                    },
                }}
            >
                <DialogTitle
                    sx={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#880e4f', textAlign: 'center' }}
                >
                    🔐 Confirm Logout
                </DialogTitle>

                <DialogContent>
                    <DialogContentText sx={{ textAlign: 'center', color: '#5e5e5e' }}>
                        Are you sure you want to log out of your session?
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center', mt: 1 }}>
                    <Button
                        onClick={() => setLogoutDialogOpen(false)}
                        variant="outlined"
                        sx={{ borderColor: '#c2185b', color: '#c2185b' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            localStorage.clear();
                            navigate('/');
                        }}
                        variant="contained"
                        sx={{ backgroundColor: '#c2185b', color: 'white', '&:hover': { backgroundColor: '#ad1457' } }}
                    >
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
};

export default DashboardLayout;
