import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const NomatchPaper = styled(Paper)`
	display: flex;
	flex-direction: column;
	margin: 10rem auto;
	padding: 2rem;
	width: 20%;
`;

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
