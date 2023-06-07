import { Button, Paper, Typography } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Side from "../../components/Side/Side";
import * as S from "./style";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Stories = () => {
	const fetchURL = process.env.REACT_APP_API_URL + "/stories";
	const [page, setPage] = useState(1);
	const [stories, setStories] = useState(null);

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
				setStories(response.data);
			});
	}, [page]);

	return (
		<>
			<S.Content>
				<Paper>
					<Typography variant="title">Recent Stories</Typography>

					{!stories && (
						<>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
						</>
					)}
					{stories && (
						<S.Holder>
							{stories.data.map((Story) => {
								return (
									<>
										<S.CustomAccordion key={Story.story_id}>
											<S.CustomAccordionSummary
												expandIcon={<ExpandMoreIcon color="primary" />}
											>
												<S.Summary>
													<S.Title>{Story.title}</S.Title>
													<S.Author>by: {Story.display_name}</S.Author>
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
							})}
							<S.PageSelection
								count={stories.meta.totalPages.page_count}
								color="secondary"
								page={page}
								onChange={handleChange}
							/>
						</S.Holder>
					)}
				</Paper>
				<Side></Side>
			</S.Content>
		</>
	);
};

export default Stories;
