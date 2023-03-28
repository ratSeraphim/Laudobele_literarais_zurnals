import * as S from "./style";
import React from "react";
import { Button } from "@mui/material";

const Side = () => {
	return (
		<S.Aside>
			<Button variant="contained" color="success">
				New story
			</Button>
			<Button color="success">New post</Button>
			<Button>Settings</Button>
		</S.Aside>
	);
};

export default Side;
