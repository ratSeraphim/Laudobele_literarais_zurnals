import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Content = styled("div")`
	margin: 1rem;
	display: grid;
	grid-template-columns: 4fr 1fr;
	gap: 1rem;
`;

export const BgPaper = styled(Paper)`
	background-image: url(https://i.ibb.co/sQ8ykvF/img-noise-361x370-2.png);
	-webkit-box-shadow: inset -2px 9px 34px -15px rgba(0, 0, 0, 0.68);
	-moz-box-shadow: inset -2px 9px 34px -15px rgba(0, 0, 0, 0.68);
	box-shadow: inset -2px 9px 34px -15px rgba(0, 0, 0, 0.68);
	padding: 0.3rem;
`;

export const AuthorCard = styled("div")`
	border: 3px solid;
	border-radius: 1rem;
	padding: 2rem;
`;
