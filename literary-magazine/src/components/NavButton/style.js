import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const CustomNavLink = styled(NavLink)`
	width: 5rem;
	border-radius: 1rem;
	padding: 10px;
	margin: auto 5px;
	vertical-align: middle;
	box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	&:hover {
		color: rgba(0, 0, 0, 0.5);
	}
`;
