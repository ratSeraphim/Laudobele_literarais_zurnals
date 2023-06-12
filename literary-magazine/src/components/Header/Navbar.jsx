import * as S from "./style";
import React from "react";
import { Button, Typography } from "@mui/material";
import NavButton from "../NavButton/NavButton";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = ({ accData }) => {
	const navigate = useNavigate();
	const jwtCookie = Cookies.get("jwt");

	//Ielogošanās / izlogošanās
	const handleLogButton = () => {
		// Ja pastāv sīkdatne
		if (jwtCookie) {
			//Sīkdatni noņem
			Cookies.remove("jwt");
			//Noņem sīkdatni tās derīguma termiņu ieliekot pagātnē
			document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=sothothpress.vercel.app; path=/;`;
			//Lietotāju pārved uz ielogošanās lap
			navigate("/login");
			//Pārlādē lapu, lai attēlotu jaunos datus
			window.location.reload(false);
			//Ja nav sīkdatne, vienkārši aizved uz ielogošanos lapu
		} else if (!jwtCookie) {
			navigate("/login");
		}
	};

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
					<NavButton link="collections" name="Collections" />
					<NavButton link="profile" name="Profile" />

					{accData &&
						(accData.role === "owner" ||
							(accData.role === "admin" && (
								<NavButton link="admin" name="Admin" />
							)))}
				</S.NavigateSite>
				<Button variant="contained" color="success" onClick={handleLogButton}>
					{!jwtCookie && <>Log in</>}
					{jwtCookie && <>Log out</>}
				</Button>
			</S.Navbar>
		</>
	);
};

export default Navbar;
