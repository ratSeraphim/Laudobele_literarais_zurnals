import React, { useEffect, useState } from "react";
import * as S from "./style";
import Side from "../../components/Side/Side";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import Message from "../../components/Alerts/Message";

const CreateStory = ({ accData }) => {
	const navigate = useNavigate();
	const [checked, setChecked] = useState(false);

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
			.post(process.env.REACT_APP_API_URL + "/stories", inputs)
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
			account_id: accData.id,
		});
	};
	useEffect(() => {
		console.log(accData);
	}, [accData]);
	return (
		<>
			<S.Content>
				{!accData && <Typography>Go back!!!</Typography>}
				{accData ? (
					accData.id !== undefined && (
						<S.CusPaper>
							<div>New story</div>
							<Message message={message} />
							<S.Form onSubmit={handleSubmit}>
								<S.StoryTitle
									required
									type="text"
									label="Title"
									name="title"
									helperText="Your story's title"
									value={inputs.title}
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
									value={inputs.summary}
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
									value={inputs.content}
									onChange={handleChange}
								/>
								<FormControlLabel
									required
									control={
										<Checkbox
											value={inputs.public}
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
					)
				) : (
					<Typography color="warning">Go back!!!</Typography>
				)}
				<Side></Side>
			</S.Content>
		</>
	);
};

export default CreateStory;
