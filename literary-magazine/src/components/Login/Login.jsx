import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
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
						helperText="Enter your username or e-mail"
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
					<Link to="/signup">Sign up</Link>
				</S.LoginForm>
			</S.Content>
			<img src="placeholder.png" alt="tentacles coming out of an open book" />
		</>
	);
};

export default Login;
