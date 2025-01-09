import { React, useState } from "react";
import "../App.css";
import Box from "@mui/material/Box";
import MyTextField from "../components/forms/MyTextField";
import MyPassField from "../components/forms/MyPassField";
import MyButton from "../components/forms/MyButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "../components/AxiosInstance";
import { useNavigate } from "react-router-dom";

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
			.then(() => {
				navigate(`/`);
			})
			.catch((err) => {
				// Check if password-specific errors exist
				if (err.response && err.response.data && err.response.data.password) {
					setError(err.response.data.password.join(" "));
				} else if (
					err.response &&
					err.response.data &&
					err.response.data.email
				) {
					setError(err.response.data.email);
				} else {
					setError("Registration failed. Please try again.");
				}
			});
	};

	return (
		<div className={"myBackground"}>
			<form onSubmit={handleSubmit(submission)}>
				<Box className={"whiteBox"}>
					<Box className={"itemBox"}>
						<Box className={"title"}>{"Create a new account"}</Box>
					</Box>
					<Box className={"itemBox"}>
						<MyTextField
							label={"First Name"}
							name={"first_name"}
							control={control}
						/>
					</Box>
					<Box className={"itemBox"}>
						<MyTextField
							label={"Last Name"}
							name={"last_name"}
							control={control}
						/>
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
					<Box className={"itemBox"}>
						<MyPassField
							label={"Confirm Password"}
							name={"password2"}
							control={control}
						/>
					</Box>
					{error && <Box className={"itemBox error"}>{error}</Box>}
					<Box className={"itemBox"}>
						<MyButton type={"submit"} label={"Register"} />
					</Box>
					<Box className={"itemBox"}>
						<Link to={"/login"}>{"Have an account? Login Here"}</Link>
					</Box>
				</Box>
			</form>
		</div>
	);
};

export default Register;
