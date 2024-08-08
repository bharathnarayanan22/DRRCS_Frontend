import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [acceptedTask, setAcceptedTask] = useState(null); // Track accepted task

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/task/getTask", { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Filter tasks with status 'pending'
        const pendingTasks = response.data.filter(task => task.status === 'pending');
        setTasks(pendingTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAccept = async (id) => {
    try {
      const { data: acceptedTasks } = await axios.get("http://localhost:3000/task/acceptedTasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (acceptedTasks.length > 0) {
        toast.error("You have already accepted a task. You cannot accept another one.");
        return;
      }
  
      const response = await axios.put(`http://localhost:3000/task/acceptTask/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      setAcceptedTask(response.data);
      setTasks(tasks.map(task => task._id === id ? { ...task, status: 'accepted' } : task));
      toast.success("You are assigned to the task!");
    } catch (error) {
      console.error("Error accepting task:", error);
      toast.error("Error accepting task.");
    }
  };
  

  const handleDecline = async (id) => {
    try {
      await axios.put(`http://localhost:3000/task/declineTask/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(tasks.map(task => task._id === id ? { ...task, status: 'declined' } : task));
    } catch (error) {
      console.error("Error declining task:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Pending Tasks
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="tasks table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Volunteers Needed</TableCell>
              <TableCell>Start Location</TableCell>
              <TableCell>End Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task._id}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.volunteersNeeded}</TableCell>
                <TableCell>{task.startLocation}</TableCell>
                <TableCell>{task.endLocation}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleAccept(task._id)} variant="contained" color="primary">
                    Accept
                  </Button>
                  <Button onClick={() => handleDecline(task._id)} variant="outlined" color="secondary" sx={{ ml: 2 }}>
                    Decline
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </Box>
  );
};

export default Tasks;
