import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import React from "react";
import * as S from "./style";

const Register = () => {
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		/* process data and figure out if login is valid or not*/
		navigate("/");
	};
	return (
		<>
			<S.Content>
				<h1>Log in</h1>
				<S.RegisterForm>
					<TextField
						required
						id="outlined-basic"
						label="E-mail"
						variant="outlined"
					/>
					<TextField
						required
						id="outlined-basic"
						label="Display name"
						variant="outlined"
					/>
					<TextField
						required
						id="outlined-basic"
						label="Username"
						variant="outlined"
					/>
					<TextField
						required
						id="outlined-basic"
						label="Password"
						variant="outlined"
					/>
					<TextField
						required
						id="outlined-basic"
						label="Confirm Password"
						variant="outlined"
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
