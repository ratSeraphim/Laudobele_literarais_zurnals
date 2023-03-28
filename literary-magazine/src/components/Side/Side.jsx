import * as S from "./style";
import React from "react";
import { Button, ButtonGroup, Typography } from "@mui/material";

const Side = () => {
	return (
		<S.Aside>
			<Typography>Create content</Typography>
			<Button variant="contained" color="success">
				New story
			</Button>
			<Button color="success">New post</Button>
			<Typography>Manage data</Typography>
			<ButtonGroup orientation="vertical" variant="contained" color="tertiary">
				<Button>Settings</Button>
				<Button>Stories</Button>
			</ButtonGroup>
		</S.Aside>
	);
};

export default Side;
