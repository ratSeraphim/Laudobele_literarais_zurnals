import { Button, Paper, Typography } from "@mui/material";
import Side from "../../components/Side/Side";
import * as S from "./style";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
// extend dayjs
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Posts = ({ accData }) => {
	const fetchURL = "http://localhost:3001/posts";
	const [post, setPost] = useState(null);
	useEffect(() => {
		console.log(accData);
		axios.get(fetchURL).then((response) => {
			setPost(response.data);
		});
		console.log(accData);
	}, [fetchURL]);
	return (
		<>
			<S.Content>
				<Paper>
					<Typography variant="title">Recent Posts</Typography>
					{!post && (
						<>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
						</>
					)}
					{post && (
						<S.Holder>
							{post.data.map((Post) => {
								const shortDateFormat = dayjs(Post.date).format("MM/DD/YYYY"); // 03/19/2022
								const postDate = dayjs(Post.date).fromNow();
								return (
									<>
										<S.Letter key={Post.post_id}>
											<S.ItemContent>
												{Post.content}
												<S.Author>
													- {Post.display_name}, {postDate}
												</S.Author>
											</S.ItemContent>

											{shortDateFormat}
											{Post.story_id && (
												<S.LinkButton href={"/stories/" + Post.story_id}>
													Story here...
												</S.LinkButton>
											)}
											{Post.collection_id && (
												<S.LinkButton
													href={"/collections/" + Post.collection_id}
												>
													Collection here....
												</S.LinkButton>
											)}
											{accData &&
												(accData.displayName === Post.display_name ? (
													<Button color="error">Delete</Button>
												) : null)}
										</S.Letter>
									</>
								);
							})}
						</S.Holder>
					)}
				</Paper>
				<Side></Side>
			</S.Content>
		</>
	);
};

export default Posts;
