import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Return = styled(Link)`
	background-color: #acc7a1;
	color: #333;
	margin: 2rem;
	padding: 1rem;
	border-radius: 1rem;
	&:hover {
		transform: translate 1px;
		background-color: #13b491;
		color: white;
		box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2);
	}
`;
