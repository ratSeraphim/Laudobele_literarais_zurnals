import { styled } from "@mui/material/styles";

export const Content = styled("div")`
	margin: 1rem;
	display: grid;
	grid-template-columns: 4fr 1fr;
	gap: 1rem;
	min-height: 200px;
`;

export const Link = styled("a")`
	color: #29806a;
	&:hover {
		text-decoration: underline;
	}
`;
