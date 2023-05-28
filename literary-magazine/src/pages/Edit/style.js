import {
	Button,
	IconButton,
	ListItem,
	Paper,
	Select,
	TextField,
} from "@mui/material";
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

export const Title = styled(TextField)`
	height: 100px;
	width: 40%;
`;

export const Input = styled(TextField)`
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

export const Selector = styled("div")`
	display: flex;
	align-items: center;
`;

export const CusSelect = styled(Select)`
	min-width: 10rem;
`;

export const CollectionListItem = styled(ListItem)`
	border: 1px solid;
	margin: 1rem;
	border-radius: 1rem;
	display: flex;
	justify-content: space-between;
`;
