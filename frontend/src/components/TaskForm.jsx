import React, { useState, useEffect } from "react";
import {
	TextField,
	Divider,
	Button,
	Box,
	Typography,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import AxiosInstance from "./AxiosInstance";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const TaskForm = ({ task, onTaskCreated, onTaskUpdated }) => {
	const [newTask, setNewTask] = useState({
		title: "",
		due_date: "",
		subtaskTitle: "",
		parentTaskId: null,
		status: "Pending",
	});

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [taskId, setTaskId] = useState(null);
	const [taskTitleDisplay, setTaskTitleDisplay] = useState(null);
	const [taskDueDateDisplay, setTaskDueDateDisplay] = useState(null);
	const [subtaskCount, setSubtaskCount] = useState(2);
	const [detailLevel, setDetailLevel] = useState("low");
	const [isGeneratingSubtasks, setIsGeneratingSubtasks] = useState(false);
	const [generatedTaskInfo, setGeneratedTaskInfo] = useState(null);
	const [openSubtaskDialog, setOpenSubtaskDialog] = useState(false);

	const [subtasks, setSubtasks] = useState([]);

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
			setTaskTitleDisplay(task.title);
			setTaskDueDateDisplay(task.due_date);
			if (task.subtasks && task.subtasks.length > 0) {
				setSubtasks(task.subtasks);
			}
		}
	}, [task]);

	const handleCreateTask = async () => {
		setError("");

		if (!newTask.title || !newTask.due_date) {
			setError("Please fill in both the title and due date.");
			return;
		}

		if (!userId) {
			setError("User ID is not available. Please log in.");
			return;
		}

		try {
			const response = await AxiosInstance.post("tasks/", {
				title: newTask.title,
				due_date: newTask.due_date,
				user: userId,
			});

			if (onTaskCreated) {
				onTaskCreated(response.data);
			}

			setNewTask({
				title: "",
				due_date: "",
				subtaskTitle: "",
				status: "Pending",
			});

			setTaskId(response.data.task_id);
			window.location.reload();
		} catch (error) {
			console.error("Error creating task:", error);

			if (error.response) {
				console.error("Response Error:", error.response);

				const errorMessage =
					error.response?.data?.detail ||
					"An error occurred while creating the task.";

				if (error.response?.data?.detail) {
					console.error("Backend error:", error.response?.data?.detail);
				}

				setError(errorMessage);
			} else if (error.request) {
				console.error("No response from server:", error.request);
				setError("No response from the server. Please try again.");
			} else {
				console.error("Error during request setup:", error.message);
				setError(
					"An error occurred while creating the task. Please try again."
				);
			}
		}
	};

	const handleUpdateTask = async () => {
		setError("");
		setSuccess("");

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

			if (subtasks && subtasks.length > 0) {
				const updatedSubtasks = subtasks.map((subtask) => ({
					...subtask,
					task: taskId,
					status: subtask.status || "Pending",
				}));

				for (const updatedSubtask of updatedSubtasks) {
					await AxiosInstance.put(
						`/api/subtasks/${updatedSubtask.subtask_id}/`,
						{
							title: updatedSubtask.title,
							status: updatedSubtask.status,
						}
					);
				}

				setSuccess("Task and subtasks updated successfully!");
			} else {
				setSuccess("Task updated successfully!");
			}

			setNewTask({
				title: response.data.title,
				due_date: response.data.due_date,
				subtaskTitle: "",
				status: response.data.status,
			});
			setTaskId(response.data.task_id);
			window.location.reload();
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
			if (subtasks && subtasks.length > 0) {
				for (const subtask of subtasks) {
					await AxiosInstance.delete(`/api/subtasks/${subtask.subtask_id}/`);
				}
			}
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
			window.location.reload();
		} catch (error) {
			console.error("Error deleting task:", error);
			setError("An error occurred while deleting the task. Please try again.");
		}
	};

	const handleCreateTaskAndAddSubtasks = async () => {
		setError("");

		if (!newTask.title || !newTask.due_date) {
			setError(
				"Please provide a valid task title and due date before creating subtasks."
			);
			return;
		}

		try {
			const response = await AxiosInstance.post("tasks/", {
				title: newTask.title,
				due_date: newTask.due_date,
				user: userId,
			});

			if (onTaskCreated) {
				onTaskCreated(response.data);
			}

			setNewTask({
				title: "",
				due_date: "",
				subtaskTitle: "",
				status: "Pending",
			});

			setTaskId(response.data.task_id);
			setTaskTitleDisplay(response.data.title);
			setTaskDueDateDisplay(response.data.due_date);
			setOpenSubtaskDialog(true);
		} catch (error) {
			console.error("Error creating task:", error);
			setError("An error occurred while creating the task. Please try again.");
		}
	};

	const handleUpdateTaskAndAddSubtasks = async () => {
		setError("");

		if (!newTask.title || !newTask.due_date) {
			setError(
				"Please provide a valid task title and due date before creating subtasks."
			);
			return;
		}

		try {
			const response = await AxiosInstance.put(`tasks/${taskId}/`, {
				title: newTask.title,
				due_date: newTask.due_date,
				status: newTask.status,
			});

			onTaskUpdated(response.data);

			if (subtasks && subtasks.length > 0) {
				for (const subtask of subtasks) {
					await AxiosInstance.delete(`/api/subtasks/${subtask.subtask_id}/`);
				}
				setSubtasks([]);
			}

			setNewTask({
				title: response.data.title,
				due_date: response.data.due_date,
				subtaskTitle: "",
				status: response.data.status,
			});

			setTaskId(response.data.task_id);
			setTaskTitleDisplay(response.data.title);
			setTaskDueDateDisplay(response.data.due_date);

			setOpenSubtaskDialog(true);
		} catch (error) {
			console.error("Error updating task:", error);
			setError(
				"An error occurred while saving the updated task. Please try again."
			);
		}
	};

	const handleGenerateSubtasks = async () => {
		setError("");

		setIsGeneratingSubtasks(true);

		try {
			const response = await AxiosInstance.post(
				"api/tasks/generate-subtasks/",
				{
					task_title: taskTitleDisplay,
					num_subtasks: subtaskCount,
					detail_level: detailLevel,
				}
			);

			if (response.data && response.data.subtasks) {
				setGeneratedTaskInfo({
					title: taskTitleDisplay,
					due_date: taskDueDateDisplay,
					subtasks: response.data.subtasks,
				});
				console.log("Subtasks generated successfully:", response.data.subtasks);
			} else {
				console.error("No subtasks found in the response data.");
				setError("Subtasks not found in the response.");
			}
		} catch (error) {
			console.error(
				"Error occurred while generating subtasks:",
				error.message || error
			);
			setError(error.message || "An unknown error occurred.");
		} finally {
			setIsGeneratingSubtasks(false);
		}
	};

	const handleSaveTaskSubtasks = async () => {
		setError("");
		setSuccess("");

		if (
			!taskId ||
			!generatedTaskInfo?.subtasks ||
			generatedTaskInfo.subtasks.length === 0
		) {
			setError("Please ensure the task has a valid ID and subtasks.");
			return;
		}

		try {
			const subtasksData = generatedTaskInfo.subtasks.map((subtaskTitle) => ({
				title: subtaskTitle,
				task: taskId,
				status: "Pending",
			}));

			const response = await AxiosInstance.post("/api/subtasks/", subtasksData);

			if (response.status === 201) {
				console.log("Subtasks saved successfully:", response.data);
				setSuccess("");
				("Subtasks saved successfully!");
				setOpenSubtaskDialog(false);
				window.location.reload();
			} else {
				console.error("Failed to save subtasks:", response.data);
				setError("Failed to save subtasks. Please try again.");
			}
		} catch (error) {
			console.error("Error saving subtasks:", error);
			setError(
				"An error occurred while saving the subtasks. Please try again."
			);
		}
	};

	const handleCloseDialog = () => {
		setOpenSubtaskDialog(false);
	};

	return (
		<Box className="task-form">
			{error && (
				<Typography variant="body1" color="error" sx={{ marginBottom: 1 }}>
					{error}
				</Typography>
			)}

			{success && (
				<Typography variant="body1" color="success" sx={{ marginBottom: 1 }}>
					{success}
				</Typography>
			)}

			<Box className="form-input" sx={{ marginBottom: 1, marginTop: 1 }}>
				<TextField
					label="Task Title"
					variant="outlined"
					fullWidth
					value={newTask.title}
					onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
				/>
			</Box>
			<Box className="form-input" sx={{ marginBottom: 1, marginTop: 1 }}>
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

			{/* Display and edit subtasks if they exist */}
			{subtasks && subtasks.length > 0 && (
				<Box className="subtask-section">
					{subtasks.map((subtask, index) => (
						<Box
							key={subtask.subtask_id}
							sx={{ marginBottom: 2, marginTop: 2 }}
						>
							<TextField
								label={`Subtask ${index + 1} Title`}
								variant="outlined"
								fullWidth
								value={subtask.title}
								onChange={(e) => {
									const updatedSubtasks = [...subtasks];
									updatedSubtasks[index].title = e.target.value;
									setSubtasks(updatedSubtasks);
								}}
							/>
						</Box>
					))}
				</Box>
			)}

			{/* Only show the note when editing an existing task */}
			{taskId && (
				<Typography variant="body1" color="error" sx={{ marginBottom: 1 }}>
					Note: Pressing "Edit Task and Add Subtasks" removes all current
					subtasks
				</Typography>
			)}

			<Box className="form-action">
				{taskId ? (
					<>
						<Button variant="contained" onClick={handleUpdateTask}>
							Edit Task
						</Button>

						<Button
							variant="outlined"
							sx={{ marginLeft: 1 }}
							onClick={handleUpdateTaskAndAddSubtasks}
						>
							Edit Task and Add Subtasks
						</Button>

						<Button
							variant="contained"
							color="error"
							sx={{ marginLeft: 1 }}
							onClick={handleDeleteTask}
						>
							Delete Task
						</Button>
					</>
				) : (
					<>
						<Button variant="contained" onClick={handleCreateTask}>
							Create Task
						</Button>

						<Button
							variant="outlined"
							sx={{ marginLeft: 2 }}
							onClick={handleCreateTaskAndAddSubtasks}
						>
							Create Task and Add Subtasks
						</Button>
					</>
				)}
			</Box>

			{/* Dialog for Creating Subtasks */}
			<Dialog
				open={openSubtaskDialog}
				onClose={handleCloseDialog}
				className="task-dialog"
			>
				<DialogTitle className="task-dialog-title">Create Subtasks</DialogTitle>

				<DialogContent className="task-dialog-content">
					<Typography
						variant="body1"
						sx={{ marginBottom: 2, textAlign: "left" }}
						className="task-dialog-desc"
					>
						Break your task into smaller steps with each step framed with
						motivating language to keep you inspired.
					</Typography>
					<Divider sx={{ marginBottom: 2, borderColor: "#4f97e8" }} />
					<Typography
						variant="h6"
						className="task-dialog-titlesmall"
						sx={{ marginBottom: 1, textAlign: "center", color: "#4f97e8" }}
					>
						Customize your subtasks
					</Typography>
					<Box sx={{ marginBottom: 3, textAlign: "center" }}>
						<Typography variant="body1">
							Your Task Title is: {taskTitleDisplay}
						</Typography>
						<Typography variant="body1">
							Your Due Date is: {taskDueDateDisplay}
						</Typography>
					</Box>

					<FormControl fullWidth sx={{ marginBottom: 2 }}>
						<InputLabel>How many subtasks do you want?</InputLabel>
						<Select
							label="How many subtasks do you want?"
							value={subtaskCount}
							onChange={(e) =>
								setSubtaskCount(
									Math.max(2, Math.min(10, Number(e.target.value)))
								)
							}
						>
							{[...Array(9)].map((_, index) => (
								<MenuItem key={index} value={index + 2}>
									{index + 2}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl fullWidth sx={{ marginBottom: 2 }}>
						<InputLabel>How detailed should each subtask be?</InputLabel>
						<Select
							label="How detailed should each subtask be?"
							value={detailLevel}
							onChange={(e) => setDetailLevel(e.target.value)}
						>
							<MenuItem value="low">Low</MenuItem>
							<MenuItem value="high">High</MenuItem>
						</Select>
					</FormControl>
					<DialogActions className="task-dialog-actions">
						<Button variant="contained" onClick={handleGenerateSubtasks}>
							Motivate Me <AutoFixHighIcon sx={{ marginLeft: 1 }} />
						</Button>
					</DialogActions>
					{/* Displaying "Subtasks are being generated..." below the button */}
					{isGeneratingSubtasks && (
						<Box sx={{ margin: 1, textAlign: "center" }}>
							<Typography variant="body1" color="textSecondary">
								Subtasks are being generated...
							</Typography>
						</Box>
					)}
					{/* Displaying the generated subtasks in a box */}
					{!isGeneratingSubtasks && generatedTaskInfo?.subtasks && (
						<Box className="task-dialog-task-subtask">
							<Typography
								variant="h6"
								sx={{ textAlign: "center", marginBottom: 2 }}
							>
								Task: {generatedTaskInfo.title}
							</Typography>
							<Typography
								variant="body1"
								sx={{ textAlign: "center", marginBottom: 2 }}
							>
								Due Date: {generatedTaskInfo.due_date}
							</Typography>

							<Box sx={{ paddingLeft: 2 }}>
								{generatedTaskInfo.subtasks.map((subtask, index) => (
									<Typography
										key={index}
										variant="body1"
										sx={{ marginBottom: 1 }}
									>
										{index + 1}. {subtask}
									</Typography>
								))}
							</Box>

							{/* Create Task Save Subtask buttons */}
							<Box
								sx={{
									marginTop: 2,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Button
									variant="contained"
									color="primary"
									sx={{ alignItems: "center" }}
									onClick={handleSaveTaskSubtasks}
								>
									Save Task with Subtasks
								</Button>
							</Box>
						</Box>
					)}
				</DialogContent>
				<DialogActions className="task-dialog-actions">
					<button className="task-dialog-close" onClick={handleCloseDialog}>
						CLOSE
					</button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default TaskForm;
