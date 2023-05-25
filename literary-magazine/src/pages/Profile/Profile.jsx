import { Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import * as S from "./style";

const Profile = ({ accData }) => {
	const [authored, setAuthored] = useState();

	useEffect(() => {
		accData
			? axios
					.get("http://localhost:3001/accounts/created/" + accData.id)
					.then((response) => {
						const createdData = response.data;
						console.log(createdData);

						setAuthored(createdData);
					})
					.catch((error) => {
						console.error("Error:", error);
					})
			: console.log("no account data");
	}, [accData]);

	return (
		<>
			<Paper>
				<S.Content>
					<Typography variant="h1">Profile</Typography>
					{!accData && (
						<Button href="/login" variant="contained">
							Log in
						</Button>
					)}
					{accData && (
						<>
							<S.Header>Profile info:</S.Header>
							currently logged in as: {accData.displayName}
							<S.ItemContainer>
								{authored && (
									<>
										<S.Box>
											<S.Header>Stories </S.Header>
											{authored.stories.map((Story) => {
												return (
													<S.Array>
														{Story.title}
														<div>
															<S.CusButton variant="contained" color="warning">
																Edit
															</S.CusButton>
															<S.CusButton variant="contained" color="error">
																Delete
															</S.CusButton>
														</div>
													</S.Array>
												);
											})}
										</S.Box>
										<S.Box>
											<S.Header>Collections </S.Header>
											{authored.collections.map((Collection) => {
												return (
													<S.Array>
														{Collection.name}
														<div>
															<S.CusButton variant="contained" color="warning">
																Edit
															</S.CusButton>
															<S.CusButton variant="contained" color="error">
																Delete
															</S.CusButton>
														</div>
													</S.Array>
												);
											})}
										</S.Box>
										<S.Box>
											<S.Header>Posts </S.Header>
											{authored.posts.map((Post) => {
												return (
													<S.Array>
														{Post.content}

														<S.CusButton variant="contained" color="error">
															Delete
														</S.CusButton>
													</S.Array>
												);
											})}
										</S.Box>
										<S.Box>
											<S.Header>Comments </S.Header>
											{authored.comments.map((Comment) => {
												return (
													<S.Array>
														{Comment.content}

														<S.CusButton variant="contained" color="error">
															Delete
														</S.CusButton>
													</S.Array>
												);
											})}
										</S.Box>
									</>
								)}
							</S.ItemContainer>
						</>
					)}
					<Outlet />
				</S.Content>
			</Paper>
		</>
	);
};

export default Profile;
