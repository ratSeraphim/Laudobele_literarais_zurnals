import * as S from "./style";
import React from "react";
import { Typography } from "@mui/material";

const Navbar = () => {
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
					<S.NavButton href="/">Home</S.NavButton>
					<S.NavButton href="/posts">News</S.NavButton>
					<S.NavButton href="/stories">Stories</S.NavButton>
					<S.NavButton href="/profile">Profile</S.NavButton>
				</S.NavigateSite>
				<S.LogButton variant="contained" color="secondary" href="/login">
					Sign Out
				</S.LogButton>
			</S.Navbar>
		</>
	);
};

export default Navbar;
