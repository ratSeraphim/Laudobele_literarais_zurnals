import { useEffect, useState } from "react";
import Parchment from "../Parchment/Parchment";
import * as S from "./style";
import axios from "axios";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Button } from "@mui/material";

const Comment = ({ accData, story_id }) => {
	const [comments, setComments] = useState(null);
	const fetchURL = "http://localhost:3001/comments/story/" + story_id;
	useEffect(() => {
		console.log(fetchURL);
		axios.get(fetchURL).then((response) => {
			setComments(response.data);
		});
	}, [fetchURL]);

	const handleDelete = (id) => () => {
		//Saņem izmainītās vērtības
		console.log(id);
		//Izmainītās vērtības ieliek mainīgajā vērtībā
		if (window.confirm("Delete the item?")) {
			axios
				.delete("http://localhost:3001/comments/" + id)
				.then((response) => {
					console.log(`Deleted comment with ID ${id}`);
					window.location.reload(false);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	return (
		<>
			{(!comments || !comments.data || comments.data.length === 0) && (
				<S.BgPaper>
					<Parchment>No comments.</Parchment>
				</S.BgPaper>
			)}
			{comments && comments.data.length !== 0 && (
				<S.BgPaper>
					{comments.data.map((Comment) => {
						const shortDateFormat = dayjs(Comment.date).format("MM/DD/YYYY");
						return (
							<S.Letter key={Comment.comment_id}>
								<S.CommentContent>{Comment.content}</S.CommentContent>
								<S.Meta>
									by {Comment.display_name} on {shortDateFormat}
									{accData &&
										(accData.displayName === Comment.display_name ? (
											<Button
												color="error"
												onClick={handleDelete(Comment.comment_id)}
											>
												Delete
											</Button>
										) : null)}
								</S.Meta>
							</S.Letter>
						);
					})}
				</S.BgPaper>
			)}
		</>
	);
};

export default Comment;