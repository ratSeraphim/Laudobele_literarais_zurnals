import * as S from "./style";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<S.Navbar>
				<S.Icon src="placeholder.png"></S.Icon>
				<S.NavigateSite variant="contained" size="large" color="primary">
					<S.NavButton href="/">Home</S.NavButton>
					<S.NavButton href="/posts">News</S.NavButton>
					<S.NavButton href="/stories">Stories</S.NavButton>
					<S.NavButton>Profile</S.NavButton>
				</S.NavigateSite>
				<S.LogButton variant="contained" color="secondary" href="/login">
					Sign Out
				</S.LogButton>
			</S.Navbar>
		</>
	);
};

export default Navbar;
