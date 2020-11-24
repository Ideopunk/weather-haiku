import React from "react";
import TempScale from "./TempScale";
import Wind from "./Wind";
import LoaderContainer from "./LoaderContainer";

const Display = ({ weatherData, scaleSwitch, units, loading }) => {
	console.log(loading)
	let emoji = weatherData.emoji + " ";
	// emoji = emoji.repeat(10)

	let status;
	if (weatherData.name.length > 0) {
		status = "reveal";
	} else {
		status = "hide";
	}

	let combinedclass = `contentcontainer ${status}`;

	return (
		<div className={combinedclass} id="weathercontainer">
			{loading ? (
				<LoaderContainer />
			) : (
				<>
					<div id="location">
						<p id="main">
							{weatherData.name}, {weatherData.country}
						</p>
					</div>
					<TempScale weatherData={weatherData} units={units} scaleSwitch={scaleSwitch} />
					<div id="emoji">
						<p>{emoji}</p>
						<p>{emoji}</p>
						<p>{emoji}</p>
						<p>{emoji}</p>
						<p>{emoji}</p>
					</div>

					<div className="weatherdiv" id="descriptiondiv">
						<p className="weatherlabel">Description: </p>
						<p id="description">{weatherData.description}</p>
					</div>
					<div className="weatherdiv" id="humiditydiv">
						<p className="weatherlabel">Humidity: </p>
						<p id="humidity">{weatherData.humidity}%</p>
					</div>
					<Wind weatherData={weatherData} units={units} />
				</>
			)}
		</div>
	);
};

export default Display;
