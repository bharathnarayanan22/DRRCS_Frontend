import React, { useState } from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import Tasks from "../volunteerComponents/Tasks";
import List from "@mui/material/List";
import AddResources from "../donorComponents/AddResourses";
import ViewRequests from "../donorComponents/ViewRequests";
import ChangeYourRole from "../donorComponents/ChangeYourRole";
import MyContributions from "../donorComponents/MyContributions";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import logo1 from "../assets/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserProfilePage from "../coordinatorComponents/UserProfile";
import { Modal, Button } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

const StyledList = styled(List)(({ theme }) => ({
    color: theme.palette.primary.main,
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
}));

const theme = createTheme({
    palette: {
        primary: {
            main: "#2C3E50",
        },
        secondary: {
            main: "#2C3E50",
        },
    },
});

export default function CoordinatorDashboard() {
    const [open, setOpen] = useState(false);
    const [selectedView, setSelectedView] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenuItemClick = (view) => {
        setSelectedView(view);
    };

    const handleHomeClick = () => {
        navigate("/register");
    };

    const handleOpenProfile = (userId) => {
        setSelectedUserId(userId);
        setModalOpen(true);
    };

    const handleCloseProfile = () => {
        setSelectedUserId(null);
        setModalOpen(false);
    };

    const selectedStyle = {
        backgroundColor: "#2C3E50",
        color: "white",
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: "none" }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" color="white">
                            Donor Dashboard
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <AccountCircleIcon sx={{ marginRight: 1 }} onClick={() => handleOpenProfile(localStorage.getItem('userId'))} />
                        <Typography variant="body1" color="white">
                            {localStorage.getItem('username')}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <Box>
                        <DrawerHeader>
                            <IconButton
                                onClick={handleDrawerClose}
                                color="inherit"
                                sx={{ "&:hover": { backgroundColor: "#2C3E50", color: "white" } }}
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <StyledList>
                            <ListItemButton
                                onClick={() => handleMenuItemClick("View Requests")}
                                sx={{
                                    "&:hover": { backgroundColor: "#2C3E50", color: "white" }, gap: "32px",
                                    ...(selectedView === "View Requests" && selectedStyle),
                                }}
                            >
                                {/* <ListItemIcon> */}
                                <VisibilityIcon />
                                {/* </ListItemIcon> */}
                                <ListItemText primary="View Requests" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => handleMenuItemClick("Add Resources")}
                                sx={{
                                    "&:hover": { backgroundColor: "#2C3E50", color: "white" }, gap: "32px",
                                    ...(selectedView === "Add Resources" && selectedStyle),
                                }}
                            >
                                {/* <ListItemIcon> */}
                                <AddCircleIcon />
                                {/* </ListItemIcon> */}
                                <ListItemText primary="Add Resources" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => handleMenuItemClick("MyContributions")}
                                sx={{
                                    "&:hover": { backgroundColor: "#2C3E50", color: "white" }, gap: "32px",
                                    ...(selectedView === "MyContributions" && selectedStyle),
                                }}
                            >
                                {/* <ListItemIcon> */}
                                <AssignmentIcon />
                                {/* </ListItemIcon> */}
                                <ListItemText primary="MyContributions" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => handleMenuItemClick("Change your Role")}
                                sx={{
                                    "&:hover": { backgroundColor: "#2C3E50", color: "white" }, gap: "32px",
                                    ...(selectedView === "Change your Role" && selectedStyle),
                                }}
                            >
                                {/* <ListItemIcon> */}
                                <SwapHorizIcon />
                                {/* </ListItemIcon> */}
                                <ListItemText primary="Change your Role" />
                            </ListItemButton>
                        </StyledList>
                    </Box>
                    <Box sx={{ marginTop: "auto" }}>
                        <Divider />
                        <ListItemButton
                            onClick={handleHomeClick}
                            sx={{ "&:hover": { backgroundColor: "#2C3E50", color: "white" }, gap: "32px" }}
                        >
                            {/* <StyledListItemIcon> */}
                            <ExitToAppIcon />
                            {/* </StyledListItemIcon> */}
                            <ListItemText primary="Log Out" />
                        </ListItemButton>
                    </Box>
                </Drawer>
                <div
                    style={{
                        backgroundImage: `url(${logo1})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.2,
                        marginTop: '8%',
                        height: '70%',
                        width: '100%',
                        position: 'absolute',
                        zIndex: -1,
                    }}
                />
                <Main open={open}>
                    <DrawerHeader />
                    {selectedView === null && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: 10, padding: 4, alignItems: "center", alignContent: "center", height: "500px" }}>
                            <Card sx={{ backgroundColor: '#2C3E50', width: '20%', borderRadius: 5 }} onClick={() => handleMenuItemClick("View Requests")}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <VisibilityIcon sx={{ fontSize: 125, color: 'white' }} />
                                    <Typography gutterBottom variant="body2" component="div" color="white" textAlign="center">
                                        View Requests
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{ backgroundColor: '#2C3E50', width: '20%', borderRadius: 5 }} onClick={() => handleMenuItemClick("Add Resources")}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <AddCircleIcon sx={{ fontSize: 125, color: 'white' }} />
                                    <Typography gutterBottom variant="body2" component="div" color="white" textAlign="center">
                                        Add Resources
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{ backgroundColor: '#2C3E50', width: '20%', borderRadius: 5 }} onClick={() => handleMenuItemClick("MyContributions")}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <AssignmentIcon sx={{ fontSize: 125, color: 'white' }} />
                                    <Typography gutterBottom variant="body2" component="div" color="white" textAlign="center">
                                        MyContributions
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{ backgroundColor: '#2C3E50', width: '20%', borderRadius: 5 }} onClick={() => handleMenuItemClick("Change your Role")}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <SwapHorizIcon sx={{ fontSize: 125, color: 'white' }} />
                                    <Typography gutterBottom variant="body2" component="div" color="white" textAlign="center">
                                        Change your Role
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    )}
                    {selectedView === 'View Requests' && <ViewRequests />}
                    {selectedView === 'Add Resources' && <AddResources />}
                    {selectedView === 'MyContributions' && <MyContributions />}
                    {selectedView === 'Change your Role' && <ChangeYourRole />}
                </Main>
                <Modal
                    open={modalOpen}
                    onClose={handleCloseProfile}
                    aria-labelledby="user-profile-modal"
                    aria-describedby="user-profile-modal-description"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 600,
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        {selectedUserId && <UserProfilePage userId={selectedUserId} />}
                        <Button
                            onClick={handleCloseProfile}
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2, ml: 1 }}
                        >
                            Close
                        </Button>
                    </Box>
                </Modal>
            </Box>
        </ThemeProvider>
    );
}
