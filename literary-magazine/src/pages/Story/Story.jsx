import { Button, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import Markdown from "markdown-to-jsx";
import { useParams } from "react-router-dom";
import * as S from "./style";

import Side from "../../components/Side/Side";
import Parchment from "../../components/Parchment/Parchment";

const Story = () => {
	const { id } = useParams();
	const fetchURL = "http://localhost:3001/stories/" + id;

	const [story, setStory] = React.useState(null);

	React.useEffect(() => {
		console.log(fetchURL);
		axios.get(fetchURL).then((response) => {
			setStory(response.data);
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
							<Markdown children={story.data.content}></Markdown>
							<S.StoryContent></S.StoryContent>
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
