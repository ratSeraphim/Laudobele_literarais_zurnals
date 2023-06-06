import React from "react";
import * as S from "./style";

const NavButton = (props) => {
	return (
		<S.CustomNavLink
			to={props.link}
			style={({ isActive }) => ({
				color: isActive ? "#c7bca1" : "#fff",
				background: isActive ? "#004931" : "#58342e",
			})}
		>
			{props.name}
		</S.CustomNavLink>
	);
};

export default NavButton;
