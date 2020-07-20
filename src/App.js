import React, { Component } from "react";
import { API_KEY } from "./keys.json";
import Searchbar from "./Searchbar";
import Display from "./Display";

class App extends Component {
	state = {
		weatherData: {
			name: "",
			main: "",
			description: "",
			temp: "",
			humidity: "",
			windspeed: "",
        },
        units: "metric"
	};

	async getWeatherData(location) {
        console.log('getweatherdata')
		let response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${this.state.units}&appid=${API_KEY}` // the https is necessary
		);
		let data = await response.json();
		console.log(data);
		let reducedData = data;
		return reducedData;
	}


	handleSubmit = (city) => {
        console.log(this)
		this.setState({
			weatherData: this.getWeatherData(city),
		});
	}

    tempSwitch = () => {
        console.log('tempswitch')
        console.log(this)
        let {units} = this.state
        if (units === "metric") {
            this.setState({
                units: "imperial"
            })
        } else {
            this.setState({
                units: "metric"
            })
        }
        console.log(units)

    }

	render() {
		console.log(API_KEY);
		console.log(this.state);
		console.log("APP.js");
		const { weatherData, units } = this.state;

		return (
			<div className="App">
				<h1>Yooo!</h1>
				<Searchbar handleSubmit={this.handleSubmit} />
				<Display tempSwitch={this.tempSwitch} units={units} weatherData={weatherData} />
			</div>
		);
	}
}

export default App;
