import React, { useEffect, useState } from "react";
import * as S from "./style";
import Side from "../../components/Side/Side";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Message from "../../components/Alerts/Message";
import Error from "../../components/Alerts/Error";

const EditProfile = ({ accData }) => {
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		account_id: "",
		display_email: "",
		display_name: "",
		description: "",
	});

	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const handleSubmit = (event) => {
		//Apstādina lapu no sevis atjaunošanas
		event.preventDefault();

		console.log(inputs);

		//Nosūta mainīgos uz API
		axios
			.put(process.env.REACT_APP_API_URL + "/accounts/" + accData.id, inputs)
			//Saņem ziņu no API puses
			.then((response) => {
				console.log(response.data);
				setMessage(response.data);
			})
			//Ja ir kļūda, tad saņem kļūdas ziņu no API puses
			.catch((error) => {
				console.log(error.message);
				setError(error.message);
			});
		//Aizved lietotāju uz mājaslapu
		// navigate("/");
	};

	useEffect(() => {
		if (accData) {
			const fetchURL =
				process.env.REACT_APP_API_URL + "/accounts/" + accData.id;
			axios.get(fetchURL).then((response) => {
				console.log(response.data);

				setInputs({
					...inputs,
					description: response.data.description,
					display_email: response.data.display_email,
					display_name: accData.displayName,
				});
				console.log(inputs);
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
							<Message message={message} />
							<Error message={error} />
							<S.Form onSubmit={handleSubmit}>
								<S.Title
									disabled
									label="Display name"
									name="display_name"
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
