import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Return = styled(Link)`
	background-color: #ffa726;
	color: #333;
	margin: 2rem;
	padding: 1rem;
	border-radius: 1rem;
	&:hover {
		transform: translate 1px;
		background-color: #13b491;
		color: white;
	}
`;
