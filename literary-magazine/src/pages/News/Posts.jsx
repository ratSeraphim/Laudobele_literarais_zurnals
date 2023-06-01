import { Button, Paper, Typography } from "@mui/material";
import Side from "../../components/Side/Side";
import * as S from "./style";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
// extend dayjs
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
dayjs.extend(relativeTime);

const Posts = ({ accData }) => {
	const navigate = useNavigate();
	const fetchURL = process.env.REACT_APP_API_URL + "/posts";
	const [post, setPost] = useState(null);

	const handleDelete = (id) => () => {
		//Saņem izmainītās vērtības
		console.log(id);
		//Izmainītās vērtības ieliek mainīgajā vērtībā
		if (window.confirm("Delete the item?")) {
			axios
				.delete(process.env.REACT_APP_API_URL + "/posts/" + id)
				.then((response) => {
					console.log(`Deleted post with ID ${id}`);
					window.location.reload(false);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};
	useEffect(() => {
		axios.get(fetchURL).then((response) => {
			setPost(response.data);
		});
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
												<S.Author key={Post.displayName}>
													- {Post.display_name}, {postDate}
												</S.Author>
											</S.ItemContent>

											{shortDateFormat}
											{Post.story_id && (
												<S.LinkButton
													key={Post.story_id}
													href={"/stories/" + Post.story_id}
												>
													Story here...
												</S.LinkButton>
											)}
											{Post.collection_id && (
												<S.LinkButton
													key={Post.collection_id}
													href={"/collections/" + Post.collection_id}
												>
													Collection here....
												</S.LinkButton>
											)}
											{accData &&
												(accData.displayName === Post.display_name ? (
													<Button
														color="error"
														onClick={handleDelete(Post.post_id)}
													>
														Delete
													</Button>
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
