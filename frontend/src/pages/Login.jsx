import MyTextField from "../components/forms/MyTextField";
import MyPassField from "../components/forms/MyPassField";
import MyButton from "../components/forms/MyButton";
import { React, useState } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
				console.log(response);
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
		<div className={"myBackground"}>
			<form onSubmit={handleSubmit(submission)}>
				<Box className={"whiteBox"}>
					<Box className={"itemBox"}>
						<Box className={"title"}> Login to your account</Box>
					</Box>

					<Box className={"itemBox"}>
						<MyTextField label={"Email"} name={"email"} control={control} />
					</Box>

					<Box className={"itemBox"}>
						<MyPassField
							label={"Password"}
							name={"password"}
							control={control}
						/>
					</Box>
					{error && <Box className={"itemBox error"}>{error}</Box>}
					<Box className={"itemBox"}>
						<MyButton label={"Login"} type={"submit"} />
					</Box>

					<Box className={"itemBox"} sx={{ flexDirection: "column" }}>
						<Link to="/register"> No account yet? Register here </Link>
					</Box>
				</Box>
			</form>
		</div>
	);
};

export default Login;
