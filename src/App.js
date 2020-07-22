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
			country: "",
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

	handleSubmit = async (location) => {
		// get the value from the object
		let { city, country, lat, long } = location;
		console.log(city, country, lat, long);

		location = Object.values(location);

		let response;
		if (lat && long) {
			response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${this.state.units}&appid=${API_KEY}`
			);
		} else if (!country) {
			response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${this.state.units}&appid=${API_KEY}`
			);
		} else {
			response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${this.state.units}&appid=${API_KEY}`
			);
		}
		let data = await response.json();

		// if celsius, convert from m/s to km/h
		if (this.state.units === "metric") {
			data.wind.speed = (data.wind.speed * 18) / 5;
		}

		this.setState({
			weatherData: {
				name: data.name,
				country: data.sys.country,
				main: data.weather[0].main,
				description: data.weather[0].description,
				temp: data.main.temp,
				humidity: data.main.humidity,
				windspeed: data.wind.speed,
			},
		});

		// haiku stuff
		this.getHaiku(data.weather[0].main);
	};

	// switch temp and wind scales
	scaleSwitch = () => {
		let { weatherData, units } = this.state;
		let newTemp, newSpeed;
		if (units === "metric") {
			// temp
			newTemp = (weatherData.temp * 9) / 5 + 32;
			weatherData.temp = newTemp;

			// wind
			newSpeed = weatherData.windspeed / 1.609344;
			weatherData.windspeed = newSpeed;

			// set
			this.setState({
				weatherData: weatherData,
				units: "imperial",
			});
		} else {
			// temp
			newTemp = ((weatherData.temp - 32) * 5) / 9;
			weatherData.temp = newTemp;

			// wind
			newSpeed = weatherData.windspeed * 1.609344;
			weatherData.windspeed = newSpeed;

			// set
			this.setState({
				weatherData: weatherData,
				units: "metric",
			});
		}
	};

	getUserLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			let coords = {
				lat: position.coords.latitude,
				long: position.coords.longitude,
			};
			this.handleSubmit(coords);
		});
	};

	async getHaiku(haikukey) {
		let haikusubjectlist = HAIKU_SUBJECTS[haikukey];
		let haikusubject =
			haikusubjectlist[
				Math.floor(Math.random() * haikusubjectlist.length)
			];

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
			console.log(error);
		}

		let re = /<div class.*?<\/div>/gs;
		let haikuArray = webpage.match(re);
		let len = haikuArray.length;
		let singleHaiku = haikuArray[Math.floor(Math.random() * len)];

		// pull out the haiku data, snag the haiku's text.
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
		let haikuauthor = haikumetadata.match(/^.*(?= ,)/);
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
	}

	render() {
		const { weatherData, units, haiku } = this.state;
		return (
			<div className="App">
				<div id="searchcontainer">
					<input
						type="button"
						onClick={this.getUserLocation}
						className="searchbutton"
						id="locationbutton"
						value="Here"
					/>
					<Searchbar handleSubmit={this.handleSubmit} />
				</div>
				<div id="displaycontainer">
					<Display
						scaleSwitch={this.scaleSwitch}
						units={units}
						weatherData={weatherData}
					/>
					<Haiku haiku={haiku} />
				</div>
			</div>
		);
	}
}

export default App;
