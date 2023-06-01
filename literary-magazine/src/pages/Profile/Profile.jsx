import { Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import * as S from "./style";

const Profile = ({ accData }) => {
	const [authored, setAuthored] = useState();

	useEffect(() => {
		accData
			? axios
					.get(
						process.env.REACT_APP_API_URL + "/accounts/created/" + accData.id
					)
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

	const handleDelete = (id, type) => () => {
		//Saņem izmainītās vērtības
		console.log(id);
		//Izmainītās vērtības ieliek mainīgajā vērtībā
		if (window.confirm("Delete the item?")) {
			axios
				.delete(process.env.REACT_APP_API_URL + "/" + type + "/" + id)
				.then((response) => {
					console.log(`Deleted ` + type + ` with ID` + id);
					window.location.reload(false);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	return (
		<>
			<S.CusPaper>
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
							<S.Box>
								<p>currently logged in as: {accData.displayName}</p>
								<S.CusButton variant="contained" href="/profile/edit">
									Edit Profile
								</S.CusButton>
								<S.CusButton
									color="tertiary"
									variant="outlined"
									href={"/author/" + accData.id}
								>
									View public profile
								</S.CusButton>
							</S.Box>

							<S.ItemContainer>
								{authored && (
									<>
										<S.Box>
											<S.Header>Stories </S.Header>
											{authored.stories.map((Story) => {
												return (
													<S.Array key={Story.story_id}>
														{Story.title}
														<div>
															<S.CusButton
																variant="contained"
																color="success"
																href={"/stories/" + Story.story_id}
															>
																View
															</S.CusButton>
															<S.CusButton
																variant="contained"
																color="tertiary"
																href={"/stories/edit/" + Story.story_id}
															>
																Edit
															</S.CusButton>
															<S.CusButton
																variant="contained"
																color="error"
																onClick={handleDelete(
																	Story.story_id,
																	"stories"
																)}
															>
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
													<S.Array key={Collection.collection_id}>
														{Collection.name}
														<div>
															<S.CusButton
																variant="contained"
																color="tertiary"
																href={
																	"/collections/" + Collection.collection_id
																}
															>
																View
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
													<S.Array key={Post.post_id}>
														{Post.content}

														<S.CusButton
															variant="contained"
															color="error"
															onClick={handleDelete(Post.post_id, "posts")}
														>
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
													<S.Array key={Comment.comment_id}>
														"{Comment.content}" - on {Comment.title}
														<div>
															<S.CusButton
																variant="contained"
																color="success"
																href={"/stories/" + Comment.story_id}
															>
																View story
															</S.CusButton>
															<S.CusButton
																variant="contained"
																color="error"
																onClick={handleDelete(
																	Comment.comment_id,
																	"stories"
																)}
															>
																Delete
															</S.CusButton>
														</div>
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
			</S.CusPaper>
		</>
	);
};

export default Profile;
