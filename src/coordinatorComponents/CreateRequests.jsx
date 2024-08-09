// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { sendRequest } from "../redux/requestSlice";

// const Requests = () => {
//   const dispatch = useDispatch();
//   const [type, setType] = useState('');
//   const [quantity, setQuantity] = useState(0);
//   const [location, setLocation] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     dispatch(sendRequest({ type, quantity, location }));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="type">Type:</label>
//       <input
//         type="text"
//         id="type"
//         name="type"
//         value={type}
//         onChange={(event) => setType(event.target.value)}
//       />

//       <label htmlFor="quantity">Quantity:</label>
//       <input
//         type="number"
//         id="quantity"
//         name="quantity"
//         value={quantity}
//         onChange={(event) => setQuantity(event.target.value)}
//       />

//       <label htmlFor="location">Location:</label>
//       <input
//         type="text"
//         id="location"
//         name="location"
//         value={location}
//         onChange={(event) => setLocation(event.target.value)}
//       />

//       <button type="submit">Send Request</button>
//     </form>
//   );
// };

// export default Requests;
import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const CreateRequest = () => {
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(
        "http://localhost:3000/request/createRequest",
        {
          type,
          quantity,
          location
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Request created:", response.data);
      // Optionally clear the form or handle success
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
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
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          margin="normal"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button type="submit" variant="contained" onClick={handleSubmit} sx={{ backgroundColor: "#000", color: "#fff", mt: 2, ":hover": { backgroundColor: "#333" } }}>
          Create Request
        </Button>
    </Box>
  );
};

export default CreateRequest;
