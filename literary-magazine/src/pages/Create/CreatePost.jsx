import React, { useEffect, useState } from "react";
import * as S from "./style";
import Side from "../../components/Side/Side";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";

const CreatePost = () => {
	const navigate = useNavigate();
	const [story, setStory] = useState("");
	const [stories, setStories] = useState(null);
	const [collection, setCollection] = useState("");
	const [storiesAuthored, setStoriesAuthored] = useState("");
	const [accData, setAccData] = useState();
	const [inputs, setInputs] = useState({
		account_id: "",
		content: "",
		story: null,
		collection: null,
	});
	const [message, setMessage] = useState("");

	//Define all the URLs we need for this
	const fetchUserData = () => {
		// Saņem saglabāto sīkdatni
		const jwt = Cookies.get("jwt");
		return axios.get("http://localhost:3001/accounts/verify", {
			headers: {
				Authorization: `${jwt}`,
			},
		});
	};

	const fetchStories = () => {
		return axios.get("http://localhost:3001/stories/");
	};

	const fetchCollections = () => {
		return axios.get("http://localhost:3001/accounts/");
	};

	const handleSubmit = (event) => {
		//Apstādina lapu no sevis atjaunošanas
		event.preventDefault();

		console.log(inputs);

		//Nosūta mainīgos uz API
		axios
			.post("http://localhost:3001/posts", inputs)
			//Saņem ziņu no API puses
			.then((response) => {
				console.log(response.data);
				setMessage(response.data);
				if (response.data === "post created successfully") {
					navigate("/posts");
				}
			})
			//Ja ir kļūda, tad saņem kļūdas ziņu no API puses
			.catch((error) => {
				console.log(error.message);
				setMessage(error);
			});
		//Aizved lietotāju uz mājaslapu
		// navigate("/");
	};

	//Kad tekstā notiek izmaiņas,
	const handleChange = (event) => {
		//Saņem izmainītās vērtības
		const { name, value } = event.target;
		//Izmainītās vērtības ieliek mainīgajā vērtībā
		setInputs({
			...inputs,
			[name]: value,
			account_id: accData.id,
		});
		setStoriesAuthored(
			stories.filter(function isAuthoredBy(data) {
				return data.display_name === accData.displayName;
			})
		);
		console.log(storiesAuthored);
	};

	Promise.all([fetchUserData(), fetchStories(), fetchCollections()])
		.then((responses) => {
			const userData = responses[0].data;
			const storyData = responses[1].data;
			const collectionData = responses[2].data;
			console.log("User: ", userData);
			console.log("Story: ", storyData);
			console.log("Collection: ", collectionData);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
	useEffect(() => {
		/*// Nosūta verifikāciju uz API lai apstiprinātu un dekriptētu datus
		axios
			.get("http://localhost:3001/accounts/verify", {
				headers: {
					Authorization: `${jwt}`,
				},
			})
			.then((response) => {
				// Ja API apstrādā datus un pretī saņem saglabāto "payload", tad saņem konta identifikatoru. Savādāk, lietotāju nosūta
				//atpakaļ uz tuvāko publiski pieejamo saiti
				response.data == null ? navigate("/posts") : setAccData(response.data);
			})
			.catch((error) => {
				// Handle errors
				console.error("Verification error:", error);
			});

		stories.then((response) => {
			console.log(response.data.data);

			setStories(response.data.data);
		});*/
	}, []);
	return (
		<>
			<S.Content>
				{accData === undefined && (
					<Typography color="warning">Go back!!!</Typography>
				)}
				{accData !== undefined && (
					<S.CusPaper>
						<div>New post</div>
						<h3>{message}</h3>
						<S.Form onSubmit={handleSubmit}>
							<S.StoryInput
								required
								multiline
								label="Content"
								name="content"
								minRows={3}
								variant="filled"
								helperText="The story itself! Go wild."
								onChange={handleChange}
							/>
							{storiesAuthored && (
								<FormControl fullWidth>
									<InputLabel>Story</InputLabel>
									<Select label="Story" value={story}>
										{storiesAuthored.map((Story) => {
											return (
												<MenuItem key={Story.story_id} value={Story.story_id}>
													{Story.title} by {Story.display_name}
												</MenuItem>
											);
										})}
									</Select>
									<FormHelperText>
										Related story, if there is one
									</FormHelperText>
								</FormControl>
							)}
							<FormControl fullWidth>
								<InputLabel>Collection</InputLabel>
								<Select
									labelId="collection-label"
									label="Collection"
									value={collection}
								>
									<MenuItem>Item one</MenuItem>
								</Select>
								<FormHelperText>
									Related collection, if there is one
								</FormHelperText>
							</FormControl>
							<S.Submit type="submit" />
						</S.Form>
					</S.CusPaper>
				)}
				<Side></Side>
			</S.Content>
		</>
	);
};

export default CreatePost;
