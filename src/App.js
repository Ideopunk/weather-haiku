import React, { Component } from "react";
import Searchbar from "./Searchbar";
import Display from "./Display";

class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Yooo!</h1>
				<Searchbar />
                <Display />
			</div>
		);
	}
}

export default App;
