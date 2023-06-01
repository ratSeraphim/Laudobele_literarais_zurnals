import { Card, Paper } from "@mui/material";
import * as S from "./style";
import Parchment from "../../components/Parchment/Parchment";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Admin = () => {
	const [role, setRole] = useState(null);
	useEffect(() => {
		// Retrieve the JWT from the stored cookie or any other source
		const jwt = Cookies.get("jwt");
		// Send the verification request to the backend
		axios
			.get(process.env.REACT_APP_API_URL + "/accounts/verify", {
				headers: {
					Authorization: `${jwt}`,
				},
			})
			.then((response) => {
				// Handle the response from the backend
				console.log("Verification response:", response.data);
				setRole(response.data.role);
				console.log(role);
			})
			.catch((error) => {
				// Handle errors
				console.error("Verification error:", error);
			});
	}, [role]);
	return (
		<>
			<S.Return to="/">Return to the sea</S.Return>
			{role !== "admin" && role !== "owner" && (
				<Parchment>You don't have access. Git.</Parchment>
			)}
			{(role === "admin" || role === "owner") && (
				<>
					<Parchment>Admin</Parchment>
				</>
			)}
		</>
	);
};

export default Admin;
