import React, { useEffect, useState } from "react";
import * as S from "./style";
import Side from "../../components/Side/Side";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import Message from "../../components/Alerts/Message";

const EditStory = ({ accData }) => {
	const { id } = useParams();
	const navigate = useNavigate();

	const fetchURL = process.env.REACT_APP_API_URL + "/stories/" + id;
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
			.put(process.env.REACT_APP_API_URL + "/stories/" + id, inputs)
			//Saņem ziņu no API puses
			.then((response) => {
				console.log(response.data);
				setMessage(response.data);
				if (response.data === "Story edited successfully") {
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

	useEffect(() => {
		console.log(fetchURL);
		axios.get(fetchURL).then((response) => {
			console.log(response.data);
			setInputs({
				...inputs,
				title: response.data.title,
				summary: response.data.summary,
				content: response.data.content,
			});
			setChecked(false);
		});
	}, [fetchURL]);

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
							<div>Edit story</div>
							<Message message={message} />
							<S.Form onSubmit={handleSubmit}>
								<S.Title
									disabled
									type="text"
									label="Title"
									name="title"
									value={inputs.title}
									onChange={handleChange}
								/>

								<S.Input
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

								<S.Input
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
											checked={checked}
											onChange={handleCheck}
											color="success"
										/>
									}
									label="Public?"
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

export default EditStory;
