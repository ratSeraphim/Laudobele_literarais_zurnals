import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import React from "react";
import * as S from "./style";

const Login = () => {
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		/* process data and figure out if login is valid or not*/
		navigate("/");
	};
	return (
		<>
			<S.Content>
				<h1>Log in</h1>
				<S.LoginForm>
					<TextField
						required
						id="outlined-basic"
						label="Username/E-mail"
						variant="outlined"
					/>
					<TextField
						required
						id="outlined-basic"
						label="Password"
						variant="outlined"
					/>
					<S.Submit type="submit" onClick={handleSubmit} />
					<Button color="tertiary" href="/signup">
						Sign up
					</Button>
				</S.LoginForm>
			</S.Content>
			<img src="logo.png" alt="tentacles coming out of an open book" />
		</>
	);
};

export default Login;
