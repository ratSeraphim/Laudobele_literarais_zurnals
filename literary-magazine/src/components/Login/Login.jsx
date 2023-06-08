import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as S from "./style";
import axios from "axios";
import Cookies from "js-cookie";
import Return from "../Return/Return";
import Message from "../Alerts/Message";
import Error from "../Alerts/Error";

const Login = () => {
	const api = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
		withCredentials: true,
	});

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
	const [error, setError] = useState("");
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

		api
			.get(process.env.REACT_APP_API_URL + "/accounts/login", {
				params: { inputs },
			})
			//Saņem ziņu no API puses
			.then((response) => {
				console.log(response.data);

				if (response.data.message === "Login successful") {
					setMessage(response.data.message);

					const cookie = response.headers["Set-Cookie"];

					document.cookie = `jwt=${response.data.jwt}; domain=localhost; path=/`;
					document.cookie = `jwt=${response.data.jwt}; domain=sothothpress.vercel.app; path=/`;
					console.log(cookie);
					const jwtCookie = Cookies.get("jwt");

					if (jwtCookie) {
						navigate("/");
						window.location.reload(false);
					} else {
						setError("JWT cookie not found");
						// Handle unauthorized access or redirect to login
					}
				} else {
					setError(response.data);
				}
			})
			//Ja ir kļūda, tad saņem kļūdas ziņu no API puses
			.catch((error) => {
				setError(error.message);
				console.log(error.message);
				setMessage("Error: " + error.message);
			});
	};
	return (
		<>
			<Return></Return>
			<S.Content>
				<h1>Log in</h1>
				<Error message={error} />
				<Message message={message} />
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
				</S.LoginForm>
			</S.Content>
			<S.LogoImage src="logo.png" alt="tentacles coming out of an open book" />
		</>
	);
};

export default Login;
