import { Card, TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ContentHolder = styled("div")`
	align-self: center;
	justify-self: center;
`;
export const StatGroup = styled("div")`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	gap: 10px;
`;

export const StatCard = styled(Card)`
	display: flex;
	flex-direction: column;
`;

export const CardPartOne = styled("div")`
	font-size: 4rem;
	background-color: #004931;
	padding: 1rem;
	color: #fff;
`;

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
	backgroundColor: theme.palette.tertiary.main,
	color: theme.palette.common.white,
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.primary.light,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));
