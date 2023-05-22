import * as S from "./style";
import React from "react";
import { Button, ButtonGroup, Typography } from "@mui/material";
import Cookies from "js-cookie";

const Side = () => {
	const jwtCookie = Cookies.get("jwt");
	return (
		<S.Aside>
			{jwtCookie && (
				<>
					<Typography>Create content</Typography>
					<Button variant="contained" color="success" href="/stories/edit">
						New story
					</Button>
					<Button color="success">New post</Button>
					<Button color="success">New collection</Button>
					<Typography>Manage data</Typography>
					<ButtonGroup
						orientation="vertical"
						variant="contained"
						color="tertiary"
					>
						<Button>Settings</Button>

						<Button>Stories</Button>
					</ButtonGroup>{" "}
				</>
			)}
			{!jwtCookie && (
				<>
					{" "}
					<Typography>You should create an account!</Typography>
					<Button color="success" variant="contained" href="/register">
						Sign up
					</Button>
					<p>If you already have an account:</p>
					<Button color="success" variant="contained" href="/login">
						Log in
					</Button>
					<p>
						When you log in you can:
						<br /> Create stories,
						<br /> Work on collections,
						<br /> Edit your profile!
					</p>
				</>
			)}
			<Button variant="contained" color="tertiary">
				11's Collections
			</Button>
		</S.Aside>
	);
};

export default Side;
