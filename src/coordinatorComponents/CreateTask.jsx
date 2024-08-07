import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const CreateTask = () => {
  const [description, setDescription] = useState("");
  const [volunteersNeeded, setVolunteersNeeded] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(
        "http://localhost:3000/task/createTask",
        {
          description,
          volunteersNeeded,
          startLocation,
          endLocation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Task created:", response.data);
      // Optionally clear the form or handle success
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Box p={3} sx={{ backgroundColor: "#fff", maxWidth: 600, margin: "auto", border: "1px solid #000", borderRadius: "8px" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#000", fontWeight: "bold", textAlign: "center" }}
      >
        Create New Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Task Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            backgroundColor: "#fff", 
            borderRadius: "4px",
            border: "1px solid #000",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000",
            },
          }}
        />
        <TextField
          label="Volunteers Needed"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={volunteersNeeded}
          onChange={(e) => setVolunteersNeeded(e.target.value)}
          sx={{
            backgroundColor: "#fff", 
            borderRadius: "4px",
            border: "1px solid #000",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000",
            },
          }}
        />
        <TextField
          label="Start Location"
          variant="outlined"
          fullWidth
          margin="normal"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          sx={{
            backgroundColor: "#fff", 
            borderRadius: "4px",
            border: "1px solid #000",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000",
            },
          }}
        />
        <TextField
          label="End Location"
          variant="outlined"
          fullWidth
          margin="normal"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          sx={{
            backgroundColor: "#fff", 
            borderRadius: "4px",
            border: "1px solid #000",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000",
            },
          }}
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: "#000", color: "#fff", mt: 2, ":hover": { backgroundColor: "#333" } }}>
          Create Task
        </Button>
      </form>
    </Box>
  );
};

export default CreateTask;
