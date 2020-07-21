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
		units: "metric",
	};

	handleSubmit = async (city) => {
		// get the value from the object
		city = Object.values(city);
		console.log("handlesubmit");
		console.log(this.state.units);
		let response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&units=${this.state.units}&appid=${API_KEY}` // the https is necessary
		);
		let data = await response.json();
		this.setState({
			weatherData: {
				name: data.name,
				main: data.weather[0].main,
				description: data.weather[0].description,
				temp: data.main.temp,
				humidity: data.main.humidity,
				windspeed: data.wind.speed,
			},
		});

		// haiku stuff
		let haikuresponse = await fetch(
			"https://cors-anywhere.herokuapp.com/https://www.tempslibres.org/tl/tlphp/dbhk02.php?mot=cloud&lg=e",
			{
				mode: "cors",
			}
		);
		let webpage = await haikuresponse.text();
		let re = /<div class.*?<\/div>/gs;
		let haikuArray = webpage.match(re);
		let len = haikuArray.length;
		let singleHaiku = haikuArray[Math.floor(Math.random() * len)];

		console.log(webpage);
		console.log(haikuArray);
		console.log(singleHaiku);
	};

	tempSwitch = () => {
		let { weatherData, units } = this.state;
		if (units === "metric") {
			let newTemp = (weatherData.temp * 9) / 5 + 32;
			weatherData.temp = newTemp;
			this.setState({
				units: "imperial",
				weatherData: weatherData,
			});
		} else {
			let newTemp = ((weatherData.temp - 32) * 5) / 9;
			weatherData.temp = newTemp;
			this.setState({
				units: "metric",
				weatherData: weatherData,
			});
		}
		console.log("tempswitched");
	};

	render() {
		const { weatherData, units } = this.state;
		console.log(this.state);
		return (
			<div className="App">
				<h1>Yooo!</h1>
				<Searchbar handleSubmit={this.handleSubmit} />
				<Display
					tempSwitch={this.tempSwitch}
					units={units}
					weatherData={weatherData}
				/>
			</div>
		);
	}
}

export default App;
