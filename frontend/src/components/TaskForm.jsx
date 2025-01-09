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
	const [showSubtaskOptions, setShowSubtaskOptions] = useState(false);
	const [generatedTaskInfo, setGeneratedTaskInfo] = useState(null);
	const [subtaskCount, setSubtaskCount] = useState(2);

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

	const handleSubtaskButtonClick = () => {
		if (!newTask.title || !newTask.due_date) {
			setError("Please fill in both the title and due date.");
			return;
		}
		setShowSubtaskOptions(true);
	};

	const handleMotivateMeClick = () => {
		if (!newTask.title || !newTask.due_date) {
			setError("Please fill in both the title and due date.");
			return;
		}
		setGeneratedTaskInfo({ title: newTask.title, count: subtaskCount });
		handleCreateTask();
		console.log(
			`Generating ${subtaskCount} motivational subtasks for the task titled "${newTask.title}".`
		);
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
					onClick={task ? handleCreateTask : handleCreateTask}
				>
					{task ? "Update Task" : "Create Task"}
				</Button>

				{!task && (
					<Button
						variant="outlined"
						sx={{ marginLeft: 2 }}
						onClick={handleSubtaskButtonClick}
					>
						Generate Subtasks
					</Button>
				)}
			</Box>

			{showSubtaskOptions && (
				<Box sx={{ marginTop: 2, textAlign: "center" }}>
					<TextField
						label="How many subtasks to create?"
						type="number"
						variant="outlined"
						value={subtaskCount}
						onChange={(e) =>
							setSubtaskCount(Math.max(2, Math.min(10, Number(e.target.value))))
						}
						sx={{ marginBottom: 2 }}
					/>

					<Button variant="contained" onClick={handleMotivateMeClick}>
						Motivate Me
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default TaskForm;
