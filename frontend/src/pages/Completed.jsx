import React, { useEffect, useState } from "react";
import AxiosInstance from "../components/AxiosInstance";
import {
	Container,
	Box,
	Checkbox,
	FormControlLabel,
	Fab,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
} from "@mui/material";
import TaskForm from "../components/TaskForm";
import AddIcon from "@mui/icons-material/Add";
import { formatDueDate } from "../components/utils";
import EditIcon from "@mui/icons-material/Edit";

const Completed = () => {
	const [tasks, setTasks] = useState([]);
	const [open, setOpen] = useState(false);
	const [currentTask, setCurrentTask] = useState(null);

	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		try {
			const response = await AxiosInstance.get("tasks/");
			setTasks(response.data);
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	const handleCheckboxChange = async (taskId, currentStatus) => {
		const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";

		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.task_id === taskId ? { ...task, status: newStatus } : task
			)
		);

		try {
			await AxiosInstance.put(`tasks/${taskId}/`, { status: newStatus });
		} catch (error) {
			console.error("Error updating task status:", error);
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.task_id === taskId ? { ...task, status: currentStatus } : task
				)
			);
		}
	};

	const handleEditClick = (task) => {
		setCurrentTask(task);
		setOpen(true);
	};

	const handleTaskCreated = (newTask) => {
		setTasks((prevTasks) => [newTask, ...prevTasks]);
	};

	const handleTaskUpdated = (updatedTask) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.task_id === updatedTask.task_id ? updatedTask : task
			)
		);
	};

	const completedTasks = tasks.filter((task) => task.status === "Completed");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		// Clear the current task when closing
		setCurrentTask(null);
		setOpen(false);
	};

	return (
		<Container className="task-container">
			<Box className="task-title">Done</Box>
			<Box className="task-box">
				{completedTasks.length === 0 ? (
					<Box className="no-tasks">No tasks available</Box>
				) : (
					completedTasks.map((task) => (
						<Box key={task.task_id} className="task-item">
							<FormControlLabel
								control={
									<Checkbox
										checked={task.status === "Completed"}
										onChange={() =>
											handleCheckboxChange(task.task_id, task.status)
										}
										className="task-checkbox"
										sx={{ padding: 0 }}
									/>
								}
								label={
									<Box className="task-completed">
										<Box className="task-data">
											{task.title} by{" "}
											<Box className="task-due-date-completed">
												{formatDueDate(task.due_date)}
											</Box>
										</Box>
										<Box className="task-edit">
											<Button
												variant="outlined"
												color="primary"
												onClick={() => handleEditClick(task)}
												startIcon={<EditIcon />}
											/>
										</Box>
									</Box>
								}
							/>
						</Box>
					))
				)}
			</Box>

			<Fab
				color="primary"
				aria-label="add"
				className="floating-button"
				onClick={handleClickOpen}
				sx={{
					position: "fixed",
					bottom: 50,
					right: 50,
				}}
			>
				<AddIcon />
			</Fab>

			<Dialog open={open} onClose={handleClose} className="task-dialog">
				<DialogTitle className="task-dialog-title">
					{currentTask ? "Edit Task" : "Create New Task"}
				</DialogTitle>
				<DialogContent className="task-dialog-content">
					<TaskForm
						task={currentTask}
						onTaskCreated={handleTaskCreated}
						onTaskUpdated={handleTaskUpdated}
					/>
				</DialogContent>
				<DialogActions className="task-dialog-actions">
					<button className="task-dialog-cancel" onClick={handleClose}>
						Cancel
					</button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

export default Completed;
