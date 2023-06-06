import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./style";

import Side from "../../components/Side/Side";

const Collection = ({ accData }) => {
	const { id } = useParams();
	const fetchURL = process.env.REACT_APP_API_URL + "/collections/" + id;

	const [data, setData] = useState(null);

	const handleRemoval = (item_id, type) => () => {
		//Saņem izmainītās vērtības
		console.log(item_id);
		//Izmainītās vērtības ieliek mainīgajā vērtībā
		if (window.confirm("Delete the item?")) {
			axios
				.delete(
					process.env.REACT_APP_API_URL + "/collections/" + type + "/removal",
					{
						params: { id, item_id },
						credentials: "include",
						withCredentials: true,
					}
				)
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
							<Typography>{data.collection.name}</Typography>
							<Typography>{data.collection.description}</Typography>

							{accData &&
								data.users.some((element) => {
									return element.account_id === accData.id;
								}) && (
									<S.CusButton
										variant="contained"
										color="warning"
										href={"/collections/edit/" + id}
									>
										Edit
									</S.CusButton>
								)}
						</S.Collection>
						<S.BgPaperOne>
							{data.stories.map((Story) => {
								return (
									<S.Collection key={Story.story_id}>
										<Typography>{Story.title}</Typography>
										<div>
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
										</div>
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
