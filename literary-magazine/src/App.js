import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing/Landing";
import { siteTheme } from "./siteTheme";

import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch/NoMatch";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Stories from "./pages/Stories/Stories";
import Posts from "./pages/News/Posts";
import Story from "./pages/Story/Story";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import CreateStory from "./pages/Create/CreateStory";
import CreatePost from "./pages/Create/CreatePost";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function App() {
	const [accData, setAccData] = useState();
	useEffect(() => {
		// Retrieve the JWT from the stored cookie or any other source
		const jwt = Cookies.get("jwt");

		// Send the verification request to the backend
		axios
			.get("http://localhost:3001/accounts/verify", {
				headers: {
					Authorization: `${jwt}`,
				},
			})
			.then((response) => {
				// Handle the response from the backend
				setAccData(response.data);
			})
			.catch((error) => {
				// Handle errors
				console.error("Verification error:", error);
			});
	}, []);
	return (
		<div className="App">
			<ThemeProvider theme={siteTheme}>
				<div className="content">
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Home accData={accData} />}>
								<Route path="/" element={<Landing accData={accData} />}></Route>
								<Route
									path="/stories"
									element={<Stories accData={accData} />}
								></Route>
								<Route
									path="/stories/:id"
									element={<Story accData={accData} />}
								></Route>
								<Route
									path="/stories/new"
									element={<CreateStory accData={accData} />}
								></Route>
								<Route
									path="/posts"
									element={<Posts accData={accData} />}
								></Route>
								<Route
									path="/posts/new"
									element={<CreatePost accData={accData} />}
								></Route>
								<Route
									path="/profile"
									element={<Profile accData={accData} />}
								></Route>
							</Route>

							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Register />} />

							<Route path="/admin" element={<Admin />}></Route>
							<Route path="*" element={<NoMatch />}></Route>
						</Routes>
					</BrowserRouter>
				</div>
			</ThemeProvider>
		</div>
	);
}

export default App;
