import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import AxiosInstance from "./AxiosInstance";

const TaskForm = ({ task, onTaskCreated, onTaskUpdated }) => {
	const [newTask, setNewTask] = useState({
		title: "",
		due_date: "",
		subtaskTitle: "",
		parentTaskId: null,
		numSubtasks: 2,
		levelOfDetail: "low",
		status: "Pending",
	});

	const [error, setError] = useState("");
	const [showSubtaskOptions, setShowSubtaskOptions] = useState(false);

	const userId = localStorage.getItem("UserId");

	useEffect(() => {
		if (task) {
			setNewTask({
				title: task.title,
				due_date: task.due_date,
				subtaskTitle: "",
				parentTaskId: task.parent_task_id || null,
				numSubtasks: 2,
				levelOfDetail: "low",
				status: task.status || "Pending",
			});
		}
	}, [task]);

	const handleCreateTask = async () => {
		setError("");

		if (!newTask.title || !newTask.due_date) {
			setError("Please fill in both the title and due date.");
			return;
		}

		try {
			console.log("Sending task creation request:", {
				title: newTask.title,
				due_date: newTask.due_date,
				user: userId,
			});
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
			const updatedTaskData = {
				title: newTask.title,
				due_date: newTask.due_date,
				status: newTask.status,
				parent_task_id: newTask.parentTaskId || null,
				subtaskTitle: newTask.subtaskTitle,
			};

			const response = await AxiosInstance.put(
				`tasks/${task.task_id}/`,
				updatedTaskData
			);

			onTaskUpdated(response.data);

			setNewTask({
				title: "",
				due_date: "",
				subtaskTitle: "",
				parentTaskId: null,
				numSubtasks: 2,
				levelOfDetail: "low",
				status: "Pending",
			});
		} catch (error) {
			console.error("Error updating task:", error);
			setError("An error occurred while updating the task. Please try again.");
		}
	};

	const handleDeleteTask = async () => {
		try {
			await AxiosInstance.delete(`tasks/${task.task_id}/`);
			onTaskUpdated(null);
		} catch (error) {
			console.error("Error deleting task:", error);
			setError("An error occurred while deleting the task. Please try again.");
		}
	};

	const handleCreateSubtask = async () => {
		setError("");

		if (!newTask.subtaskTitle) {
			setError("Please fill in the subtask title.");
			return;
		}

		if (!newTask.parentTaskId) {
			setError("Parent task ID is missing for subtask.");
			return;
		}

		try {
			const response = await AxiosInstance.post("subtasks/", {
				title: newTask.subtaskTitle,
				due_date: newTask.due_date,
				task: newTask.parentTaskId,
			});

			onTaskCreated(response.data);
			setNewTask({ ...newTask, subtaskTitle: "" });
		} catch (error) {
			console.error("Error creating subtask:", error);
			setError(
				"An error occurred while creating the subtask. Please try again."
			);
		}
	};

	const handleGenerateSubtasksOptions = () => {
		setShowSubtaskOptions(true);
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
						onClick={handleGenerateSubtasksOptions}
					>
						Generate Subtasks
					</Button>
				)}
			</Box>

			{showSubtaskOptions && (
				<Box>
					<Box className="form-input">
						<TextField
							label="Number of Subtasks (2-10)"
							variant="outlined"
							fullWidth
							type="number"
							value={newTask.numSubtasks}
							onChange={(e) =>
								setNewTask({
									...newTask,
									numSubtasks: Math.min(Math.max(e.target.value, 2), 10),
								})
							}
							inputProps={{ min: 2, max: 10 }}
						/>
					</Box>

					<Box className="form-input">
						<TextField
							label="Level of Detail (High or Low)"
							variant="outlined"
							fullWidth
							select
							value={newTask.levelOfDetail}
							onChange={(e) =>
								setNewTask({ ...newTask, levelOfDetail: e.target.value })
							}
							SelectProps={{
								native: true,
							}}
						>
							<option value="low">Low</option>
							<option value="high">High</option>
						</TextField>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default TaskForm;
