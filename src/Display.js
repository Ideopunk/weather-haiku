import React, { Component } from "react";
import TempScale from "./TempScale";
import Wind from "./Wind";

class Display extends Component {
	render() {
		const { weatherData, scaleSwitch, units } = this.props;
		return (
			<div className="contentcontainer" id="weathercontainer">
				<div id="location">
					<p id="main">{weatherData.name}, {weatherData.country}</p>
				</div>
				<p>{weatherData.main}</p>
				<TempScale
						weatherData={weatherData}
						units={units}
						scaleSwitch={scaleSwitch}
				/>
				<p id="description">{weatherData.description}</p>
				<p id="humidity">{weatherData.humidity}%</p>
				<Wind weatherData={weatherData} units={units} />
			</div>
		);
	}
}

export default Display;
