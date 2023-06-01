import { Typography } from "@mui/material";
import * as S from "./style";

const Message = ({ message }) => {
	if (message) {
		return (
			<S.AlertBox>
				<Typography>{message}</Typography>
			</S.AlertBox>
		);
	}
};

export default Message;
