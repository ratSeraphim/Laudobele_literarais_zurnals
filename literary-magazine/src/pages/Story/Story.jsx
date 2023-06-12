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
	const fetchURL = process.env.REACT_APP_API_URL + "/stories/" + id;

	const [shortDateFormat, setShortDateFormat] = useState(null);
	const [shortEditDateFormat, setShortEditDateFormat] = useState(null);
	const [story, setStory] = useState(null);
	const [error, setError] = useState(null);

	const handleDelete = () => {
		//Saņemšanai un izdzēšanai izmanto vienādu URL
		console.log(fetchURL);
		//Lietotājam uznirstošs logs pārprasa akceptēt izdzēšanu
		if (window.confirm("Delete the item?")) {
			axios
				.delete(fetchURL)
				.then((response) => {
					//Kad izdzēsts, konsolē paziņots par izdzēstā darba ID
					console.log(`Deleted story with ID ${id}`);
					//Aizved uz iepriekšējo lapu
					navigate("/stories");
					window.location.reload(false);
				})
				.catch((error) => {
					//Ja ir kļūme, par to paziņo
					console.error(error);
					setError(error);
				});
		}
	};

	useEffect(() => {
		axios.get(fetchURL).then((response) => {
			setStory(response);
			setShortDateFormat(dayjs(response.data.date).format("MM/DD/YYYY"));
			setShortEditDateFormat(
				dayjs(response.data.last_edited).format("MM/DD/YYYY")
			);
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
					{story?.data && (
						<Parchment>
							<S.Info>
								<Typography variant="title">{story.data.title}</Typography>
								<a href={"/author/" + story.data.account_id}>
									<Typography variant="subtitle">
										written by {story.data.display_name}
									</Typography>
								</a>
							</S.Info>

							<S.Text>{story.data.content}</S.Text>

							<S.StoryDate>
								written on {shortDateFormat}
								{story.data.last_edited && (
									<p>last edited on {shortEditDateFormat}</p>
								)}
							</S.StoryDate>
						</Parchment>
					)}{" "}
					{(accData && accData.displayName === story?.data?.display_name && (
						<>
							<Button
								variant="outlined"
								color="warning"
								href={"/stories/edit/" + id}
							>
								Edit
							</Button>
							<Button variant="contained" color="error" onClick={handleDelete}>
								Delete
							</Button>
						</>
					)) ||
						(accData &&
							(accData.role === "admin" || accData.role === "owner") && (
								<Button
									variant="contained"
									color="error"
									onClick={handleDelete}
								>
									Delete
								</Button>
							))}
				</S.BgPaper>

				<Side></Side>
				<Comments accData={accData} story_id={id}></Comments>

				<CreateComment accData={accData} story_id={id}></CreateComment>
			</S.Content>
		</>
	);
};

export default Story;
