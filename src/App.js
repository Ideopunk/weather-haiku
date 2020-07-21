import React, { Component } from "react";
import { API_KEY } from "./keys.json";
import HAIKU_SUBJECTS from "./haikusubjectkeys.json";
import Searchbar from "./Searchbar";
import Display from "./Display";
import Haiku from "./Haiku";

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
		haiku: {
			text: [],
			author: "",
			date: "",
		},
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
		let haikukey = data.weather[0].main;
		let haikusubject = HAIKU_SUBJECTS[haikukey];
		let webpage;

		try {
			let haikuresponse = await fetch(
				`https://cors-anywhere.herokuapp.com/https://www.tempslibres.org/tl/tlphp/dbhk02.php?mot=${haikusubject}&lg=e`,
				{
					mode: "cors",
				}
			);
			webpage = await haikuresponse.text();
		} catch (error) {
			console.log(`P sure we didn't get the haiku`);
			console.log(error)
		}

		let re = /<div class.*?<\/div>/gs;
		let haikuArray = webpage.match(re);
		let len = haikuArray.length;
		let singleHaiku = haikuArray[Math.floor(Math.random() * len)];

		// pull out the haiku data , snag the haiku's text.
		let domparser = new DOMParser();
		let haikudom = domparser.parseFromString(singleHaiku, "text/html");
		let haikutext = haikudom.querySelector(".haiku");
		haikutext = haikutext.innerHTML.split("<br>");

		// reduce length
		if (haikutext.length > 3) {
			haikutext.splice(3);
		}

		// snag the author and date
		let haikumetadata = haikudom.querySelector(".dbhktlref");
		haikumetadata = haikumetadata.textContent;
		let haikuauthor = haikumetadata.match(/^.*(?=,)/);
		let haikudate = haikumetadata.replace(/(.*cco )(.*)/, "$2");

		let { weatherData, units } = this.state;
		this.setState({
			weatherData: weatherData,
			units: units,
			haiku: {
				text: haikutext,
				author: haikuauthor,
				date: haikudate,
			},
		});
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
		const { weatherData, units, haiku } = this.state;
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
				<Haiku haiku={haiku} />
			</div>
		);
	}
}

export default App;
