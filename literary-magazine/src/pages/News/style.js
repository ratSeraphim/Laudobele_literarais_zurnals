import Masonry from "@mui/lab/Masonry/Masonry";
import { Button, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Content = styled("div")`
	margin: 1rem;
	display: grid;
	grid-template-columns: 4fr 1fr;
	gap: 1rem;
`;

export const PlaceHolder = styled(Skeleton)`
	margin: 1rem;
	height: 100px;
`;

export const Wall = styled(Masonry)`
	max-width: 70%;
`;
export const Holder = styled("div")`
	padding: 3rem;
`;

export const Letter = styled("div")`
	background: #fafafa;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3),
		0 0 100px 30px rgba(222, 198, 122, 0.7) inset;
	width: 100%;
	height: 120px;
	margin: 1.5% auto;
	border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
`;

export const ItemContent = styled("div")`
	display: flex;
	justify-content: space-between;
	padding: 1rem;
`;

export const Author = styled("div")`
	font-style: italic;
`;

export const LinkButton = styled(Button)`
	color: #854343;
	margin: 1rem;
	background-color: rgba(255, 255, 255, 0.1);
`;
