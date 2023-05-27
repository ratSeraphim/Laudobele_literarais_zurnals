import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./style";

import Side from "../../components/Side/Side";
import Parchment from "../../components/Parchment/Parchment";
import dayjs from "dayjs";
import Comments from "../../components/Comments/Comments";
import CreateComment from "../../components/Comments/CreateComment";

const Story = ({ accData }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const fetchURL = "http://localhost:3001/stories/" + id;

	const [shortDateFormat, setShortDateFormat] = useState(null);
	const [story, setStory] = useState(null);

	const handleDelete = () => {
		//Saņem izmainītās vērtības
		console.log(fetchURL);
		//Izmainītās vērtības ieliek mainīgajā vērtībā
		if (window.confirm("Delete the item?")) {
			axios
				.delete(fetchURL)
				.then((response) => {
					console.log(`Deleted story with ID ${id}`);
					navigate("/stories");
					window.location.reload(false);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	useEffect(() => {
		axios.get(fetchURL).then((response) => {
			setStory(response);
			setShortDateFormat(dayjs(response.date).format("MM/DD/YYYY"));
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
					{accData
						? accData.displayName === story.data.display_name && (
								<>
									<Button
										variant="outlined"
										color="warning"
										href={"/stories/edit/" + id}
									>
										Edit
									</Button>
									<Button
										variant="contained"
										color="error"
										onClick={handleDelete}
									>
										Delete
									</Button>
								</>
						  )
						: null}
				</S.BgPaper>

				<Side></Side>
				<Comments accData={accData} story_id={id}></Comments>

				<CreateComment accData={accData} story_id={id}></CreateComment>
			</S.Content>
		</>
	);
};

export default Story;
