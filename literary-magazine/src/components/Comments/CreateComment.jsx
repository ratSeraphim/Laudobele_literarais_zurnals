import { Paper } from "@mui/material";
import * as S from "./style";
import axios from "axios";
import React, { useState } from "react";

const CreateComment = ({ accData, story_id }) => {
	const [inputs, setInputs] = useState({
		account_id: "",
		content: "",
		story_id: story_id,
	});
	const [message, setMessage] = useState("");

	const handleSubmit = (event) => {
		//Apstādina lapu no sevis atjaunošanas
		event.preventDefault();

		console.log(inputs);

		//Nosūta mainīgos uz API
		axios
			.post(process.env.REACT_APP_API_URL + "/comments/" + story_id, inputs)
			//Saņem ziņu no API puses
			.then((response) => {
				console.log(response.data);
				setMessage(response.data);
				if (response.data === "Comment created successfully") {
					window.location.reload(false);
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

	return (
		<Paper>
			<S.Form onSubmit={handleSubmit}>
				<S.Input
					required
					multiline
					label="Comment"
					name="content"
					minRows={2}
					variant="filled"
					onChange={handleChange}
				/>

				<S.Submit type="submit" />
			</S.Form>
		</Paper>
	);
};

export default CreateComment;
