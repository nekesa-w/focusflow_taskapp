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

const Completed = () => {
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await AxiosInstance.get("tasks/");
				const completedTasks = response.data.filter(
					(task) => task.status === "completed"
				);
				setTasks(completedTasks);
			} catch (error) {
				console.error("There was an error fetching tasks:", error);
			}
		};

		fetchTasks();
	}, []);

	// Function to handle status change on checkbox toggle
	const handleStatusChange = async (taskId, currentStatus) => {
		const newStatus = currentStatus === "completed" ? "pending" : "completed";

		try {
			await AxiosInstance.patch(`tasks/${taskId}/`, { status: newStatus }); // Update status in DB
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.task_id === taskId ? { ...task, status: newStatus } : task
				)
			); // Update state to reflect new status
		} catch (error) {
			console.error("Error updating task status:", error);
		}
	};

	return (
		<Container className="task-container">
			<Box className="task-title">Done</Box>

			<Box className="task-box">
				{tasks.length === 0 ? (
					<Typography className="no-tasks">No tasks available</Typography>
				) : (
					tasks.map((task) => (
						<Box key={task.task_id} className="task-item">
							<FormControlLabel
								control={
									<Checkbox
										checked={task.status === "completed"}
										onChange={() =>
											handleStatusChange(task.task_id, task.status)
										} // Toggle status on change
										disabled={task.status === "completed"} // Optionally disable checkbox if you don't want to change completed tasks
										className="task-checkbox"
									/>
								}
								label={
									<Typography className="task-completed">
										{task.title}
									</Typography>
								}
							/>
						</Box>
					))
				)}
			</Box>
		</Container>
	);
};

export default Completed;
