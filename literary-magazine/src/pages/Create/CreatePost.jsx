import React, { useEffect, useState } from "react";
import * as S from "./style";
import Side from "../../components/Side/Side";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";

const CreatePost = ({ accData }) => {
	const navigate = useNavigate();
	const [authored, setAuthored] = useState(null);

	const [inputs, setInputs] = useState({
		account_id: "",
		content: "",
		story: null,
		collection: null,
	});
	const [message, setMessage] = useState("");

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
				if (response.data === "Post created successfully") {
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
	};

	useEffect(() => {
		accData
			? axios
					.get("http://localhost:3001/accounts/created/" + accData.id)
					.then((response) => {
						const createdData = response.data;
						console.log(createdData);

						setAuthored(createdData);
					})
					.catch((error) => {
						console.error("Error:", error);
					})
			: console.log("no account data");
	}, [accData]);

	return (
		<>
			<S.Content>
				{!accData && <Typography>Go back!!!</Typography>}
				{accData && (
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
							{authored && (
								<>
									<FormControl>
										<InputLabel>Story</InputLabel>
										<Select
											label="Story"
											defaultValue=""
											name="story"
											onChange={handleChange}
										>
											<MenuItem value={null}>-</MenuItem>
											{authored.stories.map((Story) => {
												return (
													<MenuItem key={Story.story_id} value={Story.story_id}>
														{Story.title}
													</MenuItem>
												);
											})}
										</Select>
										<FormHelperText>
											Related story, if there is one
										</FormHelperText>
									</FormControl>

									<FormControl>
										<InputLabel>Collection</InputLabel>
										<Select
											label="Collection"
											defaultValue=""
											name="collection"
											onChange={handleChange}
										>
											<MenuItem value={null}>-</MenuItem>
											{authored.collections.map((Collection) => {
												return (
													<MenuItem
														key={Collection.collection_id}
														value={Collection.collection_id}
													>
														{Collection.name}
													</MenuItem>
												);
											})}
										</Select>
										<FormHelperText>
											Related collection, if there is one
										</FormHelperText>
									</FormControl>
								</>
							)}

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
