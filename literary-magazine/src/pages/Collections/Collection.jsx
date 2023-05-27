import { Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./style";

import Side from "../../components/Side/Side";
import Parchment from "../../components/Parchment/Parchment";

const Collection = ({ accData }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const fetchURL = "http://localhost:3001/collections/" + id;

	const [data, setData] = useState(null);

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

	useEffect(() => {
		axios.get(fetchURL).then((response) => {
			setData(response.data);
			console.log(response.data);
		});
	}, [fetchURL]);
	return (
		<>
			<S.Content>
				{data && (
					<div>
						<S.Collection>
							{data.collection.name} <br />
							- <br />
							{data.collection.description}
						</S.Collection>
						<S.BgPaperOne>
							{data.stories.map((Story) => {
								return (
									<S.Collection key={Story.story_id}>
										<Typography>{Story.title}</Typography>
										<S.CusButton
											variant="contained"
											color="success"
											href={"/stories/" + Story.story_id}
										>
											View
										</S.CusButton>
										{accData &&
											data.users.some((element) => {
												return element.account_id === accData.id;
											}) && (
												<S.CusButton
													variant="contained"
													color="error"
													onClick={handleRemoval(Story.story_id, "story")}
												>
													Remove
												</S.CusButton>
											)}
									</S.Collection>
								);
							})}
						</S.BgPaperOne>
						<S.BgPaperTwo>
							{data.users.map((User) => {
								return (
									<S.Collection key={User.account_id}>
										<Typography>{User.display_name}</Typography>
										<Button
											variant="outlined"
											color="success"
											href={"/author/" + User.account_id}
										>
											View
										</Button>
										{accData &&
											(accData.id === User.account_id ||
												accData.id === data.users[0].account_id) && (
												<S.CusButton
													variant="contained"
													color="error"
													onClick={handleRemoval(User.account_id, "user")}
												>
													Remove
												</S.CusButton>
											)}
									</S.Collection>
								);
							})}
						</S.BgPaperTwo>
					</div>
				)}
				<Side></Side>
			</S.Content>
		</>
	);
};

export default Collection;
