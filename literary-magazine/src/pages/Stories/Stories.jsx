import { Paper, Typography } from "@mui/material";
import Side from "../../components/Side/Side";
import * as S from "./style";

const Stories = () => {
	return (
		<>
			<S.Content>
				<Paper>
					<Typography variant="title">Recent Stories</Typography>
					<S.PlaceHolder variant="rectangular" height={100}></S.PlaceHolder>
					<S.PlaceHolder variant="rectangular" height={100}></S.PlaceHolder>
					<S.PlaceHolder variant="rectangular" height={100}></S.PlaceHolder>
					<S.PlaceHolder variant="rectangular" height={100}></S.PlaceHolder>
					<S.PlaceHolder variant="rectangular" height={100}></S.PlaceHolder>
				</Paper>
				<Side></Side>
			</S.Content>
		</>
	);
};

export default Stories;
