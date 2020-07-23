import React, { Component } from "react";

class Wind extends Component {
	render() {
        const { weatherData, units } = this.props;
		let roundedtemp = +Number(weatherData.windspeed).toFixed(2)
        
		let per;
		if (units === "imperial") {
			per = "mph";
		} else {
			per = "km/h";
		}
		return (
			<div className="weatherdiv" id="winddiv">
				<p className="weatherlabel">Wind speed:</p>
				<p>{roundedtemp} {per}</p>
			</div>
		)
	}
}

export default Wind;
