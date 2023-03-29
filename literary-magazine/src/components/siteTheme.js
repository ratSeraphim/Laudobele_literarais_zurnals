import { createTheme } from "@mui/material";

export const siteTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#c7bca1",
		},
		secondary: {
			main: "#854343",
		},
		tertiary: {
			main: "#9A8248",
			contrastText: "#fff",
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
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 700,
		fontWeightBold: 1000,
		htmlFontSize: "10em",
		h1: {
			fontSize: "2.3em",
			fontWeight: 1000,
		},
	},
});

export default createTheme(siteTheme);
