import { React, useState } from "react";
import "../App.css";
import Box from "@mui/material/Box";
import MyTextField from "../components/forms/MyTextField";
import MyPassField from "../components/forms/MyPassField";
import MyButton from "../components/forms/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "../components/AxiosInstance";

const Register = () => {
	const navigate = useNavigate();
	const { handleSubmit, control } = useForm();
	const [error, setError] = useState("");

	const submission = (data) => {
		if (
			!data.first_name ||
			!data.last_name ||
			!data.email ||
			!data.password ||
			!data.password2
		) {
			setError("All fields are required.");
			return;
		}
		if (data.password !== data.password2) {
			setError("Passwords do not match");
			return;
		}
		if (data.password.length < 8) {
			setError("Password must be at least 8 characters long");
			return;
		}
		AxiosInstance.post("register/", {
			email: data.email,
			password: data.password,
			first_name: data.first_name,
			last_name: data.last_name,
		})
			.then(() => navigate("/"))
			.catch((err) => {
				if (err.response?.data?.password) {
					setError(err.response.data.password.join(" "));
				} else if (err.response?.data?.email) {
					setError(err.response.data.email);
				} else {
					setError("Registration failed. Please try again.");
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
						<Box className="title">Get started</Box>
						<p>Please enter your details to sign up</p>
					</Box>
					<Box className="itemBox">
						<MyTextField
							label="First Name"
							name="first_name"
							control={control}
						/>
					</Box>
					<Box className="itemBox">
						<MyTextField label="Last Name" name="last_name" control={control} />
					</Box>
					<Box className="itemBox">
						<MyTextField label="Email" name="email" control={control} />
					</Box>
					<Box className="itemBox">
						<MyPassField label="Password" name="password" control={control} />
					</Box>
					<Box className="itemBox">
						<MyPassField
							label="Confirm Password"
							name="password2"
							control={control}
						/>
					</Box>
					{error && (
						<Box className="itemBox">
							<Box className="error myForm">{error}</Box>
						</Box>
					)}
					<Box className="itemBox">
						<MyButton type="submit" label="Sign up" />
					</Box>
					<Box className="linkBox">
						<p>
							Already have an account?
							<br />
							<Link to="/login" className="linkText">
								{" "}
								Login here
							</Link>
						</p>
					</Box>
				</Box>
			</form>
		</div>
	);
};

export default Register;
