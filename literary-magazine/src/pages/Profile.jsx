import { Paper, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const Profile = () => {
	return (
		<>
			<Paper>
				<Typography variant="h1">Profile</Typography>
				<Typography>This is where your profile info will be.</Typography>
				<Outlet />
			</Paper>
		</>
	);
};

export default Profile;
