import React, { Component } from "react";
import TempScale from "./TempScale";
import Wind from "./Wind";

class Display extends Component {
	render() {
		const { weatherData, scaleSwitch, units } = this.props;
		let emoji = weatherData.emoji

		let status
		if (weatherData.name.length > 0) {
			status = "reveal"
		} else {
			status = "hide"
		}

		let contentcontainer = "contentcontainer"
		let combinedclass = `${contentcontainer} ${status}`

		return (
			<div className={combinedclass} id="weathercontainer">
				<div id="location">
					<p id="main">{weatherData.name}, {weatherData.country}</p>
				</div>
				<p id='emoji'>{emoji}</p>
				<TempScale
						weatherData={weatherData}
						units={units}
						scaleSwitch={scaleSwitch}
				/>
				<div className="weatherdiv" id="descriptiondiv">
					<p className="weatherlabel">Description: </p>
					<p id="description">{weatherData.description}</p>
				</div>
				<div className="weatherdiv" id="humiditydiv">
					<p className="weatherlabel">Humidity: </p>
					<p id="humidity">{weatherData.humidity}%</p>
				</div>
				<Wind weatherData={weatherData} units={units} />
			</div>
		);
	}
}

export default Display;
