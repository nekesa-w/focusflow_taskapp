import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TodayIcon from "@mui/icons-material/Today";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AxiosInstance from "./AxiosInstance";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Navbar(props) {
	const { content } = props;
	const location = useLocation();
	const path = location.pathname;
	const navigate = useNavigate();

	const logoutUser = () => {
		AxiosInstance.post("logoutall/")
			.then(() => {
				localStorage.removeItem("Token");
				localStorage.removeItem("FirstName");
				localStorage.removeItem("UserId");
				navigate("/login");
			})
			.catch((error) => {
				console.error("Error during logout", error);
			});
	};

	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [isClosing, setIsClosing] = React.useState(false);

	const handleDrawerClose = () => {
		setIsClosing(true);
		setMobileOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	};

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
	};

	const firstName = localStorage.getItem("FirstName");

	const drawer = (
		<div>
			<Toolbar />
			<Box
				margin="0px"
				padding="0px"
				display="flex"
				alignItems="center"
				justifyContent="center"
				gap="10px"
				flexDirection="column"
			>
				<img
					src="/logo.png"
					alt="Logo"
					style={{ width: "60px", height: "auto" }}
				/>
				<Typography
					variant="h5"
					sx={{
						fontWeight: 400,
						margin: 0,
						textAlign: "center",
						fontFamily: "Inter",
						background: "linear-gradient(90deg, #4f97e8, #4fe8a0)",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
					}}
				>
					SONGA
				</Typography>
			</Box>
			<Box
				sx={{
					padding: "40px 30px",
				}}
			>
				<Divider />
			</Box>
			<List
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: "10px",
					padding: "20px",
				}}
			>
				<ListItem disablePadding sx={{ width: "100%" }}>
					<ListItemButton
						component={Link}
						to="/"
						selected={"/" === path}
						sx={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							gap: "5px",
						}}
					>
						<TodayIcon sx={{ color: "#5c5c5c" }} />
						<ListItemText
							primary="Home"
							sx={{ textAlign: "center", color: "#5c5c5c" }}
						/>
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding sx={{ width: "100%" }}>
					<ListItemButton
						component={Link}
						to="/overdue"
						selected={"/overdue" === path}
						sx={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							gap: "5px",
						}}
					>
						<EventBusyIcon sx={{ color: "#5c5c5c" }} />
						<ListItemText
							primary="Overdue"
							sx={{ textAlign: "center", color: "#5c5c5c" }}
						/>
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding sx={{ width: "100%" }}>
					<ListItemButton
						component={Link}
						to="/completed"
						selected={"/completed" === path}
						sx={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							gap: "5px",
						}}
					>
						<EventAvailableIcon sx={{ color: "#5c5c5c" }} />
						<ListItemText
							primary="Completed"
							sx={{ textAlign: "center", color: "#5c5c5c" }}
						/>
					</ListItemButton>
				</ListItem>
			</List>
		</div>
	);

	return (
		<Box
			sx={{
				display: "flex",
			}}
		>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					backgroundColor: "white",
					marginTop: { xs: 0, sm: "20px" },
					marginRight: { xs: 0, sm: "20px" },
					padding: "10px",
					border: "1px solid #e4e4e4",
					borderTopRightRadius: { xs: 0, sm: "10px" },
					color: "#5c5c5c",
					boxShadow: "none",
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<List
						sx={{
							display: "flex",
							padding: 0,
							marginLeft: "auto",
						}}
					>
						<ListItem disablePadding sx={{ width: "100%" }}>
							<ListItemButton>
								<ListItemText
									primary={firstName ? `Hello, ${firstName}` : "Hello, User"}
									sx={{
										textAlign: "center",
										color: "#4f97e8",
										whiteSpace: "nowrap",
									}}
								/>
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding sx={{ width: "100%" }}>
							<ListItemButton onClick={logoutUser}>
								<ListItemText
									primary="Logout"
									sx={{ textAlign: "center", color: "#5c5c5c" }}
								/>
							</ListItemButton>
						</ListItem>
					</List>
				</Toolbar>
			</AppBar>

			<Box
				component="nav"
				sx={{
					width: { sm: drawerWidth },
					flexShrink: { sm: 0 },
				}}
				aria-label="mailbox folders"
			>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onTransitionEnd={handleDrawerTransitionEnd}
					onClose={handleDrawerClose}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
							height: "calc(100vh - 40px)",
							margin: { xs: 0, sm: "20px" },
							marginRight: { xs: 0, sm: "20px" },
							border: "1px solid #e4e4e4",
							borderTopLeftRadius: { xs: 0, sm: "10px" },
							borderBottomLeftRadius: { xs: 0, sm: "10px" },
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>

			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					height: "calc(100vh - 40px)",
					marginTop: { xs: 0, sm: "20px" },
					marginRight: { xs: 0, sm: "20px" },
					border: "1px solid #e4e4e4",
					borderTopRightRadius: { xs: 0, sm: "10px" },
					borderBottomRightRadius: { xs: 0, sm: "10px" },
					overflowY: "auto",
				}}
			>
				<Toolbar />
				<Box
					sx={{
						padding: "30px",
						overflowY: "auto",
					}}
				>
					{content}
				</Box>
			</Box>
		</Box>
	);
}

export default Navbar;
