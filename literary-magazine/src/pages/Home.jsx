import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";

const Home = ({ accData }) => {
	return (
		<>
			<Navbar {...(accData ? (accData = { accData }) : (accData = null))} />
			<Outlet />
		</>
	);
};

export default Home;
