import {
	Card,
	Divider,
	Paper,
	Skeleton,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import Parchment from "../../Parchment/Parchment";
import { useEffect, useState } from "react";
import axios from "axios";
import * as S from "../style";

const AdminStats = () => {
	const [stats, setStats] = useState(null);

	const fetchURL = process.env.REACT_APP_API_URL + "/admin/stats";
	useEffect(() => {
		console.log(fetchURL);
		axios.get(fetchURL).then((response) => {
			console.log(response.data);
			setStats(response.data);
		});
	}, [fetchURL]);

	if (stats) {
		return (
			<S.ContentHolder>
				<S.StatGroup>
					<S.StatCard variant="outlined">
						<S.CardPartOne>{stats.users.user_amount}</S.CardPartOne>
						<Divider />
						<Typography variant="h6" color="success">
							Users
						</Typography>
					</S.StatCard>
					<S.StatCard variant="outlined">
						<S.CardPartOne>{stats.stories.story_amount}</S.CardPartOne>
						<Divider />
						<Typography variant="h6" color="success">
							Stories
						</Typography>
					</S.StatCard>
					<S.StatCard variant="outlined">
						<S.CardPartOne>{stats.comments.comment_amount}</S.CardPartOne>
						<Divider />
						<Typography variant="h6" color="success">
							Comments
						</Typography>
					</S.StatCard>
					<S.StatCard variant="outlined">
						<S.CardPartOne>{stats.collections.coll_amount}</S.CardPartOne>
						<Divider />
						<Typography variant="h6" color="success">
							Collections
						</Typography>
					</S.StatCard>
					<S.StatCard variant="outlined">
						<S.CardPartOne>{stats.posts.post_amount}</S.CardPartOne>
						<Divider />
						<Typography variant="h6" color="success">
							Posts
						</Typography>
					</S.StatCard>
					<Typography variant="title">Totals</Typography>
				</S.StatGroup>
			</S.ContentHolder>
		);
	}
	return <Skeleton variant="text"></Skeleton>;
};

export default AdminStats;
