import { Paper } from "@mui/material";
import { Link } from "react-router-dom";

const NoMatch = () => {
	return (
		<Paper>
			No page found
			<Link to="/">Return</Link>
		</Paper>
	);
};

export default NoMatch;
