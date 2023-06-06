import React, { useEffect, useState } from "react";
import * as S from "./style";
import Side from "../../components/Side/Side";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Typography } from "@mui/material";
import Message from "../../components/Alerts/Message";

const CreateCollection = ({ accData }) => {
	const navigate = useNavigate();
	const [authored, setAuthored] = useState(null);

	const [users, setUsers] = useState();
	const [inputs, setInputs] = useState({
		account_id: null,
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
			.post("/collections", inputs)
			//Saņem ziņu no API puses
			.then((response) => {
				console.log(response.data);
				setMessage(response.data);
				if (response.data === "Collection created successfully") {
					navigate("/collections");
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
			account_id: accData.id,
			[name]: value,
		});
	};

	return (
		<>
			<S.Content>
				{!accData && <Typography>Go back!!!</Typography>}
				{accData && (
					<S.CusPaper>
						<div>New collection</div>
						<Message message={message} />
						<S.Form onSubmit={handleSubmit}>
							<S.StoryTitle
								required
								type="text"
								label="Name"
								name="name"
								helperText="Your collection's title"
								onChange={handleChange}
							/>
							<S.StoryInput
								required
								multiline
								label="Description"
								name="description"
								minRows={2}
								variant="filled"
								helperText="Short description about the collection's purpose"
								onChange={handleChange}
							/>

							<S.Submit type="submit" />
						</S.Form>
					</S.CusPaper>
				)}
				<Side></Side>
			</S.Content>
		</>
	);
};

export default CreateCollection;
