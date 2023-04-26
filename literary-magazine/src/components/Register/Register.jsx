import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import * as S from "./style";
import ListUser from "../CreateUser/CreateUser";
import axios from "axios";

const Register = () => {
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password: "",
	});
	const handleChange = (event) => {
		const { name, value } = event.target;

		setInputs({
			...inputs,
			[name]: value,
		});
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputs);
		axios
			.post("http://localhost:3001/accounts", inputs)
			.then((response) => {
				console.log(response.data);
				// Handle data
			})
			.catch((error) => {
				console.log(error);
			});

		navigate("/");
	};

	return (
		<>
			<S.Content>
				<ListUser />
				<h1>Sign up</h1>
				<S.RegisterForm>
					<TextField
						required
						id="outlined-basic"
						label="E-mail"
						name="email"
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						//required
						id="outlined-basic"
						label="Display name"
						variant="outlined"
						//onChange={handleChange}
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
						//required
						id="outlined-basic"
						label="Confirm Password"
						variant="outlined"
						//onChange={handleChange}
					/>
					<S.Submit type="submit" onClick={handleSubmit} />
					<Button color="tertiary" href="/login">
						Log in
					</Button>
				</S.RegisterForm>
			</S.Content>
			<img src="logo.png" alt="tentacles coming out of an open book" />
		</>
	);
};

export default Register;
