import React, { useState } from "react";
import "../App.css";
import Box from "@mui/material/Box";
import MyTextField from "./forms/MyTextField";
import MyPassField from "./forms/MyPassField";
import MyButton from "./forms/MyButton";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className="myBackground">
			<Box className="whiteBox">
				<Box className="itemBox">
					<Box className="title">Login to your account</Box>
				</Box>
				<Box className="itemBox">
					<MyTextField label="Email" />
				</Box>
				<Box className="itemBox">
					<MyPassField label="Password" />
				</Box>
				<Box className="itemBox">
					<MyButton label="Login" />
				</Box>
				<Box className="itemBox">
					<Link to="/register">No account? Register Here</Link>
				</Box>
			</Box>
		</div>
	);
};

export default Login;
