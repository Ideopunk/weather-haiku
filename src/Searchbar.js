import React, { Component } from "react";

class Searchbar extends Component {
	initialState = {
		city: "",
		country: "",
	};

	state = this.initialState;

	handleChange = (event) => {
		const { name, value } = event.target;
		console.log(value)
		this.setState({
			[name]: value,
		});
	};

	submitInput = () => {
		this.props.handleSubmit(this.state);
		this.setState(this.initialState);
	};

	render() {
		const { city, country } = this.state

		return (
			<form>
				<input
					type="search"
					id="weather-api-search"
					name="city"
					value={city}
					required
					onChange={this.handleChange}
				/>
				<input
					type="search"
					id="country"
					name="country"
					value={country}
					maxLength="2"
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
