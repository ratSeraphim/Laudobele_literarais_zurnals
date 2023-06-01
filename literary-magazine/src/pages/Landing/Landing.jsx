import { Typography } from "@mui/material";
import Side from "../../components/Side/Side";
import * as S from "./style";
import Parchment from "../../components/Parchment/Parchment";

const Landing = () => {
	return (
		<>
			<S.Content>
				<Parchment>
					<Typography variant="h1">The Sothoth Press</Typography>
					<Typography>
						The Sothoth Press is a literary magazine being created in
						collaboration between an aspiring programmer and their first client,
						lovingly known to their friends as 11. <br />
						The end goal is to have a working website that can eventually grow
						its own community of authors and have a library of literary works
						created by people like you and me. The site will be under
						construction for quite a while all things considered, and is being
						used as a final exam project for a programming course, so bear with
						us!
						<br />
						<br />
					</Typography>

					<Typography variant="h1">Where to contact us</Typography>
					<Typography>
						You can get in touch with the site's creator on their github page{" "}
						<a href="https://github.com/ratSeraphim">here</a>
					</Typography>
				</Parchment>
				<Side />
			</S.Content>
		</>
	);
};

export default Landing;
