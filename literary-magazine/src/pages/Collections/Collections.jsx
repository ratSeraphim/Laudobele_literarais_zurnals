import { Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./style";

import Side from "../../components/Side/Side";
import Parchment from "../../components/Parchment/Parchment";

const Collections = () => {
	const fetchURL = "http://localhost:3001/collections/";

	const [collections, setCollections] = useState(null);

	useEffect(() => {
		axios.get(fetchURL).then((response) => {
			setCollections(response.data);
		});
	}, [fetchURL]);
	return (
		<>
			<S.Content>
				<Paper>
					{collections &&
						collections.data.map((Collection) => {
							return (
								<S.Collection key={Collection.collection_id}>
									<Typography variant="subtitle">{Collection.name}</Typography>
									<Button
										variant="outlined"
										color="success"
										href={"/collections/" + Collection.collection_id}
									>
										View
									</Button>
								</S.Collection>
							);
						})}
				</Paper>

				<Side></Side>
			</S.Content>
		</>
	);
};

export default Collections;
