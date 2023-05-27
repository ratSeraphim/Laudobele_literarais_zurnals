import React, { useEffect, useState } from "react";
import * as S from "./style";
import Side from "../../components/Side/Side";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { List, ListItem, Typography } from "@mui/material";

const EditCollection = ({ accData }) => {
	const { id } = useParams();
	const fetchURL = "http://localhost:3001/collections/" + id;
	const [data, setData] = useState(null);
	const [inputs, setInputs] = useState({
		collection_id: "",
		name: "",
		description: "",
	});
	const [message, setMessage] = useState("");

	const handleSubmit = (event) => {
		//Apstādina lapu no sevis atjaunošanas
		event.preventDefault();

		console.log(inputs);

		//Nosūta mainīgos uz API
		axios
			.put("http://localhost:3001/accounts/" + accData.id, inputs)
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

	useEffect(() => {
		axios.get(fetchURL).then((response) => {
			console.log(response.data);
			setData(response.data);
			setInputs({
				collection_id: id,
				name: response.data.collection.name,
				description: response.data.collection.description,
			});
		});
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

								<List>
									{data.stories.map((Story) => {
										return <ListItem>{Story.title}</ListItem>;
									})}
								</List>
								<S.Submit type="submit" />
							</S.Form>
						</S.CusPaper>
					)
				) : (
					<Typography color="warning">Go back!!!</Typography>
				)}
				<Side></Side>
			</S.Content>
		</>
	);
};

export default EditCollection;
