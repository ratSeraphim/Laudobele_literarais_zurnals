import { Typography } from "@mui/material";

import Side from "../../components/Side/Side";
import * as S from "./style";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Parchment from "../../components/Parchment/Parchment";

const Author = ({ accData }) => {
	const { id } = useParams();
	const fetchURL = process.env.REACT_APP_API_URL + "/accounts/" + id;
	const [author, setAuthor] = useState(null);

	useEffect(() => {
		axios.get(fetchURL).then((response) => {
			setAuthor(response.data);
		});
	}, [fetchURL]);

	return (
		<>
			<S.Content>
				<S.BgPaper>
					{author && (
						<>
							<Parchment>
								<Typography variant="h1">{author.display_name}</Typography>
								<S.AuthorCard>
									<Typography>{author.description}</Typography>
									{author.display_email && (
										<Typography variant="subtitle">
											Email me -- {author.display_email}
										</Typography>
									)}
								</S.AuthorCard>
							</Parchment>
						</>
					)}
				</S.BgPaper>
				<Side></Side>
			</S.Content>
		</>
	);
};

export default Author;
