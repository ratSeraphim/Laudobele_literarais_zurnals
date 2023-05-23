import React, { useEffect, useState } from "react";
import * as S from "./style";
import Side from "../../components/Side/Side";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";

const CreateStory = () => {
	const navigate = useNavigate();
	const [checked, setChecked] = useState(false);
	const [accId, setAccId] = useState();
	const [inputs, setInputs] = useState({
		account_id: "",
		title: "",
		summary: "",
		content: "",
		public: 0,
	});
	const [message, setMessage] = useState("");
	const handleSubmit = (event) => {
		//Apstādina lapu no sevis atjaunošanas
		event.preventDefault();

		console.log(inputs);

		//Nosūta mainīgos uz API
		axios
			.post("http://localhost:3001/stories", inputs)
			//Saņem ziņu no API puses
			.then((response) => {
				console.log(response.data);
				setMessage(response.data);
				if (response.data === "Story created successfully") {
					navigate("/stories");
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

	const handleCheck = (event) => {
		setChecked(event.target.checked);
		checked !== true
			? setInputs({
					...inputs,
					public: 1,
			  })
			: setInputs({
					...inputs,
					public: 0,
			  });
	};
	//Kad tekstā notiek izmaiņas,

	const handleChange = (event) => {
		//Saņem izmainītās vērtības
		const { name, value } = event.target;
		//Izmainītās vērtības ieliek mainīgajā vērtībā
		setInputs({
			...inputs,
			[name]: value,
			account_id: accId,
		});
	};
	useEffect(() => {
		// Retrieve the JWT from the stored cookie or any other source
		const jwt = Cookies.get("jwt");

		// Send the verification request to the backend
		axios
			.get("http://localhost:3001/accounts/verify", {
				headers: {
					Authorization: `${jwt}`,
				},
			})
			.then((response) => {
				// Handle the response from the backend
				response.data == null
					? navigate("/stories")
					: setAccId(response.data.id);
			})
			.catch((error) => {
				// Handle errors
				console.error("Verification error:", error);
			});
	}, []);
	return (
		<>
			<S.Content>
				{accId === undefined && (
					<Typography color="warning">Go back!!!</Typography>
				)}
				{accId !== undefined && (
					<S.CusPaper>
						<div>New story</div>
						<h3>{message}</h3>
						<S.Form onSubmit={handleSubmit}>
							<S.StoryTitle
								required
								type="text"
								label="Title"
								name="title"
								helperText="Your story's title"
								onChange={handleChange}
							/>

							<S.StoryInput
								required
								multiline
								label="Summary"
								name="summary"
								minRows={2}
								maxRows={4}
								variant="filled"
								helperText="How your story will show up in story lists"
								onChange={handleChange}
							/>

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
							<FormControlLabel
								required
								control={
									<Checkbox
										checked={checked}
										onChange={handleCheck}
										color="success"
									/>
								}
								label="Publicize?"
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

export default CreateStory;
