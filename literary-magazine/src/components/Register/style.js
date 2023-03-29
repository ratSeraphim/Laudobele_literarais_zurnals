import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const Content = styled(Paper)`
	padding: 1rem;
	display: block;
	width: 25rem;
	height: 30rem;
	margin: 10rem auto auto auto;
`;

export const RegisterForm = styled("form")`
	padding: 1rem;
	display: flex;
	flex-direction: column;
`;

export const Submit = styled("input")`
	border-radius: 30px;
	margin: 10px;
	padding: 10px;
	background-color: #ffa726;
`;
