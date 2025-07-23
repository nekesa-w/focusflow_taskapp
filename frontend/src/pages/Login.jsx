import MyTextField from "../components/forms/MyTextField";
import MyPassField from "../components/forms/MyPassField";
import MyButton from "../components/forms/MyButton";
import { React, useState } from "react";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "../components/AxiosInstance";
import "../App.css";

const Login = () => {
	const navigate = useNavigate();
	const { handleSubmit, control } = useForm();
	const [error, setError] = useState("");

	const submission = (data) => {
		AxiosInstance.post("login/", {
			email: data.email,
			password: data.password,
		})
			.then((response) => {
				localStorage.setItem("Token", response.data.token);
				localStorage.setItem("FirstName", response.data.user.first_name);
				localStorage.setItem("UserId", response.data.user.user_id);
				navigate("/home");
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.data.email) {
						setError("This email does not exist.");
					} else if (error.response.data.password) {
						setError("Incorrect password.");
					} else {
						setError("Login failed. Please try again.");
					}
				} else {
					setError("Network error. Please try again.");
				}
			});
	};

	return (
		<div className="myBackground">
			<form onSubmit={handleSubmit(submission)}>
				<Box className="whiteBox">
					<Box className="logoBox">
						<img src="/logo.png" alt="Logo" className="logoImage" />
						<p className="logoText">SONGA</p>
					</Box>
					<Box className="titleBox">
						<Box className="title">Welcome back</Box>
						<p>Please enter your details to sign in</p>
					</Box>
					<Box className="itemBox">
						<MyTextField label="Email" name="email" control={control} />
					</Box>
					<Box className="itemBox">
						<MyPassField label="Password" name="password" control={control} />
					</Box>
					{error && (
						<Box className="itemBox">
							<Box className="error myForm">{error}</Box>
						</Box>
					)}
					<Box className="itemBox">
						<MyButton label="Log in" type="submit" />
					</Box>
					<Box className="linkBox">
						<p>
							Don't have an account?
							<br />
							<Link to="/register" className="linkText">
								{" "}
								Register here
							</Link>
						</p>
					</Box>
				</Box>
			</form>
		</div>
	);
};

export default Login;
