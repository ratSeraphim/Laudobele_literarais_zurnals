import { Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Content = styled("div")`
	margin: 1rem;
	display: grid;
	grid-template-columns: 4fr 1fr;
	gap: 1rem;
`;

export const PlaceHolder = styled(Skeleton)`
	margin: 1rem;
	height: 3rem;
`;

export const StoryItem = styled("");

export const Title = styled("div")`
	font-weight: bold;
	border-bottom: thick double #1b5e20;
`;
