import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing/Landing";
import { siteTheme } from "./siteTheme";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch/NoMatch";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Stories from "./pages/Stories/Stories";
import Posts from "./pages/News/Posts";
import Profile from "./pages/Profile";

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={siteTheme}>
				<div className="content">
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Home />}>
								<Route path="/" element={<Landing />}></Route>
								<Route path="/stories" element={<Stories />}></Route>
								<Route path="/posts" element={<Posts />}></Route>
								<Route path="/profile" element={<Profile />}></Route>
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
