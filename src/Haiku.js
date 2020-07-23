import React, { Component } from "react";

class Haiku extends Component {
	render() {
		const { haiku } = this.props;

		let status
		if (haiku.text.length > 0) {
			status = "reveal"
		} else {
			status = "hide"
		}

		let haikulines = haiku.text.map((line, index) => (
			<p key={index}>{line}</p>
		));
		return (
			<div className="contentcontainer" id="haikucontainer">
				<div className={status} id='bonushaiku'>
					<div id="haikutext">{haikulines}</div>
					<div id="haikumetadata">
						<p id="haikuauthoranddate">{haiku.author}, {haiku.date}</p>
						<p>
							<i>
								via the{" "}
								<a href="https://www.tempslibres.org/tl/en/dbhk00.html">
									tempslibres haiku database
								</a>
							</i>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Haiku;
