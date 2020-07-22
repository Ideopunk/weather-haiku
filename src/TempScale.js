import React, { Component } from "react";

class Tempscale extends Component {
	render() {
		const { weatherData, scaleSwitch, units } = this.props;
		let roundedtemp = +Number(weatherData.temp).toFixed(2)
		let degreesymbol;
		if (units === "imperial") {
			degreesymbol = "F";
		} else {
			degreesymbol = "C";
		}
		return <div id="temp" onClick={scaleSwitch}>{roundedtemp} º{degreesymbol}</div>;
	}
}

export default Tempscale;
