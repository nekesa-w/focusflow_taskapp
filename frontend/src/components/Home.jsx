import React, { useEffect, useState } from "react";
import AxiosInstance from "./AxiosInstance";
import {
	Container,
	Typography,
	Box,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		fetchTasks();
	}, []);

	// Fetch tasks from the server
	const fetchTasks = async () => {
		try {
			const response = await AxiosInstance.get("tasks/");
			console.log("Fetched tasks:", response.data);
			setTasks(response.data);
		} catch (error) {
			console.error("There was an error fetching tasks:", error);
		}
	};

	// Handle the status change when checkbox is toggled
	const handleStatusChange = async (event, taskId, currentStatus) => {
		const newStatus = currentStatus === "pending" ? "completed" : "pending"; // Toggle status

		try {
			// Optimistically update the state first
			const updatedTasks = tasks.map((task) =>
				task.task_id === taskId ? { ...task, status: newStatus } : task
			);
			setTasks(updatedTasks);

			// Update status on the server
			const response = await AxiosInstance.put(`tasks/${taskId}/`, {
				status: newStatus,
			});
			console.log("Server response:", response.data);
		} catch (error) {
			console.error("Error updating task status:", error);
			// If there's an error, revert the state
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.task_id === taskId ? { ...task, status: currentStatus } : task
				)
			);
		}
	};

	// Filter tasks for display, in this case, only pending tasks
	const pendingTasks = tasks.filter((task) => task.status === "pending");

	return (
		<Container className="task-container">
			<Box className="task-title">To Do</Box>

			<Box className="task-box">
				{pendingTasks.length === 0 ? (
					<Typography className="no-tasks">No tasks available</Typography>
				) : (
					pendingTasks.map((task) => (
						<Box key={task.task_id} className="task-item">
							<FormControlLabel
								control={
									<Checkbox
										checked={task.status === "completed"} // Checkbox should be checked if task is completed
										onChange={(e) =>
											handleStatusChange(e, task.task_id, task.status)
										} // Handle status toggle
										className="task-checkbox"
										sx={{ padding: 0 }}
									/>
								}
								label={
									<Typography className="task-pending">{task.title}</Typography>
								}
							/>
						</Box>
					))
				)}
			</Box>
		</Container>
	);
};

export default Home;
