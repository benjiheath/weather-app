import { useState, useEffect } from "react";
import axios from "axios";
// Contexts
import { UserLocationContext } from "./Components/UserLocationContext";
// Components
import SearchAndSummary from "./Components/SearchAndSummary/SearchAndSummary";
import Main from "./Components/Main/Main";
import Spinner from "./Components/Spinner";

import { css } from "@emotion/react";

function App() {
	const [userLocationID, setUserLocationID] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [isError, setError] = useState(false);
	const [weatherData, setWeatherData] = useState(null);
	const [dates, setDates] = useState(null);
	const [tempUnit, setTempUnit] = useState("C");

	// Get user geolocation
	const getPos = () => {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
	};

	// Isolate dates from weather data into new state
	const getDates = () => {
		return new Promise(
			(resolve) => {
				console.log("dates trying to execute before weatherdata");
				if (weatherData) {
					// map dates to "YYYY, MM, DD"
					const dateStrings = weatherData.consolidated_weather.map(
						(day) => day.applicable_date.split("-")
					);
					console.log(dateStrings);
					// map to raw date format
					const datesRaw = dateStrings.map(
						(date) =>
							new Date(
								Number(date[0]),
								// needed to fix with -1 as month is 0 based
								Number(date[1] - 1),
								Number(date[2])
							)
					);
					console.log(datesRaw);

					// map to display format e.g. 'Fri, Jul 23'
					const options = {
						day: "numeric",
						month: "short",
						weekday: "short",
					};
					const intlDates = datesRaw.map((date) =>
						new Intl.DateTimeFormat(
							navigator.language,
							options
						).format(date)
					);
					setDates(intlDates);
					resolve(dates);
				}
			},
			(reject) => {
				new Error(reject);
				console.log("DATE ERROR:", reject);
			}
		);
	};

	// on page load: get user location & set weather data to state
	useEffect(() => {
		const getData = async () => {
			setError(false);
			setLoading(true);

			const pos = await getPos();
			console.log("POS:", pos.coords.latitude, pos.coords.longitude);

			try {
				// get city ID for weather request
				const response = await axios.get(
					`https://cors-anywhere.herokuapp.com/http://www.metaweather.com/api/location/search/?lattlong=${pos.coords.latitude},${pos.coords.longitude}`
				);
				const cityId = await response.data[0].woeid;

				// get weather info using cityID
				const responseWeather = await axios.get(
					`https://cors-anywhere.herokuapp.com/http://www.metaweather.com/api/location/${cityId}`
				);

				setWeatherData(responseWeather.data);
				setUserLocationID(response.data[0].woeid); // store user location for 'gps' btn
				setLoading(false);
			} catch (error) {
				setError(true);
				console.error("ERROR CAUGHT:", error);
				if (error.response) {
					console.log(error.response);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log("Error", error.message);
				}
			}
		};

		getData();
	}, []);

	// only get dates once weather state updated
	useEffect(() => {
		getDates();
	}, [weatherData]);

	const override = css`
		display: block;
		position: absolute;
		top: 45%;
		left: 50%;
		border-color: red;
	`;

	return (
		<div className="App">
			{isLoading && <Spinner override={override} />}
			<div className="main-container">
				{isError && <h1>Error</h1>}
				<UserLocationContext.Provider
					value={{
						isLoading,
						setLoading,
						isError,
						weatherData,
						dates,
						tempUnit,
						setTempUnit,
						setWeatherData,
						userLocationID,
					}}
				>
					{!isLoading && weatherData && dates && (
						<>
							<SearchAndSummary />
							<Main />
						</>
					)}
				</UserLocationContext.Provider>
			</div>
		</div>
	);
}

export default App;
