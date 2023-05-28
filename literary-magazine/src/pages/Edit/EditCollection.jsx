import React, { useEffect, useState } from "react";
import * as S from "./style";
import Side from "../../components/Side/Side";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
	Button,
	FormControl,
	FormHelperText,
	IconButton,
	InputLabel,
	List,
	ListItem,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import BackspaceIcon from "@mui/icons-material/Backspace";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";

const EditCollection = ({ accData }) => {
	const { id } = useParams();
	const fetchURL = "http://localhost:3001/collections/" + id;
	const endpoints = [
		"http://localhost:3001/collections/stories/" + id,
		"http://localhost:3001/collections/users/" + id,
	];
	const [data, setData] = useState(null);
	const [collection, setCollection] = useState(null);
	const [inputs, setInputs] = useState({
		collection_id: "",
		name: "",
		description: "",
	});
	const [additions, setAdditions] = useState({
		collection_id: "",
		account_id: "",
		story_id: "",
	});

	const [message, setMessage] = useState("");

	const handleSubmit = (event) => {
		//Apstādina lapu no sevis atjaunošanas
		event.preventDefault();

		console.log(inputs);

		//Nosūta mainīgos uz API
		axios
			.put("http://localhost:3001/collections/" + id, inputs)
			//Saņem ziņu no API puses
			.then((response) => {
				console.log(response.data);
				setMessage(response.data);
			})
			//Ja ir kļūda, tad saņem kļūdas ziņu no API puses
			.catch((error) => {
				console.log(error.message);
				setMessage(error);
			});
		//Aizved lietotāju uz mājaslapu
		// navigate("/");
	};

	const addToCollection = (type) => () => {
		axios
			.post("http://localhost:3001/collections/" + type, additions)
			.then((response) => {
				console.log(response.data);
				setMessage(response.data);
				window.location.reload(false);
			});
	};

	useEffect(() => {
		axios.get(fetchURL).then((response) => {
			setCollection(response.data);
			setInputs({
				name: response.data.collection.name,
				description: response.data.collection.description,
			});
		});

		Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
			([{ data: stories }, { data: users }]) => {
				setData({ stories, users });
				console.log(data);
			}
		);
	}, [fetchURL]);

	//Kad tekstā notiek izmaiņas,

	const handleChange = (event) => {
		//Saņem izmainītās vērtības
		const { name, value } = event.target;
		//Izmainītās vērtības ieliek mainīgajā vērtībā
		setInputs({
			...inputs,
			[name]: value,
			collection_id: id,
		});
	};

	const handleSelect = (event) => {
		//Saņem izmainītās vērtības
		const { name, value } = event.target;
		//Izmainītās vērtības ieliek mainīgajā vērtībā
		setAdditions({
			...additions,
			[name]: value,
			collection_id: id,
		});
	};

	const handleRemoval = (id, type) => () => {
		//Saņem izmainītās vērtības
		console.log(id);
		//Izmainītās vērtības ieliek mainīgajā vērtībā
		if (window.confirm("Delete the item?")) {
			axios
				.delete("http://localhost:3001/collections/" + type + "/" + id)
				.then((response) => {
					console.log(`Deleted ` + type + ` with ID ` + id);
					window.location.reload(false);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	return (
		<>
			<S.Content>
				{!accData && <Typography>Go away!!!</Typography>}
				{accData ? (
					accData.id !== undefined && (
						<S.CusPaper>
							<div>Edit profile</div>
							<h3>{message}</h3>
							<S.Form onSubmit={handleSubmit}>
								{collection && (
									<>
										<S.Title
											disabled
											label="Collection name:"
											name="title"
											value={inputs.name}
											onChange={handleChange}
										/>

										<S.Input
											required
											multiline
											label="Description"
											name="description"
											minRows={2}
											variant="filled"
											helperText="Short description about the collection's purpose"
											value={inputs.description}
											onChange={handleChange}
										/>
									</>
								)}

								{data?.stories && (
									<S.Selector>
										<FormControl>
											<InputLabel>Story</InputLabel>
											<S.CusSelect
												label="Story"
												defaultValue=""
												name="story_id"
												onChange={handleSelect}
											>
												<MenuItem value={null}>-</MenuItem>
												{data.stories.map((Story) => {
													return (
														<MenuItem
															key={Story.story_id}
															value={Story.story_id}
														>
															{Story.title}
														</MenuItem>
													);
												})}
											</S.CusSelect>
										</FormControl>
										<IconButton onClick={addToCollection("story")}>
											<LibraryAddIcon color="success"></LibraryAddIcon>
										</IconButton>
										<FormHelperText>Add a story</FormHelperText>
									</S.Selector>
								)}

								<List>
									{collection.stories.map((Story) => {
										return (
											<S.CollectionListItem>
												{Story.title}{" "}
												<IconButton
													variant="contained"
													color="error"
													onClick={handleRemoval(Story.story_id, "story")}
												>
													<BackspaceIcon />
												</IconButton>
											</S.CollectionListItem>
										);
									})}
								</List>

								{data.users && (
									<S.Selector>
										<FormControl>
											<InputLabel>User</InputLabel>
											<S.CusSelect
												label="User"
												defaultValue=""
												name="account_id"
												onChange={handleSelect}
											>
												<MenuItem value={null}>-</MenuItem>
												{data.users.map((User) => {
													return (
														<MenuItem
															key={User.account_id}
															value={User.account_id}
														>
															{User.display_name}
														</MenuItem>
													);
												})}
											</S.CusSelect>
										</FormControl>
										<IconButton onClick={addToCollection("user")}>
											<LibraryAddIcon color="success"></LibraryAddIcon>
										</IconButton>
										<FormHelperText>Add a user</FormHelperText>
									</S.Selector>
								)}

								<List>
									{collection.users.map((User) => {
										return (
											<S.CollectionListItem>
												{User.display_name}{" "}
												<IconButton
													variant="contained"
													color="error"
													onClick={handleRemoval(User.account_id, "user")}
												>
													<BackspaceIcon />
												</IconButton>
											</S.CollectionListItem>
										);
									})}
								</List>
								<S.Submit type="submit" />
							</S.Form>
						</S.CusPaper>
					)
				) : (
					<Typography variant="title">Go back!!!</Typography>
				)}
				<Side></Side>
			</S.Content>
		</>
	);
};

export default EditCollection;
