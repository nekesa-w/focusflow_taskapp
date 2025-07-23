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
import IconButton from "@mui/material/IconButton";

const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [subtasks, setSubtasks] = useState([]);
	const [open, setOpen] = useState(false);
	const [currentTask, setCurrentTask] = useState(null);

	useEffect(() => {
		fetchTasks();
		fetchSubtasks();
	}, []);

	const fetchTasks = async () => {
		try {
			const response = await AxiosInstance.get("tasks/");
			setTasks(response.data);
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	const fetchSubtasks = async () => {
		try {
			const response = await AxiosInstance.get("/subtasks/");
			setSubtasks(response.data);
		} catch (error) {
			console.error("Error fetching subtasks:", error);
		}
	};

	const handleCheckboxChange = async (taskId, currentStatus) => {
		const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
		const updatedTask = { status: newStatus, updated_at: new Date() };

		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.task_id === taskId ? { ...task, status: newStatus } : task
			)
		);

		try {
			await AxiosInstance.put(`tasks/${taskId}/`, updatedTask);
		} catch (error) {
			console.error("Error updating task status:", error);
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.task_id === taskId ? { ...task, status: currentStatus } : task
				)
			);
		}
	};

	const handleSubtaskCheckboxChange = async (subtaskId, currentStatus) => {
		const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
		const updatedSubtask = { status: newStatus };

		setSubtasks((prevSubtasks) =>
			prevSubtasks.map((subtask) =>
				subtask.subtask_id === subtaskId
					? { ...subtask, status: newStatus }
					: subtask
			)
		);

		try {
			await AxiosInstance.put(`subtasks/${subtaskId}/`, updatedSubtask);
		} catch (error) {
			console.error("Error updating subtask status:", error);

			setSubtasks((prevSubtasks) =>
				prevSubtasks.map((subtask) =>
					subtask.subtask_id === subtaskId
						? { ...subtask, status: currentStatus }
						: subtask
				)
			);
		}
	};

	const handleTaskCreated = (newTask) => {
		setTasks((prevTasks) => [newTask, ...prevTasks]);
	};

	const handleTaskUpdated = (updatedTask) => {
		if (updatedTask === null) {
			setTasks((prevTasks) =>
				prevTasks.filter((task) => task.task_id !== currentTask.task_id)
			);
		} else {
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.task_id === updatedTask.task_id ? updatedTask : task
				)
			);
		}
	};

	const pendingTasks = tasks.filter((task) => task.status === "Pending");

	const handleNewClick = () => {
		setCurrentTask(null);
		setOpen(true);
	};

	const handleEditClick = (task) => {
		setCurrentTask(task);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Container className="task-container">
			<Box className="task-page-title">To Do</Box>
			<Box className="task-box">
				{pendingTasks.length === 0 ? (
					<Box className="no-tasks">No tasks available</Box>
				) : (
					pendingTasks.map((task) => {
						const taskSubtasks = subtasks.filter(
							(subtask) => subtask.task === task.task_id
						);

						return (
							<Box key={task.task_id} className="task-item">
								<Box className="task-row">
									<FormControlLabel
										control={
											<Box className="task-check">
												<Checkbox
													checked={task.status === "Completed"}
													onChange={() =>
														handleCheckboxChange(task.task_id, task.status)
													}
													className="task-checkbox"
													sx={{ padding: 0 }}
												/>
											</Box>
										}
										label={
											<Box
												className="task-label-combined"
												sx={{
													display: "flex",
													alignItems: "center",
													width: "100%",
												}}
											>
												<Box className="task-title" sx={{ flexShrink: 0 }}>
													{task.title} by
												</Box>
												<Box
													className="task-due-date-pending"
													sx={{ marginLeft: "auto", flexShrink: 0 }}
												>
													{formatDueDate(task.due_date)}
												</Box>
												<Box className="task-edit" sx={{ flexShrink: 0 }}>
													<IconButton
														className="task-edit-button"
														color="primary"
														onClick={() => handleEditClick(task)}
														size="small"
													>
														<EditIcon />
													</IconButton>
												</Box>
											</Box>
										}
									/>
								</Box>

								{taskSubtasks.length > 0 && (
									<Box className="task-subtasks">
										{taskSubtasks.map((subtask) => (
											<Box key={subtask.subtask_id} className="subtask-item">
												<FormControlLabel
													control={
														<Checkbox
															checked={subtask.status === "Completed"}
															onChange={() =>
																handleSubtaskCheckboxChange(
																	subtask.subtask_id,
																	subtask.status
																)
															}
															className="subtask-checkbox"
															sx={{ padding: 0 }}
														/>
													}
													label={
														<Box className="subtask-title">{subtask.title}</Box>
													}
												/>
											</Box>
										))}
									</Box>
								)}
							</Box>
						);
					})
				)}
			</Box>

			<Fab
				color="primary"
				aria-label="add"
				className="floating-button"
				onClick={handleNewClick}
				sx={{
					position: "fixed",
					bottom: 50,
					right: 50,
					"&:hover": {
						backgroundColor: "#4f97e8",
					},
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
					<button className="task-dialog-close" onClick={handleClose}>
						CLOSE
					</button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

export default Home;
