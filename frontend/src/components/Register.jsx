import React, { useState } from "react";
import "../App.css";
import Box from "@mui/material/Box";
import MyTextField from "./forms/MyTextField";
import MyPassField from "./forms/MyPassField";
import MyButton from "./forms/MyButton";
import { Link } from "react-router-dom";

const Register = () => {
	return (
		<div className="myBackground">
			<Box className="whiteBox">
				<Box className="itemBox">
					<Box className="title">Create a new account</Box>
				</Box>
				<Box className="itemBox">
					<MyTextField label="Email" />
				</Box>
				<Box className="itemBox">
					<MyPassField label="Password" />
				</Box>
				<Box className="itemBox">
					<MyPassField label="Confirm Password" />
				</Box>
				<Box className="itemBox">
					<MyButton label="Register" />
				</Box>
				<Box className="itemBox">
					<Link to="/login">Have an account? Login Here</Link>
				</Box>
			</Box>
		</div>
	);
};

export default Register;
