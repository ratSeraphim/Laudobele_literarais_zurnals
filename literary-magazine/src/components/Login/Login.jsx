import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as S from "./style";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
	const navigate = useNavigate();
	useEffect(() => {
		// Access the JWT cookie
		const jwtCookie = Cookies.get("jwt");

		if (jwtCookie) {
			navigate("/");
		}
	}, [navigate]);

	const [inputs, setInputs] = useState({
		name: "",
		password: "",
	});
	const [message, setMessage] = useState("");
	const [error, setError] = useState();
	const handleChange = (event) => {
		//Saņem izmainītās vērtības
		const { name, value } = event.target;
		//Izmainītās vērtības ieliek mainīgajā vērtībā
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const handleSubmit = (event) => {
		//Apstādina lapu no sevis atjaunošanas
		event.preventDefault();

		console.log(inputs);

		//Nosūta mainīgos uz API
		axios
			.get(process.env.REACT_APP_API_URL + "/accounts/login", {
				params: { inputs },
				withCredentials: true,
			})
			//Saņem ziņu no API puses
			.then((response) => {
				console.log(response.data);
				setMessage(response.data.message);
				if (response.data === "Login successful") {
					const jwtCookie = Cookies.get("jwt");

					if (jwtCookie) {
						navigate("/");
						window.location.reload(false);
					} else {
						// JWT cookie does not exist
						// Handle unauthorized access or redirect to login
					}
				}
			})
			//Ja ir kļūda, tad saņem kļūdas ziņu no API puses
			.catch((error) => {
				setError(error);
				console.log(error.message);
				setMessage(error);
			});
		//Aizved lietotāju uz mājaslapu
		// navigate("/");
	};
	return (
		<>
			<S.Return to="/">Return to the sea</S.Return>
			<S.Content>
				<h1>Log in</h1>
				<S.LoginForm onSubmit={handleSubmit}>
					<TextField
						required
						name="name"
						label="Username/E-mail"
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						required
						type="password"
						name="password"
						label="Password"
						variant="outlined"
						onChange={handleChange}
					/>
					<S.Submit type="submit" />
					<Button color="tertiary" href="/signup">
						Sign up
					</Button>
					<h3>{message}</h3>
				</S.LoginForm>
			</S.Content>
			<img src="logo.png" alt="tentacles coming out of an open book" />
		</>
	);
};

export default Login;
