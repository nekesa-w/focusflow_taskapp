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

const Overdue = () => {
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await AxiosInstance.get("tasks/");
				const pendingTasks = response.data.filter(
					(task) => task.status === "overdue"
				);
				setTasks(pendingTasks);
			} catch (error) {
				console.error("There was an error fetching tasks:", error);
			}
		};

		fetchTasks();
	}, []);

	return (
		<Container className={"task-container"}>
			<Box className={"task-title"}>Past Due</Box>

			<Box className="task-box">
				{tasks.length === 0 ? (
					<Typography className="no-tasks">No tasks available</Typography>
				) : (
					tasks.map((task) => (
						<Box key={task.task_id} className="task-item">
							<FormControlLabel
								control={
									<Checkbox
										checked={task.status === "overdue"}
										enabled
										className="task-checkbox"
										sx={{ padding: 0 }}
									/>
								}
								label={
									<Typography className="task-overdue">{task.title}</Typography>
								}
							/>
						</Box>
					))
				)}
			</Box>
		</Container>
	);
};

export default Overdue;
