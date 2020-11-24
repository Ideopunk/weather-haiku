import React, { Component } from "react";
import { API_KEY } from "./keys.json";
import WEATHER_KEYS from "./weatherkeys.json";
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
			emoji: "",
		},
		units: "metric",
		haiku: {
			text: [],
			author: "",
			date: "",
		},
		errormessage: "",
		dataLoading: false,
		haikuLoading: false,
	};

	handleSubmit = async (location) => {
		this.setState({ dataLoading: true, haikuLoading: true });
		let { city, country, lat, long } = location;
		console.log("handlesubmit");
		console.log(location);
		// get the value from the object
		location = Object.values(location);

		// snag our weather data
		let response, data, errormessage;
		try {
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
			data = await response.json();

			// if celsius, convert from m/s to km/h
			if (this.state.units === "metric") {
				data.wind.speed = (data.wind.speed * 18) / 5;
				errormessage = false;
				this.setState({
					errormessage: errormessage,
				});
			}
		} catch (error) {
			console.log(`Can't find that there city`);
			console.log(error);
			errormessage = "City not found";
			this.setState({
				errormessage: errormessage,
			});
			return;
		}

		// get emoji
		let emojikey = WEATHER_KEYS[data.weather[0].main];
		let emoji = emojikey.emoji;

		// capitalize description
		let capDescription =
			data.weather[0].description.charAt(0).toUpperCase() +
			data.weather[0].description.slice(1);

		this.setState({
			weatherData: {
				name: data.name,
				country: data.sys.country,
				main: data.weather[0].main,
				description: capDescription,
				temp: data.main.temp,
				humidity: data.main.humidity,
				windspeed: data.wind.speed,
				emoji: emoji,
				dataLoading: false,
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

	// display user's location
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
		let haikusubjectlist = WEATHER_KEYS[haikukey];
		haikusubjectlist = haikusubjectlist.subjects;
		let haikusubject = haikusubjectlist[Math.floor(Math.random() * haikusubjectlist.length)];

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
			return;
		}

		let re = /<div class.*?<\/div>/gs;
		let haikuArray = webpage.match(re);
		let len = haikuArray.length;
		let singleHaiku = haikuArray[Math.floor(Math.random() * len)];

		// pull out the haiku data, snag the haiku's text.
		let domparser = new DOMParser();
		let haikudom = domparser.parseFromString(singleHaiku, "text/html");
		let haikutext = haikudom.querySelector(".haiku");
		haikutext = haikutext.innerHTML;
		haikutext = haikutext.replace("&lt", "<");
		haikutext = haikutext.replace("&gt", ">");
		haikutext = haikutext.split("<br>");

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
			haikuLoading: false,
		});
	}

	render() {
		const { weatherData, units, haiku, errormessage, dataLoading, haikuLoading } = this.state;
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
					<Searchbar errormessage={errormessage} handleSubmit={this.handleSubmit} />
				</div>
				<div id="displaycontainer">
					<Display
						scaleSwitch={this.scaleSwitch}
						units={units}
						weatherData={weatherData}
						loading={dataLoading}
					/>
					<Haiku haiku={haiku} loading={haikuLoading} />
				</div>
				<div id="credit">
					Background image via <a href="https://www.reddit.com/user/Biode/">u/Biode</a>
				</div>
			</div>
		);
	}
}

export default App;
