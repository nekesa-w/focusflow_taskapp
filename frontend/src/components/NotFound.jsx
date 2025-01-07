import React from "react";

const NotFound = () => {
	// Inline style for centering the content
	const containerStyle = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
		textAlign: "center",
	};

	return (
		<div style={containerStyle}>
			<h1>404 - Page Not Found</h1>
			<p>The page you are looking for does not exist.</p>
		</div>
	);
};

export default NotFound;
