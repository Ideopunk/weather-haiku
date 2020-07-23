import React, { Component } from "react";

class Tempscale extends Component {
	render() {
		const { weatherData, scaleSwitch, units } = this.props;
		let roundedtemp = +Number(weatherData.temp).toFixed(2)
		let C, F;
		if (units === "imperial") {
			C="greyed"
			F="fine"
		} else {
			C="fine"
			F="greyed"
		}
		return <div id="temp" onClick={scaleSwitch}>{roundedtemp} <span className={C}>ºC</span><span className='greyed'> / </span><span className={F}>ºF</span></div>;
	}
}

export default Tempscale;
