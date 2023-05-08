import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import * as S from "./style";
import axios from "axios";

const Register = () => {
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
	const [error, setError] = useState();
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
				.post("http://localhost:3001/accounts", inputs)
				//Saņem ziņu no API puses
				.then((response) => {
					console.log(response.data);
					setMessage(response.data.message);
					if (response.data.message === "Account created successfully") {
						navigate("/");
					}
				})
				//Ja ir kļūda, tad saņem kļūdas ziņu no API puses
				.catch((error) => {
					setError(error);
					console.log(error.message);
					setMessage("");
				});
			//Aizved lietotāju uz mājaslapu
			// navigate("/");
		} else {
			setMessage("Passwords do not match!");
		}
	};

	return (
		<>
			<S.Content>
				<h1>Sign up</h1>
				<S.RegisterForm>
					<TextField
						required={true}
						id="outlined-basic"
						label="E-mail"
						name="email"
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						required={true}
						id="outlined-basic"
						label="Display name"
						name="displayname"
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						required
						id="outlined-basic"
						label="Username"
						name="username"
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						required
						id="outlined-basic"
						label="Password"
						name="password"
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						required
						id="outlined-basic"
						label="Confirm Password"
						variant="outlined"
						name="passwordconfirm"
						onChange={handleChange}
					/>
					<S.Submit type="submit" onClick={handleSubmit} />
					<Button color="tertiary" href="/login">
						Log in
					</Button>
					<h3>{message}</h3>
				</S.RegisterForm>
			</S.Content>
			<img src="logo.png" alt="tentacles coming out of an open book" />
		</>
	);
};

export default Register;
