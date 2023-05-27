import { Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
export const Content = styled("div")`
	margin: 1rem;
	display: grid;
	grid-template-columns: 4fr 1fr;
	gap: 1rem;
`;

export const CusPaper = styled(Paper)`
	margin: 1rem;
	height: 100%;
`;

export const StoryTitle = styled(TextField)`
	height: 100px;
	width: 40%;
`;

export const StoryInput = styled(TextField)`
	width: 100%;
	padding: 30px;
`;

export const Form = styled("form")`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
`;

export const Submit = styled("input")`
	border-radius: 30px;
	margin: 4px;
	padding: 10px;
	width: 10rem;
	background-color: #ffa726;
	&:hover {
		background-color: #9a8248;
		color: #fff;
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
`;