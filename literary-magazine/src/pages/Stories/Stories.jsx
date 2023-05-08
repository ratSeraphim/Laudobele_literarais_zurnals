import { Paper, Typography } from "@mui/material";
import Side from "../../components/Side/Side";
import * as S from "./style";
import axios from "axios";
import React from "react";

const Stories = () => {
	const fetchURL = "http://localhost:3001/stories";
	const [post, setPost] = React.useState(null);

	React.useEffect(() => {
		axios.get(fetchURL).then((response) => {
			setPost(response.data);
		});
		console.log({ post });
	}, [fetchURL]);

	return (
		<>
			<S.Content>
				<Paper>
					<Typography variant="title">Recent Stories</Typography>
					{!post && (
						<>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
						</>
					)}
					{post && (
						<>
							{post.data.map((NewsFeed, i) => {
								return (
									<div key={i}>
										<S.Title>{NewsFeed.title}</S.Title>
									</div>
								);
							})}
						</>
					)}
				</Paper>
				<Side></Side>
			</S.Content>
		</>
	);
};

export default Stories;
