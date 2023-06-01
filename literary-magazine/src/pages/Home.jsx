import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

const Home = ({ accData }) => {
	return (
		<>
			<Navbar {...(accData ? (accData = { accData }) : (accData = null))} />
			<Outlet />
			<Footer />
		</>
	);
};

export default Home;
