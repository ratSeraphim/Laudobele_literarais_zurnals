import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Content = styled("div")`
	padding: 1rem;
`;

export const ItemContainer = styled("div")`
	padding: 1rem;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 1rem;
`;

export const Box = styled("div")`
	box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
`;

export const Header = styled("div")`
	background-color: #65647c;
	border: 1px solid black;
	color: #fff;
	padding: 1rem;
`;

export const Array = styled("div")`
	display: flex;
	flex-flow: column;
	justify-content: center;

	padding: 1rem;
	box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
`;

export const CusButton = styled(Button)`
	margin: 0.5rem;
`;
