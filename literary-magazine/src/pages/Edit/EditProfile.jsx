import React, { useEffect, useState } from "react";
import * as S from "./style";
import Side from "../../components/Side/Side";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const EditProfile = ({ accData }) => {
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		account_id: "",
		display_email: "",
		display_name: "",
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
		if (accData) {
			const fetchURL = "http://localhost:3001/accounts/" + accData.id;
			axios.get(fetchURL).then((response) => {
				console.log(response.data);
				setInputs({
					display_name: response.data.display_name,
				});
				response.data.display_email
					? setInputs({
							display_email: response.data.display_email,
					  })
					: console.log("no email");
				response.data.description
					? setInputs({
							description: response.data.description,
					  })
					: console.log("no description");
			});
		}
	}, [accData]);

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
									label="Display name"
									name="title"
									value={inputs.display_name}
									onChange={handleChange}
								/>

								<S.Title
									label="Email"
									type="email"
									name="display_email"
									helperText="Enter an e-mail people can contact you through!"
									value={inputs.display_email}
									onChange={handleChange}
								/>

								<S.Input
									multiline
									label="Content"
									name="description"
									minRows={2}
									variant="filled"
									helperText="Write a little description about yourself!"
									value={inputs.description}
									onChange={handleChange}
								/>

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

export default EditProfile;