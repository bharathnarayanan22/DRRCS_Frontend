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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";


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
      main: "#000",
    },
    secondary: {
      main: "#000",
    },
  },
});

export default function OrganizerDashboard() {
  const [open, setOpen] = useState(false);
  const [selectedView, setSelectedView] = useState(null);

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (view) => {
    setSelectedView(view);
    setOpen(false); 
  };

  const handleCardClick = (view) => {
    setSelectedView(view);
    setOpen(false);
  };
  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
        }}
      >

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
              DRRCS Dashboard
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
              <IconButton onClick={handleDrawerClose} color="inherit">
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <StyledList>
              <ListItemButton
                onClick={() => handleMenuItemClick("Tasks")}
                sx={{
                  "&:hover": { backgroundColor: "#000", color: "white" },
                }}
              >
                <StyledListItemIcon>
                  <PersonAddIcon />
                </StyledListItemIcon>
                <ListItemText primary="Enroll Voter" />
              </ListItemButton>
              <ListItemButton
                onClick={() => handleMenuItemClick("volunteers")}
                sx={{
                  "&:hover": { backgroundColor: "#000", color: "white" },
                }}
              >
                <StyledListItemIcon>
                  <GroupAddIcon />
                </StyledListItemIcon>
                <ListItemText primary="Enroll Party" />
              </ListItemButton>
              <ListItemButton
                onClick={() => handleMenuItemClick("requets")}
                sx={{
                  "&:hover": { backgroundColor: "#000", color: "white" },
                }}
              >
                <StyledListItemIcon>
                  <PeopleAltIcon />
                </StyledListItemIcon>
                <ListItemText primary="View Voters" />
              </ListItemButton>
              <ListItemButton
                onClick={() => handleMenuItemClick("donors")}
                sx={{
                  "&:hover": { backgroundColor: "#000", color: "white" },
                }}
              >
                <StyledListItemIcon>
                  <FormatListBulletedIcon />
                </StyledListItemIcon>
                <ListItemText primary="View Parties" />
              </ListItemButton>
            </StyledList>
          </Box>
          <Box sx={{ marginTop: "auto" }}>
            <Divider />
            <ListItemButton
              onClick={handleHomeClick}
              sx={{ "&:hover": { backgroundColor: "#000", color: "white" } }}
            >
              <StyledListItemIcon>
                <ExitToAppIcon />
              </StyledListItemIcon>
              <ListItemText primary="Back to Home" />
            </ListItemButton>
          </Box>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {selectedView === null && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                gap: 4,
                padding: 4,
              }}
            >
              
            </Box>
          )}
        </Main>
      </Box>
    </ThemeProvider>
  );
}
