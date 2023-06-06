import { Button, Typography } from "@mui/material";

import Side from "../../components/Side/Side";
import * as S from "./style";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Parchment from "../../components/Parchment/Parchment";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Author = ({ accData }) => {
	const { id } = useParams();
	const fetchURL = process.env.REACT_APP_API_URL + "/accounts/" + id;
	const [author, setAuthor] = useState(null);

	const [authored, setAuthored] = useState();

	useEffect(() => {
		axios.get(fetchURL).then((response) => {
			setAuthor(response.data);
			console.log(response.data);
			axios
				.get(
					process.env.REACT_APP_API_URL +
						"/accounts/created/" +
						response.data.account_id
				)
				.then((response) => {
					const createdData = response.data;
					console.log(createdData);

					setAuthored(createdData);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		});
	}, [fetchURL]);

	return (
		<>
			<S.Content>
				<div>
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
					<S.BgPaperTwo>
						{authored && (
							<S.Holder>
								{authored.stories.map((Story) => {
									if (Story.public === 1) {
										return (
											<>
												<S.CustomAccordion key={Story.story_id}>
													<S.CustomAccordionSummary
														expandIcon={<ExpandMoreIcon color="primary" />}
													>
														<S.Summary>
															<S.Title>{Story.title}</S.Title>
														</S.Summary>
													</S.CustomAccordionSummary>
													<S.CustomAccordionDetails>
														<Typography>{Story.summary}</Typography>
														<Button href={"/stories/" + Story.story_id}>
															Read more...
														</Button>
													</S.CustomAccordionDetails>
												</S.CustomAccordion>
											</>
										);
									}
								})}
							</S.Holder>
						)}
					</S.BgPaperTwo>
				</div>
				<Side></Side>
			</S.Content>
		</>
	);
};

export default Author;
