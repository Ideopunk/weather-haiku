import React, { Component } from "react";
import { API_KEY } from "./keys.json";

import Searchbar from "./Searchbar";
import Display from "./Display";

class App extends Component {
    
    state = {
		weatherData: this.getWeatherData("New York")
	};

	

	async getWeatherData(location) {
		let response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}` // the https is necessary 
		);
        let data = await response.json();
		return data;
	}


	updateLocation() {
		this.setState({
			weatherData: "newweatherData",
		});
	}

	render() {
        console.log(API_KEY)
        console.log(this.state);
        
		const { weatherData } = this.state;

		return (
			<div className="App">
				<h1>Yooo!</h1>
				<Searchbar updateLocation={this.updateLocation} />
				<Display weatherData={weatherData} />
			</div>
		);
	}
}

export default App;
