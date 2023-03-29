import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const Content = styled(Paper)`
	padding: 1rem;
	display: block;
	width: 25rem;
	height: 33rem;
	margin: 10rem auto auto auto;
`;

export const RegisterForm = styled("form")`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const Submit = styled("input")`
	border-radius: 30px;
	margin: 10px;
	padding: 10px;
	background-color: #ffa726;
	&:hover {
		background-color: #9a8248;
		color: #fff;
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
`;
