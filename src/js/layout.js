import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import MiniMenu from "./component/menu";
import { AppProvider } from "./store/blogContext";
import List from "./component/list";
import Detail from "./component/detailView";
import SearchBar from "./component/searchBar";
import Navbar from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<AppProvider>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<SearchBar />
					<MiniMenu />
					<Routes>
						<Route path="/" element={<List type="people" />} />
						<Route path="/vehicles" element={<List type="vehicles" />} />
						<Route path="/planets" element={<List type="planets" />} />
						<Route path="/:type/:id" element={<Detail />} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
			</AppProvider>
		</div>
	);
};

export default Layout;
