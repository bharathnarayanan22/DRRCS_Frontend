import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from '../helpers/auth-config';
import { useSelector } from "react-redux";
import MapPicker from "../components/MapPicker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateRequest = () => {
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState(null);
  const token = useSelector((state) => state.user.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const handleGetCurrentLocation = getLocation;
    
    try {
      const response = await axios.post(
        "http://localhost:3000/request/createRequest",
        {
          type,
          quantity,
          location: {
            lat: location.lat,
            lng: location.lng
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Request created successfully!")
      console.log("Request created:", response.data);
      setType("");
      setQuantity("");
      setLocation(null);
    } catch (error) {
      toast.error("Error creating request!")
      console.error("Error creating request:", error);
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
    <Box>
      <ToastContainer/>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight:900, color:"#444" }}
      >
        Create New Request
      </Typography>
        <TextField
          label="Request Type"
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
        <Button variant="contained" onClick={getLocation} sx={{ backgroundColor: "#444", color: "#fff", mt: 2, mb:2, ":hover": { backgroundColor: "#333" } }}>
  Get My Location
</Button>
        <MapPicker location={location} setLocation={setLocation} />
        <Button type="submit" variant="contained" onClick={handleSubmit} sx={{ backgroundColor: "#444", color: "#fff", mt: 2, ":hover": { backgroundColor: "#333" } }}>
          Create Request
        </Button>
    </Box>
  );
};

export default CreateRequest;