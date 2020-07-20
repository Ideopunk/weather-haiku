import React, { Component } from "react";

class Searchbar extends Component {
    initialState = {
        city: ''
    }
    
    state = this.initialState;

	handleChange = (event) => {
        console.log('handlechange')
		const {value} = event.target;
		this.setState({
			city: value,
		});
	};

	submitInput = () => {
        console.log('submitinput')
        console.log(this.state)
        this.props.handleSubmit(this.state);
		this.setState({city: ''});
	};

	render() {
		return (
			<form>
				<input
					type="search"
					id="weather-api-search"
					name="weather-api-search"
					onChange={this.handleChange}
				/>
				<input type="button" value='Submit' onClick={this.submitInput} />
			</form>
		);
	}
}

export default Searchbar;
