import { Typography } from "@mui/material";
import * as S from "./style";

export const Error = ({ message }) => {
	if (message) {
		return (
			<S.ErrorBox>
				<Typography>{message}</Typography>
			</S.ErrorBox>
		);
	}
};

export default Error;
