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
					<S.SideButton variant="contained" color="success" href="/stories/new">
						New story
					</S.SideButton>
					<Button color="success" href="/posts/new">
						New post
					</Button>
					<Button color="success" href="/collections/new">
						New collection
					</Button>
					<Typography>Manage data</Typography>
					<ButtonGroup
						orientation="vertical"
						variant="contained"
						color="tertiary"
					>
						<Button href="/profile">Content</Button>
					</ButtonGroup>{" "}
				</>
			)}
			{!jwtCookie && (
				<>
					{" "}
					<Typography>You should create an account!</Typography>
					<S.SideButton color="success" variant="contained" href="/signup">
						Sign up
					</S.SideButton>
					<p>If you already have an account:</p>
					<S.SideButton color="tertiary" variant="contained" href="/login">
						Log in
					</S.SideButton>
					<p>
						When you log in you can:
						<br /> Create stories,
						<br /> Work on collections,
						<br /> Edit your profile!
					</p>
				</>
			)}
			<S.SideButton variant="contained" color="secondary">
				11's Collections
			</S.SideButton>
		</S.Aside>
	);
};

export default Side;
