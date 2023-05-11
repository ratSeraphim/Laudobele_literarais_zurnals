import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Skeleton,
} from "@mui/material";
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

export const Author = styled("div")`
	text-align: right;
	justify-self: right;
	color: rgba(255, 255, 255, 0.7);
	padding-right: 10rem;
	padding-left: 4rem;
`;

export const Title = styled("div")`
	text-align: left;
	font-weight: bold;
	border-bottom: thick double #1b5e20;
	padding-right: 4rem;
	padding-left: 4rem;
`;

export const CustomAccordionSummary = styled(AccordionSummary)`
	background-color: #1b5e20;
	color: white;
`;

export const CustomAccordion = styled(Accordion)`
	box-shadow: none;
	margin: 1rem;
`;

export const CustomAccordionDetails = styled(AccordionDetails)`
	background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/23618/rip.svg)
		bottom;
	background-size: 20%;
	border: 0;
`;

export const Holder = styled("div")`
	padding: 3rem;
`;

export const Summary = styled("div")`
	border-top: 1px solid #000;
	padding-top: 10px;
	border-bottom: 1px solid #000;
	width: 100%;
	padding-bottom: 10px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;
