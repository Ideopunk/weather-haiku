import React, { Component } from "react";
import TempScale from "./TempScale";
import Wind from "./Wind";

class Display extends Component {
	render() {
		const { weatherData, scaleSwitch, units } = this.props;
		return (
			<div class="contentcontainer" id="weathercontainer">
				<p id="location">
					{weatherData.name}, {weatherData.country}
				</p>
				<p>{weatherData.main}</p>
				<div className="data">
					<p id="description">{weatherData.description}</p>
					<TempScale
						weatherData={weatherData}
						units={units}
						scaleSwitch={scaleSwitch}
					/>
					<p id="humidity">{weatherData.humidity}%</p>
					<Wind weatherData={weatherData} units={units} />
				</div>
			</div>
		);
	}
}

export default Display;
