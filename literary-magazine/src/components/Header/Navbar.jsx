import * as S from "./style";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import NavButton from "../NavButton/NavButton";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
	const navigate = useNavigate();
	const jwtCookie = Cookies.get("jwt");
	const handleLogButton = () => {
		// Remove the JWT cookie
		if (jwtCookie) {
			Cookies.remove("jwt");
			navigate("/login");
		} else if (!jwtCookie) {
			navigate("/login");
		}
	};

	const [role, setRole] = useState(null);
	useEffect(() => {
		// Retrieve the JWT from the stored cookie or any other source
		const jwt = Cookies.get("jwt");
		// Send the verification request to the backend
		axios
			.get("http://localhost:3001/accounts/verify", {
				headers: {
					Authorization: `${jwt}`,
				},
			})
			.then((response) => {
				// Handle the response from the backend
				console.log("Verification response:", response.data);
				setRole(response.data.role);
			})
			.catch((error) => {
				// Handle errors
				console.error("Verification error:", error);
			});
	}, []);

	return (
		<>
			<S.Navbar>
				<S.Branding>
					<S.Icon src="/logo.png"></S.Icon>
					<Typography variant="h1" color="secondary">
						Sothoth Press
					</Typography>
				</S.Branding>
				<S.NavigateSite variant="contained" size="large" color="primary">
					<NavButton link="" name="Home" />
					<NavButton link="posts" name="Posts" />
					<NavButton link="stories" name="Stories" />
					<NavButton link="profile" name="Profile" />
					{role === "owner" ||
						(role === "admin" && <NavButton link="admin" name="Admin" />)}
				</S.NavigateSite>
				<S.LogButton
					variant="contained"
					color="secondary"
					onClick={handleLogButton}
				>
					{!jwtCookie && <>Log in</>}
					{jwtCookie && <>Sign Out</>}
				</S.LogButton>
			</S.Navbar>
		</>
	);
};

export default Navbar;
