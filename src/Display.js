import React, { Component } from "react";
import TempScale from "./TempScale";

class Display extends Component {
	render() {
    	// const {weatherData} = this.props

		return (
			<div>
				<p>Place Name</p>
				<p>Temperature</p>
				<div className="data">
					<p>weatherData</p>
				</div>
				<TempScale />
			</div>
		);
	}
}

export default Display;
