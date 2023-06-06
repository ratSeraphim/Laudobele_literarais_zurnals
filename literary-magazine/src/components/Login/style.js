import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const Content = styled(Paper)`
	padding: 1rem;
	display: block;
	width: 25rem;

	margin: 10rem auto auto auto;
`;

export const LoginForm = styled("form")`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const Submit = styled("input")`
	border-radius: 30px;
	margin: 10px;
	padding: 10px;
	background-color: #acc7a1;
	&:hover {
		background-color: #13b491;
		color: #fff;
		box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2);
	}
`;

export const LogoImage = styled("img")`
	height: 50%;
	width: 25%;
	margin: 0 auto;
`;
