import React, { Component } from "react";

class Tempscale extends Component {
	render() {
		const { tempSwitch, units } = this.props;
		return <div onClick={tempSwitch}>{units}</div>;
	}
}

export default Tempscale;
