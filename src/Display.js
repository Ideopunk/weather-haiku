import React, { Component } from "react";
import TempScale from "./TempScale";

class Display extends Component {
	render() {
		const { weatherData, tempSwitch, units } = this.props;
		console.log(weatherData);
		console.log("Display.js");
		console.log(Object.keys(weatherData));
		return (
			<div>
				<p>Place Name</p>
				<p>Temperature!</p>
				<p>{weatherData.name}</p>
				<div className="data">
					<p>weatherData</p>
				</div>
				<TempScale units={units} tempSwitch={tempSwitch} />
			</div>
		);
	}
}

export default Display;
