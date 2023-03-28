import { createTheme, Theme } from "@mui/material";

export const siteTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#c7bca1",
		},
		secondary: {
			main: "#854343",
		},
		text: {
			primary: "#65647c",
			secondary: "rgba(73,69,131,0.8)",
			disabled: "rgba(101,100,124,0.43)",
		},
		background: {
			paper: "#efddce",
			default: "#8B7E74",
		},
		error: {
			main: "#c73939",
		},
		success: {
			main: "#1b5e20",
		},
		info: {
			main: "#40c4ff",
		},
		warning: {
			main: "#ffa726",
		},
	},
	typography: {
		fontFamily: "EB Garamond",
		fontWeightLight: 600,
		fontWeightRegular: 600,
		fontWeightMedium: 1000,
		fontWeightBold: 1000,
		htmlFontSize: "10em",
	},
});

export default createTheme(siteTheme);
