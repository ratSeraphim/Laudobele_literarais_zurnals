import { Paper, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import Markdown from "markdown-to-jsx";
import { useParams } from "react-router-dom";
import * as S from "./style";
import "./story.css";

import Side from "../Side/Side";

const Story = () => {
	const { id } = useParams();
	const fetchURL = "http://localhost:3001/stories/" + id;

	const [post, setPost] = React.useState(null);

	React.useEffect(() => {
		console.log(fetchURL);
		axios.get(fetchURL).then((response) => {
			setPost(response.data);
		});
	}, [fetchURL]);
	return (
		<>
			<S.Content>
				<Paper>
					{!post && (
						<>
							<S.PlaceHolder variant="text"></S.PlaceHolder>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
						</>
					)}
					{post && (
						<S.Story>
							<S.Info>
								<Typography variant="title">{post.data.title}</Typography>
								<Typography variant="subtitle">
									written by {post.data.display_name}
								</Typography>
							</S.Info>
							<Markdown children={post.data.content}></Markdown>
							<S.StoryContent></S.StoryContent>
						</S.Story>
					)}
				</Paper>
				<Side></Side>
			</S.Content>
		</>
	);
};

export default Story;
