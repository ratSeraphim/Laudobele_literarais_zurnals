import { Grid, Paper, Typography } from "@mui/material";
import Side from "../../components/Side/Side";
import * as S from "./style";

const Posts = () => {
	return (
		<>
			<S.Content>
				<Paper>
					<Typography sx={{ typography: "title", textAlign: "left" }}>
						Recent Posts
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							{" "}
							<S.PlaceHolder variant="rectangular" height={300}></S.PlaceHolder>
						</Grid>
						<Grid item xs={6}>
							{" "}
							<S.PlaceHolder variant="rectangular" height={200}></S.PlaceHolder>
						</Grid>
						<Grid item xs={2}>
							{" "}
							<S.PlaceHolder variant="rectangular" height={100}></S.PlaceHolder>
						</Grid>
					</Grid>
				</Paper>
				<Side></Side>
			</S.Content>
		</>
	);
};

export default Posts;
