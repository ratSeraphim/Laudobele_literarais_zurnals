import { Button, Paper, Typography } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Side from "../../components/Side/Side";
import * as S from "./style";
import axios from "axios";
import React from "react";

const Stories = () => {
	const fetchURL = "http://localhost:3001/stories";
	const [post, setPost] = React.useState(null);

	React.useEffect(() => {
		axios.get(fetchURL).then((response) => {
			setPost(response.data);
		});
	}, [fetchURL]);

	return (
		<>
			<S.Content>
				<Paper>
					<Typography variant="title">Recent Stories</Typography>
					{!post && (
						<>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
							<S.PlaceHolder variant="rectangular"></S.PlaceHolder>
						</>
					)}
					{post && (
						<S.Holder>
							{post.data.map((Story) => {
								return (
									<>
										<S.CustomAccordion>
											<S.CustomAccordionSummary
												expandIcon={<ExpandMoreIcon color="primary" />}
												key={Story.story_id}
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
						</S.Holder>
					)}
				</Paper>
				<Side></Side>
			</S.Content>
		</>
	);
};

export default Stories;
