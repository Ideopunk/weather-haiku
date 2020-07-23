import React, { Component } from "react";

class Searchbar extends Component {
	initialState = {
		city: "",
		country: "",
		placeholder: "London (city name required)"
	};

	state = this.initialState;

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	submitInput = () => {
		this.props.handleSubmit(this.state);
		this.setState(this.initialState);
	};

	render() {
		let { city, country, placeholder } = this.state
		const { errormessage } = this.props
		if (errormessage) {
			placeholder = errormessage
		}

		return (
			<form>
				<input
					type="search"
					id="weather-api-search"
					name="city"
					value={city}
					required
					placeholder={placeholder}
					onChange={this.handleChange}
				/>
				<input
					type="search"
					id="country"
					name="country"
					value={country}
					maxLength="2"
					placeholder="GB"
					onChange={this.handleChange}
				/>
				<input
					type="button"
					value="Submit"
					id='submit'
					className='searchbutton'
					onClick={this.submitInput}
				/>
			</form>
		);
	}
}

export default Searchbar;
