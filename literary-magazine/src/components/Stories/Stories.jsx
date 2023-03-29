import { Paper } from "@mui/material";
import Side from "../Side/Side";
import * as S from "./style";

const Stories = () => {
	return (
		<>
			<S.Content>
				<Paper>
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
