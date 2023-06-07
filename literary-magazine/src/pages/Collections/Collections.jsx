import { Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as S from "./style";
import Side from "../../components/Side/Side";

const Collections = () => {
	const fetchURL = process.env.REACT_APP_API_URL + "/collections/";

	const [page, setPage] = useState(1);
	const [collections, setCollections] = useState(null);

	const handleChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		axios
			.get(fetchURL, {
				params: { page },
				credentials: "include",
				withCredentials: true,
			})
			.then((response) => {
				setCollections(response.data);
			});
	}, [page]);
	return (
		<>
			<S.Content>
				<Paper>
					{collections && (
						<>
							{collections.data.map((Collection) => {
								return (
									<S.Collection key={Collection.collection_id}>
										<Typography variant="subtitle">
											{Collection.name}
										</Typography>
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
							<S.PageSelection
								count={collections.meta.totalPages.page_count}
								color="secondary"
								page={page}
								onChange={handleChange}
							/>
						</>
					)}
				</Paper>

				<Side></Side>
			</S.Content>
		</>
	);
};

export default Collections;
