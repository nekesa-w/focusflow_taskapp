import { useState } from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Completed from "./components/Completed";
import Overdue from "./components/Overdue";
import Pending from "./components/Pending";
import Logout from "./components/Logout";
import UserProfile from "./components/UserProfile";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

function App() {
	const location = useLocation();
	const noNavbar =
		location.pathname === "/register" ||
		location.pathname === "/login" ||
		location.pathname === "/logout";

	return (
		<>
			{noNavbar ? (
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/logout" element={<Logout />} />
				</Routes>
			) : (
				<Navbar
					content={
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/overdue" element={<Overdue />} />
							<Route path="/pending" element={<Pending />} />
							<Route path="/completed" element={<Completed />} />
							<Route path="/userprofile" element={<UserProfile />} />
						</Routes>
					}
				/>
			)}
		</>
	);
}

export default App;
