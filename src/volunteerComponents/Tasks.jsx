import React, { useState, useEffect } from "react";
import axios from '../helpers/auth-config';
import {
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import earth from "../assets/earth1.png";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [acceptedTask, setAcceptedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://drrcs-backend.onrender.com/task/getTask", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const pendingTasks = response.data.filter(
          (task) => task.status === "pending"
        );
        setTasks(pendingTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAccept = async (id) => {
    try {
      const { data: acceptedTasks } = await axios.get(
        "https://drrcs-backend.onrender.com/task/acceptedTasks",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(acceptedTasks);

      
      const hasActiveTasks = acceptedTasks.some(
        (task) => task.status === "pending" || task.status === "in-progress"
      );
      console.log(hasActiveTasks);

      if (hasActiveTasks) {
        toast.error(
          "You have active tasks. Complete them before accepting a new task."
        );
        return;
      }

      const response = await axios.put(
        `https://drrcs-backend.onrender.com/task/acceptTask/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAcceptedTask(response.data.task);
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, status: "accepted" } : task
        )
      );
      toast.success("You are assigned to the task!");
    } catch (error) {
      toast.error("Error accepting task.");
    }
  };
  //   const handleAccept = async (id) => {
  //     try {
  //         // Fetch all tasks assigned to the user
  //         const { data: tasks } = await axios.get("https://drrcs-backend.onrender.com/task/acceptedTasks", {
  //             headers: {
  //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             },
  //         });

  //         // Check if any tasks are still pending or in-progress
  //         const hasActiveTasks = tasks.some(task => task.status === 'pending' || task.status === 'in-progress');

  //         if (hasActiveTasks) {
  //             toast.error("You have active tasks. Complete them before accepting a new task.");
  //             return;
  //         }

  //         // Accept the new task
  //         const response = await axios.put(`https://drrcs-backend.onrender.com/task/acceptTask/${id}`, {}, {
  //             headers: {
  //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             },
  //         });

  //         setAcceptedTask(response.data.task);
  //         setTasks(tasks.map(task => task._id === id ? { ...task, status: 'accepted' } : task));
  //         toast.success("You are assigned to the task!");
  //     } catch (error) {
  //         toast.error("Error accepting task.");
  //     }
  // };

  const handleDecline = async (id) => {
    try {
      await axios.put(
        `https://drrcs-backend.onrender.com/task/declineTask/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, status: "declined" } : task
        )
      );
    } catch (error) {
      console.error("Error declining task:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight:900, color:"#444" }}>
        Pending Tasks
      </Typography>
      {tasks.length === 0 ? (<Typography>
        No tasks available
      </Typography>):(
      <TableContainer component={Paper}>
        <Table aria-label="tasks table">
          <TableHead>
            <TableRow
             sx={{ backgroundColor: "#444", "& th": { color: "#fff" } }}>
              <TableCell>S.NO</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Volunteers Needed</TableCell>
              <TableCell>Start Location</TableCell>
              <TableCell>End Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={task._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.volunteersNeeded}</TableCell>
                <TableCell><a
                    style={{ color: "black" }}
                    href={`https://www.google.com/maps/@?api=1&map_action=map&center=${task.startLocation.lat},${task.startLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={earth} alt="Map"/>
                  </a></TableCell>
                <TableCell><a
                    style={{ color: "black" }}
                    href={`https://www.google.com/maps/@?api=1&map_action=map&center=${task.endLocation.lat},${task.endLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={earth} alt="Map"/>
                  </a></TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleAccept(task._id)}
                    variant="contained"
                    color="primary"
                    disabled={acceptedTask !== null}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleDecline(task._id)}
                    variant="outlined"
                    color="secondary"
                    sx={{ ml: 2 }}
                  >
                    Decline
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )}
      <ToastContainer />
    </Box>
  );
};

export default Tasks;
