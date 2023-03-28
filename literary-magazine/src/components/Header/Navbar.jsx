import * as S from "./style";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import React from "react";

const Navbar = () => {
	return (
		<>
			<S.Navbar>
				<MenuBookIcon fontSize="large" />
				<S.NavigateSite variant="contained" size="large" color="primary">
					<S.NavButton>Home</S.NavButton>
					<S.NavButton>News</S.NavButton>
					<S.NavButton>Stories</S.NavButton>
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
