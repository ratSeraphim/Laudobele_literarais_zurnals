import Masonry from "@mui/lab/Masonry/Masonry";
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
`;

export const Wall = styled(Masonry)`
	max-width: 70%;
`;
