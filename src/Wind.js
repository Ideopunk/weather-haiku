import React, { Component } from "react";

class Wind extends Component {
	render() {
        const { weatherData, units } = this.props;
		let roundedtemp = +Number(weatherData.windspeed).toFixed(2)
        
		let per;
		if (units === "imperial") {
			per = "m per h";
		} else {
			per = "km per h";
		}
		return <div id="wind">{roundedtemp} {per}</div>;
	}
}

export default Wind;
