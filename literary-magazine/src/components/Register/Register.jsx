import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import * as S from "./style";
import axios from "axios";
import Return from "../Return/Return";
import Message from "../Alerts/Message";
import Error from "../Alerts/Error";

const Register = () => {
	//Definē router-dom navigācijas rīku
	const navigate = useNavigate();

	//Definē mainīgās vērtības, kuras saņem un padod API
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password: "",
		passwordconfirm: "",
		displayname: "",
	});
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	//Kad tekstā notiek izmaiņas,

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

		if (inputs.password === inputs.passwordconfirm) {
			//Nosūta mainīgos uz API
			axios
				.post(process.env.REACT_APP_API_URL + "/accounts", inputs)
				//Saņem ziņu no API puses
				.then((response) => {
					console.log(response.data);

					if (response.data === "Account created successfully") {
						setMessage(response.data);
						setError(null);
						setTimeout(() => {
							navigate("/login");
						}, 2000);
					} else {
						setError(response.data.message);
					}
				})
				//Ja ir kļūda, tad saņem kļūdas ziņu no API puses
				.catch((error) => {
					console.log(error.message);
					setError(error.message);
				});
			//Aizved lietotāju uz mājaslapu
			// navigate("/");
		} else {
			setError("Passwords do not match!");
		}
	};

	return (
		<>
			<Return />
			<S.Content>
				<h1>Sign up</h1>
				<Message message={message} />
				<Error message={error} />
				<S.RegisterForm onSubmit={handleSubmit}>
					<TextField
						required={true}
						type="email"
						label="E-mail"
						name="email"
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						required={true}
						label="Display name"
						name="displayname"
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						required
						label="Username"
						name="username"
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						required
						type="password"
						label="Password"
						name="password"
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						required
						type="password"
						label="Confirm Password"
						variant="outlined"
						name="passwordconfirm"
						onChange={handleChange}
					/>
					<S.Submit type="submit" />
					<Button color="tertiary" href="/login">
						Log in
					</Button>
				</S.RegisterForm>
			</S.Content>
			<S.LogoImage src="logo.png" alt="tentacles coming out of an open book" />
		</>
	);
};

export default Register;
