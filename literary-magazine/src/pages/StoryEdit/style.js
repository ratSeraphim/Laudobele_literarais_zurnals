import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
export const Content = styled("div")`
	margin: 1rem;
	display: grid;
	grid-template-columns: 4fr 1fr;
	gap: 1rem;
`;

export const CusPaper = styled(Paper)`
	margin: 1rem;
`;

export const StoryInput = styled("div")`
	background-color: white;
	height: 100px;
	width: 100%;
`;
