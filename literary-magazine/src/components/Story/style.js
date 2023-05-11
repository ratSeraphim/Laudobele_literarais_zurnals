import { Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
export const Content = styled("div")`
	margin: 1rem;
	display: grid;
	grid-template-columns: 4fr 1fr;
	gap: 1rem;
`;

export const PlaceHolder = styled(Skeleton)`
	height: 100px;
`;

export const Story = styled("div")`
	margin: 1rem;
	padding: 2rem;
`;
export const StoryContent = styled("div")`
	margin-top: 3rem;
`;

export const Info = styled("div")`
	display: flex;
	flex-direction: column;
`;

export const b = styled("b")`
	font-weight: bold;
`;
