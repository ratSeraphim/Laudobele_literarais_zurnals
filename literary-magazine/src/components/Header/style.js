import { styled } from "@mui/material/styles";
import { Button, ButtonGroup } from "@mui/material";

export const Navbar = styled("nav")`
	background-color: #f1d3b3;
	padding: 1rem;
	display: flex;
	justify-content: space-around;
	box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.5), 0 0 125px #8f5922 inset;
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
	box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const Icon = styled("img")`
	height: 50px;
`;
