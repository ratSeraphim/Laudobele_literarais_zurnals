import { Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavButton } from "../components/Header/style";

const Profile = () => {
	const [data, setData] = useState();
	useEffect(() => {
		// Retrieve the JWT from the stored cookie or any other source
		const jwt = Cookies.get("jwt");

		// Send the verification request to the backend
		axios
			.get("http://localhost:3001/accounts/verify", {
				headers: {
					Authorization: `${jwt}`,
				},
			})
			.then((response) => {
				// Handle the response from the backend
				console.log("Verification response:", response.data);
				setData(response.data);
			})
			.catch((error) => {
				// Handle errors
				console.error("Verification error:", error);
			});
	}, []);
	return (
		<>
			<Paper>
				<Typography variant="h1">Profile</Typography>
				{!data && (
					<Button href="/login" variant="contained">
						Log in
					</Button>
				)}
				{data && <>currently logged in as: {data.displayName}</>}
				<Outlet />
			</Paper>
		</>
	);
};

export default Profile;
