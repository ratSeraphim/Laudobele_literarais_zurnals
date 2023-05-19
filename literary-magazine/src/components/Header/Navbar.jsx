import * as S from "./style";
import React from "react";
import { Typography } from "@mui/material";
import NavButton from "../NavButton/NavButton";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();
	const handleLogButton = () => {
		// Remove the JWT cookie
		if (jwtCookie) {
			Cookies.remove("jwt");
		}
		navigate("/login");

		// Perform other sign-out logic, such as redirecting the user
		// or resetting the application state
	};

	const jwtCookie = Cookies.get("jwt");
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
