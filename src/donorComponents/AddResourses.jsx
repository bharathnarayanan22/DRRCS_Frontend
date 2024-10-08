import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from '../helpers/auth-config';
import { useSelector } from "react-redux";
import MapPicker from "../components/MapPicker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2C3E50',
    },
    secondary: {
      main: '#2C3E50',
    },
  },
});

const AddResources = () => {
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState({ lat: "", lng: "" });

  const token = useSelector((state) => state.user.token);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const handleGetCurrentLocation = getLocation;

    const resourceData = {
      type,
      quantity: Number(quantity),
      location:{
        lat: location.lat,
        lng: location.lng,
      },
    };

    try {
      const response = await axios.post(
        "https://drrcs-backend.onrender.com/resource/createResource",
        resourceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await toast.success("Resource created successfully!");
      console.log("Resource created:", response.data);
      setType("");
      setQuantity("");
      setLocation({ lat: "", lng: "" });
    } catch (error) {
      console.error("Error creating resource:", error);
      toast.error("Failed to create resource. Please try again.");
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer/>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight:900, color:"#2C3E50" }}>
          Add New Resource
        </Typography>
        <TextField
          label="Resource Type"
          variant="outlined"
          fullWidth
          margin="normal"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <TextField
          label="Quantity"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#2C3E50", fontWeight: "bold", mt: 2 }}
        >
          Resource Location
        </Typography>
        <Box mb={2}>
          <Button
            variant="outlined"
            onClick={getLocation}
            sx={{
              backgroundColor: "#2C3E50",
              color: "#fff",
              ":hover": { backgroundColor: "#333" },
            }}
          >
            Get My Location
          </Button>
        </Box>
        <MapPicker location={location} setLocation={setLocation}/>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#2C3E50",
            color: "#fff",
            mt: 2,
            ":hover": { backgroundColor: "#333" },
          }}
        >
          Add Resource
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default AddResources;
