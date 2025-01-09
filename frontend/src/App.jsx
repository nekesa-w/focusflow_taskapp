import { useState } from "react";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import Completed from "./pages/Completed";
import Overdue from "./pages/Overdue";
import TaskForm from "./components/TaskForm";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoutes";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

function App() {
	const location = useLocation();
	const showNavbar = ["/", "/home", "/completed", "/overdue"].includes(
		location.pathname
	);

	return (
		<>
			<Routes>
				{/* Routes with Navbar */}
				<Route element={<ProtectedRoute />}>
					<Route
						path="/"
						element={showNavbar ? <Navbar content={<Home />} /> : <Home />}
					/>
					<Route
						path="/home"
						element={showNavbar ? <Navbar content={<Home />} /> : <Home />}
					/>
					<Route
						path="/completed"
						element={
							showNavbar ? <Navbar content={<Completed />} /> : <Completed />
						}
					/>
					<Route
						path="/overdue"
						element={
							showNavbar ? <Navbar content={<Overdue />} /> : <Overdue />
						}
					/>
				</Route>

				{/* Routes without Navbar */}
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
