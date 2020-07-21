import React, { Component } from "react";

class Searchbar extends Component {
	initialState = {
		city: "",
	};

	state = this.initialState;

	handleChange = (event) => {
		const { value } = event.target;
		console.log(value)
		this.setState({
			city: value,
		});
	};

	submitInput = () => {
		this.props.handleSubmit(this.state);
		this.setState(this.initialState);
	};

	render() {
		const { city } = this.state
		return (
			<form>
				<input
					type="search"
					id="weather-api-search"
					name="weather-api-search"
					value={city}
					required
					onChange={this.handleChange}
				/>
				<input
					type="button"
					value="Submit"
					onClick={this.submitInput}
				/>
			</form>
		);
	}
}

export default Searchbar;
