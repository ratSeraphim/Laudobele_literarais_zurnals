import { styled } from "@mui/material/styles";
import { Button, ButtonGroup } from "@mui/material";

export const Navbar = styled("nav")`
	background-color: #f1d3b3;
	padding: 1rem;
	display: flex;
	justify-content: space-around;
`;

export const Branding = styled("div")`
	display: flex;
	gap: 2rem;
	flex-direction: row;
`;

export const NavButton = styled(Button)`
	color: #65647c;
`;

export const LogButton = styled(Button)`
	color: #f1d3b3;
`;

export const NavigateSite = styled(ButtonGroup)`
	color: #c7bca1;
`;

export const Icon = styled("img")`
	height: 50px;
`;
