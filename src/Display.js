import React, { Component } from "react";
import TempScale from "./TempScale";

class Display extends Component {
	render() {
		const { weatherData, tempSwitch, units } = this.props;
		let roundedtemp = +Number(weatherData.temp).toFixed(2)
		return (
			<div>
				<p>{weatherData.name}</p>
				<p>{weatherData.main}</p>
				<div className="data">
					<p>{weatherData.description}</p>
					<p>{roundedtemp}</p>
					<p>{weatherData.humidity}</p>
					<p>{weatherData.windspeed}</p>
				</div>
				<TempScale units={units} tempSwitch={tempSwitch} />
			</div>
		);
	}
}

export default Display;
