import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import AxiosInstance from "./AxiosInstance";

const TaskForm = ({ task, onTaskCreated, onTaskUpdated }) => {
	const [newTask, setNewTask] = useState({
		title: "",
		due_date: "",
		subtaskTitle: "",
		parentTaskId: null,
		status: "Pending",
	});

	const [error, setError] = useState("");
	const [taskId, setTaskId] = useState(null);

	const userId = localStorage.getItem("UserId");

	useEffect(() => {
		if (task) {
			setNewTask({
				title: task.title,
				due_date: task.due_date,
				subtaskTitle: "",
				parentTaskId: task.parent_task_id || null,
				status: task.status || "Pending",
			});
			setTaskId(task.task_id);
		}
	}, [task]);

	const handleCreateTask = async () => {
		setError("");

		if (!newTask.title || !newTask.due_date) {
			setError("Please fill in both the title and due date.");
			return;
		}

		try {
			const response = await AxiosInstance.post("tasks/", {
				title: newTask.title,
				due_date: newTask.due_date,
				user: userId,
			});

			onTaskCreated(response.data);
			setNewTask({
				title: "",
				due_date: "",
				subtaskTitle: "",
				status: "Pending",
			});
			setTaskId(response.data.task_id);
		} catch (error) {
			console.error("Error creating task:", error);
			setError("An error occurred while creating the task. Please try again.");
		}
	};

	const handleUpdateTask = async () => {
		setError("");

		if (!newTask.title || !newTask.due_date) {
			setError("Please fill in both the title and due date.");
			return;
		}

		try {
			const response = await AxiosInstance.put(`tasks/${taskId}/`, {
				title: newTask.title,
				due_date: newTask.due_date,
				status: newTask.status,
			});

			onTaskUpdated(response.data);
			setNewTask({
				title: response.data.title,
				due_date: response.data.due_date,
				subtaskTitle: "",
				status: response.data.status,
			});
			setTaskId(response.data.task_id);
		} catch (error) {
			console.error("Error updating task:", error);
			setError("An error occurred while updating the task. Please try again.");
		}
	};

	const handleDeleteTask = async () => {
		setError("");

		if (!taskId) {
			setError("No task selected for deletion.");
			return;
		}

		try {
			await AxiosInstance.delete(`tasks/${taskId}/`);
			setTaskId(null);
			setNewTask({
				title: "",
				due_date: "",
				subtaskTitle: "",
				status: "Pending",
			});
			onTaskUpdated(null);
			onTaskUpdated((prevTasks) =>
				prevTasks.filter((task) => task.task_id !== taskId)
			);
			setOpen(false);
			window.location.reload();
		} catch (error) {
			console.error("Error deleting task:", error);
			setError("An error occurred while deleting the task. Please try again.");
		}
	};

	const handleMotivatingButtonClick = () => {
		if (!newTask.title || !newTask.due_date) {
			setError("Please fill in both the title and due date.");
			return;
		}

		handleCreateTask();
	};

	return (
		<Box className="task-form">
			{error && (
				<Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
					{error}
				</Typography>
			)}

			<Box className="form-input">
				<TextField
					label="Task Title"
					variant="outlined"
					fullWidth
					value={newTask.title}
					onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
				/>
			</Box>
			<Box className="form-input">
				<TextField
					label="Due Date"
					variant="outlined"
					fullWidth
					type="date"
					value={newTask.due_date}
					onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</Box>

			<Box className="form-input">
				<TextField
					label="Status"
					variant="outlined"
					fullWidth
					value={newTask.status}
					disabled
					InputProps={{
						readOnly: true,
					}}
				/>
			</Box>

			<Box className="form-action">
				<Button
					variant="contained"
					onClick={task ? handleUpdateTask : handleCreateTask}
				>
					{task ? "Update Task" : "Create Task"}
				</Button>

				{task && (
					<Button
						variant="outlined"
						color="error"
						onClick={handleDeleteTask}
						sx={{ marginLeft: 2 }}
					>
						Delete Task
					</Button>
				)}

				{!task && (
					<Button
						variant="outlined"
						sx={{ marginLeft: 2 }}
						onClick={handleMotivatingButtonClick}
					>
						Create Task and Make Motivating
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default TaskForm;
