import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./style";

import Side from "../../components/Side/Side";
import Parchment from "../../components/Parchment/Parchment";
import dayjs from "dayjs";

const Story = () => {
	const { id } = useParams();
	const fetchURL = "http://localhost:3001/stories/" + id;

	const [shortDateFormat, setShortDateFormat] = useState(null);
	const [story, setStory] = useState(null);

	useEffect(() => {
		console.log(fetchURL);
		axios.get(fetchURL).then((response) => {
			setStory(response.data);
			setShortDateFormat(dayjs(response.data.date).format("MM/DD/YYYY"));
		});
	}, [fetchURL]);
	return (
		<>
			<S.Content>
				<S.BgPaper>
					{!story && (
						<>
							<S.PlaceHolder variant="text"></S.PlaceHolder>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
						</>
					)}
					{story && (
						<Parchment>
							<S.Info>
								<Typography variant="title">{story.data.title}</Typography>
								<Typography variant="subtitle">
									written by {story.data.display_name}
								</Typography>
							</S.Info>

							<S.Text>{story.data.content}</S.Text>
							<S.StoryDate>written on {shortDateFormat}</S.StoryDate>
						</Parchment>
					)}{" "}
					<Button>Edit</Button>
				</S.BgPaper>

				<Side></Side>
			</S.Content>
		</>
	);
};

export default Story;
